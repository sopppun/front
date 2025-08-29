import { api } from "./api";

/*위시리스트 추가*/
export const fetchLike = async (id: string) => {
  return await api({
    url: `/articles/${id}/like`,
    method: "post",
    errorMessage: "위시리스트 추가에 실패하였습니다.",
  });
};
/*위시리스트 제거*/
export const fetchDisLike = async (id: string) => {
  return await api({
    url: `/articles/${id}/dislike`,
    method: "post",
    errorMessage: "위시리스트 제거에 실패하였습니다.",
  });
};

/**게시글 전체조회 */
export const fetchProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("fetch 실패");
  }
  return response.json();
};
