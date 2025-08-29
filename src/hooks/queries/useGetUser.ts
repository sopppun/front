import { fetchAuthCheck } from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: fetchAuthCheck,
  });

  return { data };
};
