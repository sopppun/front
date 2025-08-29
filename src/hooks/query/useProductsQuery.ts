import getProducts from "@/api/getProduct";
import { useQuery } from "@tanstack/react-query";

const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export default useProductsQuery;
