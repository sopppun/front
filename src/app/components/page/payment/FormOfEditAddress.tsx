"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// 주소(Address) 타입 정의
type Address = {
  id: number;
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address: string;
  zip_code: string;
  shipping_memo: string;
  is_default: boolean;
};

// FormOfEditAddress 컴포넌트
// 이 컴포넌트는 배송지 정보를 수정(혹은 추가)하기 위한 폼을 렌더링합니다.
// setStep: 모달 단계 전환을 위한 함수 (예: 주소 목록 화면으로 돌아가기)
// addressOfEdit: 수정할 주소 정보가 전달되면 해당 값으로 폼을 초기화합니다.
export default function FormOfEditAddress({ setStep, addressOfEdit }: any) {
  // react-hook-form을 이용하여 폼 상태를 관리합니다.
  const { register, handleSubmit, setValue } = useForm<Address>();

  // 배송지 목록 상태 (필요에 따라, 수정 후 상태 업데이트에 사용)
  const [addresses, setAddresses] = useState<Address[]>([]);

  // 전달받은 addressOfEdit 값 확인 (디버그용)
  console.log(addressOfEdit, "addressOfEdit");

  const postAddress = async (updatedData: Address) => {
    const response = await fetch(`http://localhost:3000/api/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });
    const result = await response.json();
    return result.data;
  };

  const postMutation = useMutation({
    mutationFn: (data: Address) => postAddress(data),
  });
  const updateAddress = async (id: number, updatedData: Address) => {
    const response = await fetch(
      // URL에 addressOfEdit._id를 사용하여 해당 주소를 업데이트함
      `http://localhost:3000/api/address/${addressOfEdit._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      }
    );
    const result = await response.json();
    return result.data;
  };

  console.log(addressOfEdit, "address");

  // react-query의 useMutation을 사용하여 주소 업데이트를 수행합니다.
  // Mutation.mutate 호출 시 updateAddress 함수가 실행됩니다.
  const Mutation = useMutation({
    mutationFn: (data: Address) => updateAddress(addressOfEdit._id, data),
  });

  // 폼 제출 시 호출되는 함수
  // 폼에서 입력받은 데이터를 기반으로 주소를 업데이트하거나 추가합니다.
  const onSubmit = (data: any) => {
    // 폼에서 받은 데이터에서 필요한 필드만 추출
    const {
      receiver_name,
      main_address,
      detail_address,
      zip_code,
      receiver_phone,
      shipping_memo,
      is_default,
    } = data;
    const finalData = {
      receiver_name,
      main_address,
      detail_address,
      zip_code,
      receiver_phone,
      shipping_memo,
      is_default,
    };

    // addressOfEdit 값이 있으면 수정 모드, 없으면 추가 모드로 판단합니다.
    if (addressOfEdit) {
      //@ts-ignore

      Mutation.mutate(finalData, {
        onSuccess: (updateAddress) => {
          console.log("성공", updateAddress);
          alert("수정완료");
          console.log("ji");
          // 기존 주소 목록에서 해당 주소(id가 같은)를 업데이트한 데이터로 교체합니다.
          setAddresses((prevAddresses) =>
            prevAddresses.map((addr) =>
              addr.id === addressOfEdit.id ? updateAddress : addr
            )
          );

          // 작업이 완료되면 모달의 단계(step)를 1(예: 주소 목록 화면)로 변경합니다.
          setStep(1);
        },
        onError: (err) => {
          console.log(err, "실패");
          alert("수정실패");
        },
      });
    } else {
      console.log("ji");
      postMutation.mutate(finalData, {
        onSuccess: (data) => {
          console.log("성공", data);
          alert("입력완료");

          // 새로 추가된 주소를 기존 주소 목록에 추가합니다.
          setAddresses((prevAddresses) => [...(prevAddresses || []), data]);

          // 작업이 완료되면 모달의 단계(step)를 1로 변경합니다.
          setStep(1);
        },
        onError: (err: any) => {
          console.log(err, "실패");
          alert("입력실패입니다");
        },
      });
    }
  };

  // addressOfEdit 값이 변경되면, 해당 값으로 폼의 기본값을 세팅합니다.
  useEffect(() => {
    if (addressOfEdit) {
      setValue("receiver_name", addressOfEdit.receiver_name);
      setValue("receiver_phone", addressOfEdit.receiver_phone);
      setValue("main_address", addressOfEdit.main_address);
      setValue("detail_address", addressOfEdit.detail_address);
      setValue("zip_code", addressOfEdit.zip_code);
      setValue("shipping_memo", addressOfEdit.shipping_memo);
    }
  }, [addressOfEdit, setValue]);

  return (
    <div className="space-y-4 p-2">
      {/* 폼 제목 */}
      <h2 className="text-xl font-semibold mb-4">배송지 추가</h2>
      {/* 주소 폼 */}
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

        <label>배송메모</label>
        <input
          className="block w-full mb-4 p-2 border rounded"
          {...register("shipping_memo")}
        />

        {addressOfEdit ? (
          <button
            className="w-full mt-2 bg-blue-500 text-white py-2 my-2 rounded"
            type="submit"
          >
            수정완료
          </button>
        ) : (
          <button
            className="w-full mt-2 bg-blue-500 text-white py-2 my-2 rounded"
            type="submit"
          >
            저장
          </button>
        )}
      </form>

      {/* 뒤로가기 버튼 - 모달을 주소 목록 화면(step 1)으로 전환 */}
      <button
        className="w-full mt-2 bg-red-500 text-white py-2 my-2 rounded"
        onClick={() => setStep(1)}
      >
        뒤로가기
      </button>
    </div>
  );
}
