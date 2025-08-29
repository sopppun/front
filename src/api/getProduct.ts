import { api } from "./api";
import { ProductItem } from "./types/product.Types";

/*게시글 전체조회*/
export const getProducts = async (): Promise<ProductItem[]> => {
  return await api({
    url: "/products/?limit=10&page=1",
    errorMessage: "상품 목록을 불러올 수 없습니다.",
  });
};

/**상품 디테일 정보*/
export const getProductDetail = async (id: string) => {
  const result = await api({
    url: `/products/${id}`,
    errorMessage: "상품 정보를 가져올 수 없습니다.",
  });

  return result.data;
};
