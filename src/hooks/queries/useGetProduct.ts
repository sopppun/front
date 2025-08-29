import { getProducts } from "@/api/productsAPI";
import { queryKey } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey.products],
    queryFn: getProducts,
  });

  console.log(data, "data");
  return { data, isLoading, isError };
};
