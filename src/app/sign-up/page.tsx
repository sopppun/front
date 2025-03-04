"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Input {
  email: string;
  email_code: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function Page() {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<Input>();

  //이메일전송

  const sendEmailCode = async (data: Input) => {
    const response = await fetch(
      "http://localhost:3000/api/users/email-check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json(data);
    return result.data;
  };

  const inputEmail = watch("email");

  const sendEmailCodeMutation = useMutation({
    mutationFn: (data) => {
      sendEmailCode(data);
    },
    onSuccess: (data) => {
      console.log(data);
      // if (data.code === 400) {
      //   setError("email", {
      //     type: "manual",
      //     message: "이미 존재하는 이메일입니다.",
      //   });
      // }
      console.log("인증성공", data);
      alert("성공적으로 전송하였습니다.");
    },
    onError: (err) => {
      console.log("에러", err);
      alert("에러");
    },
  });

  //인증하기

  const emailCodeConfirm = async (data: Input) => {
    const response = await fetch(
      "http://localhost:3000/api/users/email-confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result.data;
  };

  const inputEmailCode = watch("email_code");
  const EmailCodeConfirmMutation = useMutation({
    mutationFn: async (data) => {
      return await emailCodeConfirm(data);
    },
    onSuccess: (data) => {
      console.log("인증성공", data);
      alert("인증완료");
      setIsEmailConfirmed(true); // 이메일 인증 완료 후 필드 비활성화
    },
    onError: (err) => {
      console.log("인증실패", err);
      alert("인증실패");
    },
  });

  //회원가입
  const signUpData = async (data: Input) => {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.data;
  };

  const Mutation = useMutation({
    mutationFn: (data) => signUpData(data),
  });

  const onSubmit = (data: any) => {
    const { email, password, username, passwordConfirm } = data;
    const finalData = { email, password, username, passwordConfirm };

    //@ts-ignore
    Mutation.mutate(finalData, {
      onSuccess: (data) => {
        console.log("성공", data);
        alert("회원가입 완료");
        router.push("/login");
      },
      onError: (err) => {
        console.log(err, "실패");
        alert("회원가입 실패");
      },
    });
  };

  return (
    <main className="mt-20">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-center font-bold text-2xl md-10">회원가입</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md-5 flex flex-col">
              <label>이메일</label>
              <div className="border-2 p-2">
                <input
                  type="email"
                  {...register("email")}
                  disabled={isEmailConfirmed}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <button
                  type="button"
                  onClick={() =>
                    sendEmailCodeMutation.mutate({ email: inputEmail })
                  }
                >
                  코드전송
                </button>
              </div>
            </div>
            <div className="md-5 flex flex-col">
              <label>이메일 인증</label>
              <div className="border-2 p-2 flex justify-between">
                <input
                  type="text"
                  {...register("email_code")}
                  disabled={isEmailConfirmed}
                />
                <button
                  type="button"
                  onClick={() => {
                    EmailCodeConfirmMutation.mutate({
                      email: inputEmail,
                      email_code: inputEmailCode,
                    });
                  }}
                >
                  인증
                </button>
              </div>
            </div>
            <div>
              <label>유저이름</label>
              <div className="border-2 p-2">
                <input type="text" {...register("username")} />
              </div>
            </div>
            <div>
              <label>비밀번호</label>
              <div className="border-2 p-2">
                <input type="password" {...register("password")} />
              </div>
            </div>
            <div>
              <label>비밀번호 확인</label>
              <div className="border-2 p-2">
                <input type="password" {...register("passwordConfirm")} />
              </div>
            </div>
            <button className="p-2 mt-2 bg-slate-300" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
