import { api } from "./api";
import { CartPeoduct } from "./types/CartWishProduct.types";

//장바구니 추가
export const postFetchCart = async (productId: string) => {
  return await api({
    url: "/cart",
    method: "POST",
    errorMessage: "장바구니 추가 실패",
    data: { article_list: [{ article: productId, quantity: 1 }] },
  });
};

//장바구니 조회
export const fetchCart = async (): Promise<CartPeoduct> => {
  const result = await api({ url: "/cart" });
  return result.data;
};

//장바구니 삭제
export const deleteCartItem = async (id: string) => {
  return await api({
    url: `/cart/${id}`,
    method: "delete",
    errorMessage: "장바구니 삭제 실패",
  });
};
