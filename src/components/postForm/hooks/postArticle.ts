import { postArticle } from "@/api/articleAPI";
import { useMutation } from "@tanstack/react-query";

export const usePostArticle = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postArticle(formData),
  });
};
