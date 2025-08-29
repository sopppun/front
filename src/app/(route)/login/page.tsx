"use client";

import React from "react";
import { LoginInput } from "@/api/types/user.types";
import useLogin from "@/hooks/query/useLogin";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const loginMutation = useLogin();

  const onSubmit = (data: LoginInput) => {
    const { email, password } = data;
    if (!email || !password) {
      return alert("이메일과 비밀번호를 모두 입력해주세요.");
    }
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] border flex flex-col p-10 gap-9 items-center justify-center text-[18px] shadow-md"
      >
        <div className="flex items-center gap-4 w-full">
          <label className="w-[80px]">이메일</label>
          <input
            {...register("email", { required: "이메일을 입력하세요." })}
            className="flex-1 p-3 rounded-md border"
          />
        </div>

        <div className="flex items-center gap-4 w-full">
          <label className="w-[80px]">비밀번호</label>
          <input
            type="password"
            {...register("password", { required: "비밀번호를 입력하세요." })}
            className="flex-1 p-3 rounded-md border"
          />
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full p-3 bg-black text-white rounded-md"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
