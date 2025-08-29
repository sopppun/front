"use client";

import { fetchProductById } from "@/api/articleAPI";
import { postFetchCart } from "@/api/cartAPI";
import {
  useDisLikeMutation,
  useLikeMutation,
} from "@/hooks/Mutation/useArticleLikes";

import { useGetUser } from "@/hooks/queries/useGetUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const { data: user } = useGetUser();
  const queryClient = useQueryClient();

  const { mutate: disLikeMutate } = useDisLikeMutation();
  const { mutate: likeMutate } = useLikeMutation();

  const [modal, setModal] = useState(false);
  const [addCart, setAddCart] = useState(false);

  useEffect(() => {
    if (addCart) {
      const cartTimer = setTimeout(() => {
        setAddCart(false);
      }, 1500);
      return () => clearTimeout(cartTimer);
    }
  }, [addCart]);
  const useCartMution = () =>
    useMutation({ mutationFn: (id: string) => postFetchCart(id) });
  const { mutate: addCartMutate } = useCartMution();

  const handleAddCart = (id: string) => {
    addCartMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] }),
          setAddCart(true);
      },
      onError: () => alert("에러발생"),
    });
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Failed to load product details.</p>;

  /*like , disliked*/

  const handleLike = (id: string) =>
    likeMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["product", id] });
      },
      onError: () => alert("에러발생"),
    });

  const handleDisLike = (id: string) =>
    disLikeMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["product", id] });
      },
      onError: () => alert("에러발생"),
    });

  const isLiked =
    !!user?.userId && product.like_user_list?.includes(user.userId);
  return (
    <div className="container mx-auto p-4 mt-36">
      <h1 className="text-4xl font-bold mb-6 text-center">{product.title}</h1>
      <div className="max-w-5xl mx-auto border border-gray-300 rounded-xl p-8 shadow-2xl bg-white relative">
        <button
          onClick={() => router.push("/articles")}
          className="absolute -top-3 -right-3 bg-gray-300 text-white hover:bg-black rounded-full px-3 py-1 text-xl font-bold"
        >
          X
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={product.product?.thumbnail}
              alt={product.title}
              className="h-auto object-cover rounded-xl mb-6 w-full"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-700 text-xl mb-4">
              가격: ₩{product.product?.price.toLocaleString()}
            </p>
            <p className="text-gray-700 text-xl mb-4">
              수량: {product.product?.stock_quantity}
            </p>

            <div className="flex justify-between mt-16">
              <button
                className="bg-black hover:bg-gray-500 text-white text-lg py-3 px-6 rounded-lg transition"
                onClick={() => handleAddCart(product._id)}
              >
                장바구니 추가
              </button>
              <button
                onClick={() => {
                  if (!user?.userId) return alert("로그인 후 이용가능합니다");
                  isLiked
                    ? handleDisLike(product._id)
                    : handleLike(product._id);
                  setModal(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-3 px-6 rounded-lg transition"
              >
                {isLiked ? "찜취소" : "찜하기"}
              </button>
              {modal && (
                <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
                  <div className="max-w-[300px] w-full bg-white rounded-md px-6 py-4 shadow-xl">
                    <p className="text-center">
                      {isLiked
                        ? "위시리스트에 추가되었습니다."
                        : "위시리스트에서 제거되었습니다."}
                    </p>
                    <button
                      onClick={() => setModal(false)}
                      className="w-full  bg-red-600 rounded-md p-1 mt-5 text-white hover:bg-white border border-red-500  hover:text-red-500"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push(`/payment?productId=${id}`)}
                className="bg-black hover:bg-red-600 text-white text-lg py-3 px-6 rounded-lg transition"
              >
                결제하기
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 mx-auto mt-14">
          <img
            src={product?.detail_images}
            alt={product?.title}
            className="w-full object-cover rounded-xl"
          />
        </div>
      </div>{" "}
      {addCart && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="max-w-[300px] w-full bg-white rounded-md px-6 py-4 shadow-xl">
            <p className="text-center text-base font-semibold">
              장바구니에 추가되었습니다.
            </p>{" "}
            <button
              onClick={() => router.push("/cart-list")}
              className="w-full bg-black rounded-md px-1 py-2 mt-5 text-white hover:bg-whit"
            >
              장바구니 바로가기
            </button>
            <button
              onClick={() => setAddCart(false)}
              className="w-full bg-red-600 rounded-md p-1 mt-5 text-white hover:bg-white border border-red-500 hover:text-red-500"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
