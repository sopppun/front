// src/hooks/mutation/useLogin.ts

"use client";

import { login } from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      alert("로그인 성공");
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      alert("로그인 실패");
    },
  });
}
