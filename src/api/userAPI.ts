import { api } from "./api";
import {
  AuthCheckResponse,
  EmailCodeConfirmInput,
  SendEmailCodeInput,
  SignUpInput,
} from "./types/user.types";

/*로그인확인*/
export const fetchAuthCheck = async (): Promise<AuthCheckResponse> => {
  const result = await api({
    url: "/users/auth-check",
    errorMessage: "인증 확인에 실패하였습니다.",
  });
  return result.data;
};

/*회원가입*/
export const signUp = async (data: SignUpInput) => {
  const result = await api({
    url: "/users/signup",
    method: "post",
    data,
    errorMessage: "회원가입에 실패하였습니다.",
  });
  return result.data;
};

/*로그인*/

export const login = async (data: { email: string; password: string }) => {
  const result = await api({
    url: "/users/login",
    method: "post",
    data,
    errorMessage: "로그인 실패하였습니다.",
  });
  return result.data;
};

/*로그아웃*/
export const handleLogout = async () => {
  return await api({
    url: "/users/logout",
    method: "post",
    errorMessage: "로그아웃 실패화였습니다",
  });
};
/*이메일인증*/
export const emailCodeConfirm = async (data: EmailCodeConfirmInput) => {
  const result = await api({
    url: "/users/email-confirm",
    method: "post",
    data,
    errorMessage: "이메일 인증에 실패하였습니다.",
  });

  return result.data;
};

/*인증번호 전송*/
export const sendEmailCode = async (data: SendEmailCodeInput) => {
  const result = await api({
    url: "/users/email-check",
    method: "post",
    data,
    errorMessage: "이메일 코드 전송 실패하였습니다.",
  });

  return result.data;
};
