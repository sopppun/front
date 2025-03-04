"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// 제품 타입 정의
type Product = {
  id: string;
  title: string;
  detail_images: string;
  price: number;
  stock_quantity: number;
};

// 제품 데이터를 가져오는 함수
const fetchProductById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

export default function PostUploadPage({ params }: { params: { id: string } }) {
  // params에서 id를 추출
  const { id } = params;
  const router = useRouter();

  // useQuery를 사용하여 제품 데이터를 가져오기
  const { data, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load product details.</p>;
  }

  // 제품 데이터
  const product = data?.data;

  const handleClose = () => {
    router.push("/articles");
  };

  //결제하기 창 띄우기
  const handlePayment = () => {
    router.push("/payment");
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-4xl font-bold mb-6 text-center">{product?.title}</h1>
      <div className="max-w-5xl mx-auto border border-gray-300 rounded-xl p-8 shadow-2xl bg-white relative">
        <div className="flex">
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 bg-gray-300 text-white hover:bg-black rounded-full px-3 py-1  text-xl font-bold "
          >
            X
          </button>
          <div className="w-[50%] ">
            <img
              src={product?.product?.thumbnail}
              alt={product.title}
              className="h-15 object-cover rounded-xl mb-6"
            />
          </div>

          <div className="w-[50%]">
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-700 text-xl mb-2 py-11">
              가격: ₩{product?.product?.price.toLocaleString()}
            </p>
            <p className="text-gray-700 text-xl mb-4  py-4">
              수량: {product?.product?.stock_quantity}
            </p>
            <div className="flex justify-between mt-32">
              <button className="bg-black hover:bg-gray-500 text-white text-lg py-3 px-6 rounded-lg transition duration-300">
                장바구니 추가
              </button>

              <button className="bg-red-500 hover:bg-red-600 text-white text-lg py-3 px-6 rounded-lg transition duration-300">
                찜하기
              </button>
              <button
                className="bg-black hover:bg-red-600 text-white text-lg py-3 px-6 rounded-lg transition duration-300"
                onClick={handlePayment}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%] m-auto ">
          <img
            src={product.detail_images}
            alt={product.title}
            className="h-15 object-cover rounded-xl mt-14 "
          />
        </div>
      </div>
    </div>
  );
}
