/* eslint-disable no-useless-escape */

// 이메일 유효성 검사
export const EMAIL_VALIDATE_REG_EXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

// 공백 제거
export const WHITE_SPACE_REG_EXP = /\s/g;

// 비밀 번호 유효성 검사 (문자, 숫자, 특수기호를 하나 이상 포함)
export const PASSWORD_VALIDATE_REG_EXP =
  /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g;
