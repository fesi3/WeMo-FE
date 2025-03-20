import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

import { EMAIL_REGEXP } from './regExp';
import { LOGIN_ERROR_MESSAGE } from './message';
import { LoginFormTypes } from './type';

export type loginErrorType = Record<keyof LoginFormTypes, string | null>;

function useLoginValidation() {
  const [loginFormValue, setLoginFormValue] = useState<LoginFormTypes>({
    email: null,
    password: null,
  });
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
    console.log(currentLoginFormValue, '---currentLoginFormValue---');
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

  // 디바운스된 유효성 검사 함수
  const debouncedValidate = useCallback(
    debounce((name: string, currentValues: LoginFormTypes) => {
      const error = validateField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;

    setLoginFormValue((prev) => {
      const newValues = { ...prev, [name]: value };
      debouncedValidate(name, newValues);
      return newValues;
    });
  };

  return { loginFormValue, validateForm, handleChange, errors, setErrors };
}

export default useLoginValidation;
