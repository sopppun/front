import { fetchProducts } from "@/api/wishlistAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
