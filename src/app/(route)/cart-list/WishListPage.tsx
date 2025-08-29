"use client";

import { ProductDetail, ProductItem } from "@/api/types/product.Types";
import { useDisLikeMutation } from "@/hooks/Mutation/useArticleLikes";
import { useGetProducts } from "@/hooks/queries/useGetProducts";
import { useGetUser } from "@/hooks/queries/useGetUser";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { IoHeartSharp } from "react-icons/io5";

export default function WishListPage() {
  const { data: user } = useGetUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useGetProducts();
  const { mutate: disLikeMutate } = useDisLikeMutation();

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>상품을 불러올 수 없습니다.</p>;

  const products: ProductDetail[] = data?.data?.results || [];

  const wishList = products.filter((item) =>
    user?.userId ? item.like_user_list.includes(user.userId) : false
  );

  const handleDisLike = (id: string) => {
    disLikeMutate(id, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      onError: () => alert("에러 발생"),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold p-2">위시리스트</h1>
      {wishList.length === 0 ? (
        <p>위시리스트가 비어있습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {wishList?.map((product) => (
            <div
              key={product._id}
              className="w-[300px] p-4 border border-gray-300 rounded-lg hover:border-black hover:shadow-md transition duration-300"
            >
              <img
                src={product?.detail_images[0]}
                alt="미리보기 이미지"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-700 mt-2">
                  가격: ₩{product?.product?.price?.toLocaleString()}
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-700 mt-2">
                    수량: {product?.product?.stock_quantity}
                  </p>
                  <div
                    onClick={() => handleDisLike(product._id)}
                    className="cursor-pointer"
                  >
                    <IoHeartSharp color="red" />
                  </div>
                </div>
                <button
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
                  onClick={() => {
                    router.push(`/articles/${product._id}`);
                  }}
                >
                  제품보기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
