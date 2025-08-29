"use client";

import { handleLogout } from "@/api/userAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleLogout,
    onSuccess: () => {
      queryClient.setQueryData(["authCheck"], { userId: "", nickname: "" });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useLogout;
