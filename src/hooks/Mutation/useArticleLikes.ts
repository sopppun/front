import { fetchDisLike, fetchLike } from "@/api/wishlistAPI";
import { useMutation } from "@tanstack/react-query";

export const useLikeMutation = () =>
  useMutation({ mutationFn: (id: string) => fetchLike(id) });

export const useDisLikeMutation = () =>
  useMutation({ mutationFn: (id: string) => fetchDisLike(id) });
