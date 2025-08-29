"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSendEmailCode } from "@/hooks/Mutation/useSendEmailConde";
import { useEmailCodeConfirm } from "@/hooks/Mutation/useEmailCodeConfirm";
import { useSignUp } from "@/hooks/Mutation/useSignUp";
import { SignUpInput } from "@/api/types/user.types";

export default function Page() {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpInput>();

  const inputEmail = watch("email");
  const inputEmailCode = watch("email_code");

  const sendEmailCodeMutation = useSendEmailCode();
  const emailCodeConfirmMutation = useEmailCodeConfirm(() =>
    setIsEmailConfirmed(true)
  );
  const signUpMutation = useSignUp(() => router.push("/login"));

  const onSubmit = (data: SignUpInput) => {
    signUpMutation.mutate(data);
  };

  const handleConfirmEmailCode = () => {
    if (!inputEmail || !inputEmailCode) {
      alert("이메일과 인증코드를 모두 입력해주세요.");
      return;
    }

    emailCodeConfirmMutation.mutate({
      email: inputEmail,
      email_code: inputEmailCode,
    });
  };

  return (
    <main className="mt-20">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-center font-bold text-2xl mb-10">회원가입</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5">
              <label>이메일</label>
              <div className="border-2 p-2 flex gap-2">
                <input
                  type="email"
                  {...register("email")}
                  disabled={isEmailConfirmed}
                />
                <button
                  type="button"
                  onClick={() =>
                    sendEmailCodeMutation.mutate({ email: inputEmail })
                  }
                >
                  코드전송
                </button>
              </div>
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="flex flex-col mb-5">
              <label>이메일 인증</label>
              <div className="border-2 p-2 flex gap-2">
                <input
                  type="text"
                  {...register("email_code")}
                  disabled={isEmailConfirmed}
                />
                <button type="button" onClick={handleConfirmEmailCode}>
                  인증
                </button>
              </div>
            </div>

            <div className="flex flex-col mb-5">
              <label>유저이름</label>
              <div className="border-2 p-2">
                <input type="text" {...register("username")} />
              </div>
            </div>

            <div className="flex flex-col mb-5">
              <label>비밀번호</label>
              <div className="border-2 p-2">
                <input type="password" {...register("password")} />
              </div>
            </div>

            <div className="flex flex-col mb-5">
              <label>비밀번호 확인</label>
              <div className="border-2 p-2">
                <input type="password" {...register("passwordConfirm")} />
              </div>
            </div>

            <button type="submit" className="p-2 bg-slate-300 w-full">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
