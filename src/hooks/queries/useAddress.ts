import {
  deleteAddress,
  getAddress,
  postAddress,
  updateAddress,
} from "@/api/addressAPI";
import { Address } from "@/api/types/address.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/*배송지 조회*/
export const useGetAddress = () => {
  return useQuery<Address[]>({
    queryKey: ["address"],
    queryFn: getAddress,
  });
};

/*배송지 추가*/

export const usePostAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

/*배송지 삭제*/

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

/*배송지 수정*/

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Address }) =>
      updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: () => {
      alert("수정 실패");
    },
  });
};
