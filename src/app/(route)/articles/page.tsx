"use client";

import { postFetchCart } from "@/api/cartAPI";
import { ProductDetail } from "@/api/types/product.Types";
import { fetchProducts } from "@/api/wishlistAPI";
import {
  useDisLikeMutation,
  useLikeMutation,
} from "@/hooks/Mutation/useArticleLikes";
import { useGetUser } from "@/hooks/queries/useGetUser";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

export default function articleListPage() {
  const router = useRouter();
  const { data: user } = useGetUser();
  const queryClient = useQueryClient();

  const [addCart, setAddCart] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  const { mutate: like } = useLikeMutation();
  const { mutate: disLikeMutate } = useDisLikeMutation();

  useEffect(() => {
    if (isLiked !== null) {
      const timer = setTimeout(() => setIsLiked(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLiked]);

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
  const handleLike = (id: string) => {
    if (!user?.userId) {
      alert("로그인 후 이용가능합니다.");
      return;
    }
    like(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setIsLiked(true);
        setAddCart(false);
      },
      onError: () => {
        alert("좋아요 처리 실패");
      },
    });
  };
  const handleDisLike = (id: string) => {
    disLikeMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setIsLiked(false);
      },
      onError: () => {
        alert("un좋아요 처리 실패");
      },
    });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load products.</p>;
  }

  const products: ProductDetail[] = data?.data?.results || [];

  /*style*/
  const likeBtn =
    "cursor-pointer border border-gray-400 px-2 rounded-md flex items-center justify-center transition duration-300 hover:border-red-500";
  return (
    <div className="container mx-auto p-4 mt-[80px] ">
      <h1 className="text-3xl font-bold mb-4 text-center mt-5">등록된 제품</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {products?.map((product) => (
          <div
            key={product._id}
            className="max-w-sm p-4 border border-gray-300 rounded-lg hover:border-black hover:shadow-md transition duration-300"
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
                {user?.userId &&
                product?.like_user_list.includes(user.userId) ? (
                  <div
                    onClick={() => handleDisLike(product._id)}
                    className={likeBtn}
                  >
                    <IoHeartSharp color="red" size={20} />
                  </div>
                ) : (
                  <div
                    onClick={() => handleLike(product._id)}
                    className={likeBtn}
                  >
                    <IoHeartOutline size={20} />
                  </div>
                )}
              </div>
              <button
                className="mt-4 w-full border border-gray-400 py-2 px-4 rounded-lg hover:bg-black hover:text-white transition duration-300"
                onClick={() => handleAddCart(product._id)}
              >
                장바구니 추가
              </button>{" "}
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
      {addCart && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="max-w-[300px] w-full bg-white rounded-md px-6 py-4 shadow-xl">
            <p className="text-center text-base font-semibold">
              장바구니에 추가되었습니다.
            </p>
            <button
              onClick={() => router.push("cart-list")}
              className="w-full bg-black rounded-md px-1 py-2 mt-5 text-white hover:bg-whit"
            >
              장바구니 바로가기
            </button>
            <button
              onClick={() => setAddCart(false)}
              className="w-full bg-red-600 rounded-md px-1 py-2 mt-2 text-white hover:bg-white border border-red-500 hover:text-red-500"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      {isLiked !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="max-w-[300px] w-full bg-white rounded-md px-6 py-4 shadow-xl">
            <p className="text-center text-base font-semibold">
              {isLiked
                ? "위시리스트에 추가되었습니다."
                : "위시리스트에서 제거되었습니다."}
            </p>
            <button
              onClick={() => setIsLiked(null)}
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
