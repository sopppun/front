"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 제품 타입 정의
type Product = {
  id: string; // 제품의 아이디 필드
  product: any;
  detail_images: string;
  title: string;
  price: number;
  stock_quantity: number;
};

export default function PostUpload() {
  const router = useRouter();
  // 등록된 제품을 가져오는 함수
  const fetchProducts = async () => {
    const response = await fetch(
      "http://localhost:3000/api/articles?limit=50&page=1",
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  };

  // useQuery를 사용하여 서버에서 제품 목록 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // 로딩 상태 처리
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 에러 상태 처리
  if (isError) {
    return <p>Failed to load products.</p>;
  }

  // 서버에서 가져온 제품 데이터
  const products: Product[] = data?.data?.results || [];
  console.log(products);
  console.log(products, "productsData");

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-center mt-5">등록된 제품</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products?.map((product) => (
          <div
            key={product.id} // id 값을 key로 사용
            className="max-w-sm p-4 border border-gray-300 rounded-lg hover:border-black hover:shadow-md transition duration-300"
          >
            <img
              src={product?.product?.thumbnail} // 서버에서 가져온 이미지 URL
              alt={"미리보기이미지"}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-700 mt-2">
                가격: ₩{product?.product?.price?.toLocaleString()}
              </p>
              <p className="text-gray-700 mt-2">
                수량: {product?.product?.stock_quantity}
              </p>
              <button
                className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
                onClick={() => {
                  // 제품 상세 페이지로 이동하는 로직 (예시)
                  router.push(`/articles/${product._id}`);
                }}
              >
                제품보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
