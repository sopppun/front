"use client";

import { sendEmailCode } from "@/api/userAPI";
import { useMutation } from "@tanstack/react-query";

export const useSendEmailCode = () => {
  return useMutation({
    mutationFn: sendEmailCode,
    onSuccess: (data) => {
      console.log("이메일 인증 성공", data);
      alert("성공적으로 전송하였습니다.");
    },
    onError: (error) => {
      console.error("이메일 전송 실패", error);
      alert("이메일 전송 실패");
    },
  });
};
