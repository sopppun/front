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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`
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
        </div>
      ) : (
        <p>상품 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
