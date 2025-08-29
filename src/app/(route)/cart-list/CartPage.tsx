"use client";

import { fetchCart } from "@/api/cartAPI";
import { ProductDetail } from "@/api/types/product.Types";
import { useDeleteCartMutation } from "@/hooks/Mutation/useCartMutation";
import { useGetProducts } from "@/hooks/queries/useGetProducts";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { mutate: removeItem } = useDeleteCartMutation();
  const router = useRouter();
  const { data, isLoading, isError } = useGetProducts();
  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const products: ProductDetail[] = data?.data?.results || [];

  if (isLoading || cartLoading) return <p>로딩중입니다...</p>;
  if (isError || cartError) return <p>에러가 발생했습니다.</p>;

  /**style */
  const countStyle =
    "border border-gray-300 p-4 py-2 rounded-md box-border cursor-pointer";
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold p-2">장바구니</h1>

      {cart?.article_list?.map((item) => {
        const product = products.find(
          (product) => product._id === item.article
        );

        return (
          <div
            key={item._id}
            className="border p-2 flex gap-5 justify-around items-center mt-5"
          >
            <div className="w-[150px]">
              <img src={product?.detail_images[0]} alt="" />
            </div>
            <p
              className="text-xl font-bold"
              onClick={() => router.push(`/articles/${product?._id}`)}
            >
              상품명: {product?.title}
            </p>
            <div className="flex gap-2 items-center">
              <p className={countStyle}>-</p>

              {<p className={countStyle + `cursor-none`}>{item.quantity}</p>}
              <p className={countStyle}>+</p>
            </div>
            <p>가격: {product?.product?.price?.toLocaleString()}원</p>
            <button
              onClick={() => removeItem(item.article)}
              className="bg-red-600 text-white px-7 py-3 rounded-md"
            >
              삭제
            </button>
          </div>
        );
      })}
      <div className="flex justify-end">
        <button className="w-[100%] max-w-60 py-3 rounded-md bg-black border border-black duration-300 text-white mt-4 hover:bg-white hover:border-gray-400 hover:text-black">
          결제하기
        </button>
      </div>
    </div>
  );
}
