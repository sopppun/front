import { deleteCartItem, postFetchCart } from "@/api/cartAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCartMution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postFetchCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => alert("장바구니 추가 실패"),
  });
};

//장바구니 삭제
export const useDeleteCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
