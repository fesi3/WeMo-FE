export interface LoginFormTypes {
  email: string | null;
  password: string | null;
}

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;

export interface RegisterFormTypes {
  email: string | null;
  nickname: string | null;
  companyName: string | null;
  password: string | null;
  passwordCheck: string | null;
}
