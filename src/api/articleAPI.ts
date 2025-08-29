import { api } from "./api";
import { ProductDetail } from "./types/product.Types";

/**게시글 등록 */
export const postArticle = async (formData: FormData) => {
  return await api({
    url: "/articles",
    method: "post",
    data: formData,
    errorMessage: "게시글 등록 실패하였습니다.",
  });
};

/*상품 디테일 페이지*/
export const fetchProductById = async (id: string): Promise<ProductDetail> => {
  const result = await api({
    url: `/articles/${id}`,
    method: "get",
    errorMessage: "상품 정보를 불러오는 데 실패했습니다.",
  });

  return result.data;
};
