"use client";

import { emailCodeConfirm } from "@/api/userAPI";
import { useMutation } from "@tanstack/react-query";

export const useEmailCodeConfirm = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: emailCodeConfirm,
    onSuccess: (data) => {
      console.log("이메일 인증 성공", data);
      alert("인증 완료");
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      console.error("이메일 인증 실패", error);
      alert("이메일 인증 실패");
    },
  });
};
