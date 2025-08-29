"use client";

import { useGetCategory } from "@/hooks/queries/useGetCategory";
import { useGetProduct } from "@/hooks/queries/useGetProduct";
import { Category } from "@/api/types/category";
import { DetailImage } from "@/api/types/detail-images";
import { ProductListItem } from "@/api/types/product.Types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postArticle } from "@/api/articleAPI";

interface ApiKey {
  key: "title" | "product" | "category";
  label: string;
}

export default function PostForm() {
  /** Constant*/
  const apiKey: ApiKey[] = [
    { key: "title", label: "게시글 제목" },
    { key: "product", label: "상품" },
    { key: "category", label: "카테고리" },
  ];
  /** Hook */
  const router = useRouter();
  const { handleSubmit, register, control } = useForm();
  const { mutate } = useMutation<any, any, FormData>({
    mutationFn: postArticle,
  });

  /**state */
  const [detailImages, setDetailImages] = useState<DetailImage[]>([]);

  /** Data */
  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetCategory();

  const {
    data: products,
    isLoading: productLoading,
    isError: productError,
  } = useGetProduct();

  /** Funtions */
  const onSubmit = (data: FieldValues) => {
    console.table(data);
    console.log("gi");

    if (!data) return;

    if (detailImages.length === 0) {
      return Swal.fire("상세이미지를 등록해주세요");
    }

    const formData = new FormData();

    detailImages.forEach((image) => {
      formData.append("detail_images", image.file);
    });

    apiKey.forEach((it) => {
      if (!data[it.key]) {
        return Swal.fire(`${it.label}이 등록되지않았습니다.`);
      } else {
        formData.append(it.key, data[it.key]);
      }
    });

    mutate(formData, {
      onSuccess: () => {
        router.push("/articles");
        return Swal.fire("데이터 전송 성공하였습니다.");
      },
      onError: () => {
        return Swal.fire("데이터 전송 실패하였습니다.");
      },
    });
  };

  const handleImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files).map((file, index) => ({
      file,
      src: URL.createObjectURL(file),
      id: index,
    }));

    setDetailImages(filesArray);
  };
  console.log(detailImages, "detail");

  const handleDelete = (id: number) => {
    const newArray = detailImages.filter((item) => item.id !== id);
    setDetailImages(newArray);
  };

  /** Variables */
  const pageLoading = categoryLoading || productLoading;
  const pageError = categoryError || productError;

  /** CSS */
  const inputClass = "border rounded-md shadow-md h-[35px] px-1 w-[300px]";
  const labelClass = "w-[140px]";
  const divClass = "flex gap-3 items-center ";

  /** Console */
  console.log(categories, "data");
  console.log(products, "data");

  if (pageLoading) return <div>로딩중</div>;
  if (pageError) return <div>에러발생</div>;

  return (
    <main className="flex flex-col gap-10 justify-center items-center h-screen">
      <h2 className="text-2xl font-semibold">게시글등록</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className={divClass}>
          <label htmlFor="" className={labelClass}>
            게시글 제목
          </label>
          <input {...register("title")} type="text" className={inputClass} />
        </div>
        <div className={divClass}>
          <label htmlFor="" className={labelClass}>
            카테고리선택
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <select
                  className={inputClass}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="">--카테고리--</option>
                  {categories?.map((item: Category, index: number) => (
                    <option key={index} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              );
            }}
          />
        </div>
        <div className={divClass}>
          <label htmlFor="" className={labelClass}>
            상품선택
          </label>
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <select
                  className={inputClass}
                  value={field.value}
                  onChange={field.onChange}
                >
                  {Array.isArray(products) &&
                    products?.map((item: ProductListItem, index: number) => (
                      <option key={index} value={item._id}>
                        {item.product_name}
                      </option>
                    ))}
                </select>
              );
            }}
            name="product"
          />
        </div>
        <div className={divClass}>
          <label htmlFor="" className={labelClass}>
            상세 이미지 선택
          </label>
          <label htmlFor="image" className={`${inputClass} text-center`}>
            사진등록
          </label>
          <input
            id="image"
            className={`${inputClass} hidden`}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImage}
          />
          <div className="flex gap-3 mt-3">
            {detailImages.map((item, index) => (
              <div key={index}>
                <img
                  src={item.src}
                  alt="thumbnail"
                  className="w-24 h-24 object-cover"
                />
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-400 px-3 py-2 rounded-md font-bold text-white hover:opacity-70 cursor-pointer">
            전송
          </button>
        </div>
      </form>
    </main>
  );
}
