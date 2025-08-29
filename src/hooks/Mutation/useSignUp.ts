"use client";

import { signUp } from "@/api/userAPI";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("회원가입 성공", data);
      alert("회원가입이 완료되었습니다.");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("회원가입 실패", error);
      alert("회원가입 실패");
    },
  });
};
