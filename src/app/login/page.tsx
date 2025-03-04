"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface Input {
  email: string;
  password: string;
}

export default function Page() {
  const { register, handleSubmit } = useForm<Input>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginData = async (data: any) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json(data);
    return result.data;
  };

  const Mutation = useMutation({
    mutationFn: (data) => loginData(data),
  });

  const onSubmit = (data) => {
    const { email, password } = data;

    if (!email || !password) {
      return alert("이메일과 비밀번호가 비어있습니다.");
    } else
      Mutation.mutate(data, {
        onSuccess: (data) => {
          console.log("성공", data);
          queryClient.invalidateQueries({
            queryKey: ["get"],
          });
          alert("로그인성공");

          router.push("/");
        },
        onError: (err) => {
          console.log(err, "실패");
          alert("로그인실패");
        },
      });
  };
  return (
    <main>
      <div className="flex items-center justify-center md:translate-y-1/4  translate-y-24">
        <div>
          <h2 className="text-center font-bold text-2xl mb-10">로그인</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 flex flex-col">
              <label htmlFor="">이메일</label>
              <div className="border-2 p-2 relative">
                <input type="email" {...register("email")} />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="">비밀번호</label>
              <div className="border-2 p-2">
                <input type="password" {...register("password")} />
              </div>
            </div>
            <button
              type="submit"
              className="p-2 px-4 rounded-full bg-black text-white  md:mt-5 ml-[35%]"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
