import { API_URL } from "@/constants/API_URL";
import { api } from "./api";

/**카테고리 리스트 */
export const getCategories = async () => {
  const result = await api({
    url: `${API_URL.CATEGORY}`,
  });
  return result.data;
};
