"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface NewProductForm {
  product_name: string;
  price: number;
  stock_quantity: number;
  images: FileList | null; // FileList로 수정
}

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewProductForm>();

  // 이미지 미리보기 상태
  const [imagesPreview, setImagesPreview] = useState<string[]>([]); // 배열로 변경

  const [detailImages, setDetailImages] = useState<any[]>([]);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const id = crypto.randomUUID();
      const files = Array.from(e.target.files);
      setImagesPreview(files.map((file) => URL.createObjectURL(file)));
      setDetailImages([
        ...detailImages,
        { id, file: e.target.files[0], default: false },
      ]);
    }
  };

  // 제품 등록하기
  const NewProduct = async (data: FormData) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    const result = await response.json();
    return result.data;
  };

  const NewProductMutation = useMutation({
    mutationFn: (data: FormData) => NewProduct(data),
  });

  const onSubmit = (data: NewProductForm) => {
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("price", data.price.toString());
    formData.append("stock_quantity", data.stock_quantity.toString());
    formData.append("thumbnail", detailImages[0].file);

    if (detailImages) {
      detailImages.forEach((file) => {
        formData.append("images", file.file); // 여러 개의 파일을 추가
      });
    }

    NewProductMutation.mutate(formData, {
      onSuccess: (data) => {
        console.log("성공", data);
        alert("제품 등록 완료");
      },
      onError: (err) => {
        console.log(err, "등록 실패");
        alert("제품 등록 실패");
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center mt-5">제품 등록</h1>
      <div className="md:flex justify-center items-center mt-11">
        {/* 썸네일 박스 */}
        <div className="md:w-[45%] h-[500px] bg-slate-500 md:mr-7 flex justify-center items-center">
          {imagesPreview.length > 0 ? (
            imagesPreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`미리보기 이미지 ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            ))
          ) : (
            <span className="text-white">이미지를 선택하세요</span>
          )}
        </div>
        <form
          className="w-full md:w-[45%] h-[500px] sm:mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              상품명
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("product_name", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="price">
              가격
            </label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("price", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="stock_quantity"
            >
              수량
            </label>
            <input
              id="stock_quantity"
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("stock_quantity", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="file">
              이미지 파일 첨부
            </label>
            <input
              id="file"
              type="file"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={uploadImage}
            />
            {errors.images && (
              <p className="text-red-500">이미지를 선택해 주세요.</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-200 hover:text-black hover:border border-gray-200"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
