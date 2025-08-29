import { getCategories } from "@/api/categoryAPI";
import { queryKey } from "@/lib/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKey.categories],
    queryFn: getCategories,
  });

  return { data, isLoading, isError };
};
