import { useState } from 'react';

import { EMAIL_REGEXP } from './regExp';
import { LOGIN_ERROR_MESSAGE } from './message';
import { LoginFormTypes } from './type';

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;

// 로그인 폼의 유효성 검사를 통해 에러 메세지를 반환하는 함수 입니다.
// 로그인 폼의 에러 메세지를 상태로 관리합니다.
function useLoginValidation() {
  const [errors, setErrors] = useState<loginErrorType>({
    email: null,
    password: null,
  });

  const validateField = (name: string, formValues: LoginFormTypes) => {
    const { email: currentEmailValue, password: currentPasswordValue } =
      formValues;
    let errorMessage = null;
    if (name === 'email') {
      if (!currentEmailValue) {
        errorMessage = LOGIN_ERROR_MESSAGE.EMAIL_EMPTY;
      } else if (!EMAIL_REGEXP.test(currentEmailValue)) {
        errorMessage = LOGIN_ERROR_MESSAGE.EMAIL_FORM;
      }
    } else if (name === 'password') {
      if (!currentPasswordValue) {
        errorMessage = LOGIN_ERROR_MESSAGE.PASSWORD_EMPTY;
      }
    }
    return errorMessage;
  };

  const validateForm = (currentLoginFormValue: LoginFormTypes) => {
    const newErrors: loginErrorType = {
      email: null,
      password: null,
    };
    // 이메일 관련 오류
    if (!currentLoginFormValue.email) {
      newErrors.email = LOGIN_ERROR_MESSAGE.EMAIL_EMPTY;
    } else if (!EMAIL_REGEXP.test(currentLoginFormValue.email)) {
      newErrors.email = LOGIN_ERROR_MESSAGE.EMAIL_FORM;
    }

    // 비밀번호 관련 오류
    if (!currentLoginFormValue.password) {
      newErrors.password = LOGIN_ERROR_MESSAGE.PASSWORD_EMPTY;
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return false;
    } else {
      return true;
    }
  };

  return { validateForm, validateField, errors, setErrors };
}

export default useLoginValidation;
