import { getProductDetail } from "@/api/getProduct";
import { useQuery } from "@tanstack/react-query"; // 정확한 경로

const useProductDetail = (productId: string | null) => {
  return useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => {
      if (!productId) throw new Error("No productId provided");
      return getProductDetail(productId);
    },
    enabled: !!productId,
  });
};

export default useProductDetail;
