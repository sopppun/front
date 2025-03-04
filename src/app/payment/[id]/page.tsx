// app/payment/[product_id]/page.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function ProductPaymentPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");

  const { data: productData } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      );
      return response.json();
    },
    enabled: !!productId,
  });

  return (
    <div>
      <h1>결제 페이지</h1>
      {productData ? (
        <div>
          <p>상품명: {productData.name}</p>
          <p>가격: ₩{productData.price.toLocaleString()}</p>
          {/* 결제 기능 등 추가 */}
        </div>
      ) : (
        <p>상품 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
