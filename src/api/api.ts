import { ApiProps } from "./types/api.type";

export const api = async ({
  url,
  method = "get",
  errorMessage = "요청이 실패하였습니다.",
  data = {},
}: ApiProps) => {
  const isFormData =
    typeof FormData !== "undefined" && data instanceof FormData;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${url}`, {
    method,
    credentials: "include",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body:
      method !== "get" ? (isFormData ? data : JSON.stringify(data)) : undefined,
  });

  if (!response.ok) throw new Error(errorMessage);

  const result = await response.json();
  return result;
};
