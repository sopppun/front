/*로그인된 사용자 인증 상태*/
export interface AuthCheckResponse {
  userId: string;
  nickname: string;
  username: string;
  email: string;
  isLoggedIn: boolean;
}

/*로그인(이메일,패스워드)*/
export interface LoginInput {
  email: string;
  password: string;
}

/*회원가입*/
export interface SignUpInput {
  email: string;
  email_code: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

/* 회원가입 요청*/
export interface SignUpInput {
  email: string;
  password: string;
  username: string;
  passwordConfirm: string;
}

/**이메일 인증 코드 확인 */
export interface EmailCodeConfirmInput {
  email: string;
  email_code: string;
}

/*이메일 인증 코드 요청*/
export interface SendEmailCodeInput {
  email: string;
}
