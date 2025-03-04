import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

interface PostData {
  title: string;
  body: string;
}

const createPost = async (postData: PostData): Promise<PostData> => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("게시글 등록 실패");
  }

  return response.json();
};

function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>();

  const mutation = useMutation({
    mutationFn: createPost, // ✅ 제네릭 생략 가능
    onSuccess: () => {
      alert("게시글이 등록되었습니다!");
      reset(); // 폼 초기화
    },
    onError: () => {
      alert("게시글 등록에 실패했습니다.");
    },
  });

  const onSubmit = (formData: PostData) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>제목</label>
        <input {...register("title", { required: "제목을 입력해주세요." })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>내용</label>
        <textarea {...register("body", { required: "내용을 입력해주세요." })} />
        {errors.body && <p>{errors.body.message}</p>}
      </div>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "등록 중..." : "게시글 등록"}
      </button>
    </form>
  );
}

export default PostForm;
