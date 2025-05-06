export interface LoginFormTypes {
  email: string | null;
  password: string | null;
}

export interface RegisterFormTypes {
  nickname: string;
  companyName: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;
