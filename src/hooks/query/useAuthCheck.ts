import { fetchAuthCheck } from "@/api/userAPI";
import { useQuery } from "@tanstack/react-query";

export default function useAuthCheck() {
  return useQuery({
    queryKey: ["authCheck"],
    queryFn: fetchAuthCheck,
  });
}
