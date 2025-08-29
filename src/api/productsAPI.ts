import { API_URL } from "@/constants/API_URL";
import { api } from "./api";

/**상품등록 */
export const uploadProduct = async (formData: FormData) => {
  const result = await api({
    url: "/products",
    method: "post",
    data: formData,
  });
  return result.data;
};

/*상품목록*/
export const getProducts = async () => {
  const result = await api({
    url: `${API_URL.PRODUCT}`,
    method: "get",
    errorMessage: "상품 목록을 불러오지 못했습니다.",
  });

  return result.data;
};
