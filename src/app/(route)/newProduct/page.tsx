"use client";

import { uploadProduct } from "@/api/productsAPI";
import { NewProductForm } from "@/api/types/product.Types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProductForm>();

  const router = useRouter();

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [detailImages, setDetailImages] = useState<
    { id: string; file: File; default: boolean }[]
  >([]);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setImagesPreview(files.map((file) => URL.createObjectURL(file)));

    const newDetailImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      default: false,
    }));

    setDetailImages(newDetailImages);
  };

  const NewProductMutation = useMutation({
    mutationFn: (data: FormData) => uploadProduct(data),
  });

  const onSubmit = (data: NewProductForm) => {
    const formData = new FormData();

    formData.append("product_name", data.product_name);
    formData.append("price", data.price.toString());
    formData.append("stock_quantity", data.stock_quantity.toString());

    if (detailImages.length > 0) {
      formData.append("thumbnail", detailImages[0].file);
      detailImages.forEach(({ file }) => {
        formData.append("images", file);
      });
    }

    console.log("👉 FormData 내용 확인");
    formData.forEach((value, key) => {
      console.log("🧾", key, value);
    });

    NewProductMutation.mutate(formData, {
      onSuccess: () => {
        alert("제품 등록 완료");
        router.push("/");
      },
      onError: (err) => {
        console.error("등록 실패", err);
        alert("제품 등록 실패");
      },
    });
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center mt-5">제품 등록</h1>
      <div className="md:flex justify-center items-center mt-11">
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
              multiple
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
