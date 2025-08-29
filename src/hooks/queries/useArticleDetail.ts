// hooks/queries/useArticleDetail.ts
import { useQuery } from "@tanstack/react-query";

const getArticleDetail = async (articleId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${articleId}`,
    {
      credentials: "include",
    }
  );
  const result = await res.json();
  return result.data;
};

const useArticleDetail = (articleId: string | null) => {
  return useQuery({
    queryKey: ["articleDetail", articleId],
    queryFn: () => {
      if (!articleId) throw new Error("No articleId");
      return getArticleDetail(articleId);
    },
    enabled: !!articleId,
  });
};

export default useArticleDetail;
