import { API_URL } from "@/constants/API_URL";
import { Address } from "@/api/types/address.type";
import { api } from "./api";

// /** 배송지 목록 조회*/
// export const getAddress = async (): Promise<Address[]> => {
//   const response = await fetch(ENV.SERVER_URL! + API_URL.ADDRESS, {
//     credentials: "include",
//   });

//   const result = await response.json();
//   //console.log(result, "data");
//   return result.data;
// };

// /** 배송지 추가*/

// export const postAddress = async (data: Address): Promise<Address> => {
//   const response = await fetch(ENV.SERVER_URL! + API_URL.ADDRESS, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(data),
//   });
//   const result = await response.json();
//   console.log(result.data, "asdasdsad");
//   return result.data;
// };

// /**배송지 삭제*/

// export const deleteAddress = async (id: string): Promise<void> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/address/${id}`,
//     {
//       method: "DELETE",
//       credentials: "include",
//     }
//   );
// };

// /*배송지 수정*/

// export const updateAddress = async (
//   id: string,
//   data: Address
// ): Promise<Address> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/address/${id}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.json();
//   return result.data;
// };
/** 배송지 목록 조회*/
export const getAddress = async (): Promise<Address[]> => {
  const result = await api({ url: `${API_URL.ADDRESS}` });
  return result.data;
};

/** 배송지 추가*/
export const postAddress = async (data: Address): Promise<Address> => {
  const result = await api({
    url: `${API_URL.ADDRESS}`,
    method: "post",
    data,
    errorMessage: "배송지 추가 실패하였습니다.",
  });
  return result.data;
};

/**배송지 삭제*/

export const deleteAddress = async (id: string): Promise<void> => {
  return await api({
    url: `/address/${id}`,
    method: "delete",
    errorMessage: "배송지 삭제 실패하였습니다.",
  });
};

/*배송지 수정*/

export const updateAddress = async (id: string, data: Address) => {
  const result = await api({
    url: `/address/${id}`,
    method: "PATCH",
    data,
    errorMessage: "배송지 수정에 실패하였습니다.",
  });
  return result.data;
};
