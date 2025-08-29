"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Address } from "@/api/types/address.type";
import { usePostAddress, useUpdateAddress } from "@/hooks/queries/useAddress";

interface Props {
  setStep: (step: number) => void;
  addressOfEdit?: Partial<Address>;
}

export default function FormOfEditAddress({ setStep, addressOfEdit }: Props) {
  const { register, handleSubmit, setValue } = useForm<Address>();
  const queryClient = useQueryClient();

  const postMutation = usePostAddress();
  const updateMutation = useUpdateAddress();

  const onSubmit: SubmitHandler<Address> = (data) => {
    if (addressOfEdit) {
      updateMutation.mutate(
        { id: String(addressOfEdit.id), data },
        {
          onSuccess: () => {
            alert("수정 완료!");
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            setStep(1);
          },
          onError: () => alert("수정 실패"),
        }
      );
    } else {
      postMutation.mutate(data, {
        onSuccess: () => {
          alert("입력 완료!");
          queryClient.invalidateQueries({ queryKey: ["addresses"] });
          setStep(1);
        },
        onError: () => alert("입력 실패"),
      });
    }
  };

  useEffect(() => {
    if (addressOfEdit) {
      addressOfEdit.receiver_name &&
        setValue("receiver_name", addressOfEdit.receiver_name);
      addressOfEdit.receiver_phone &&
        setValue("receiver_phone", addressOfEdit.receiver_phone);
      addressOfEdit.main_address &&
        setValue("main_address", addressOfEdit.main_address);
      addressOfEdit.detail_address &&
        setValue("detail_address", addressOfEdit.detail_address);
      addressOfEdit.zip_code && setValue("zip_code", addressOfEdit.zip_code);
      addressOfEdit.shipping_memo &&
        setValue("shipping_memo", addressOfEdit.shipping_memo);
      addressOfEdit.is_default !== undefined &&
        setValue("is_default", addressOfEdit.is_default);
    }
  }, [addressOfEdit, setValue]);

  return (
    <div className="space-y-4 p-2">
      <h2 className="text-xl font-semibold mb-4">
        {addressOfEdit ? "배송지 수정" : "배송지 추가"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>받는 사람</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("receiver_name")}
        />

        <label>기본 주소</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("main_address")}
        />

        <label>상세 주소</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("detail_address")}
        />

        <label>우편번호</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("zip_code")}
        />

        <label>연락처</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("receiver_phone")}
        />

        <label>배송 메모</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("shipping_memo")}
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("is_default")} />
          <span>기본 배송지로 설정</span>
        </label>

        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
          type="submit"
        >
          {addressOfEdit ? "수정 완료" : "저장"}
        </button>
      </form>

      <button
        className="w-full mt-2 bg-red-500 text-white py-2 rounded"
        onClick={() => setStep(1)}
      >
        뒤로가기
      </button>
    </div>
  );
}
