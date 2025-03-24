/* eslint-disable no-useless-escape */
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { REGISTER_ERROR_MESSAGE } from './message';
import { EMAIL_REGEXP } from './regExp';

interface RegisterFormType {
  email: string | null;
  nickname: string | null;
  companyName: string | null;
  password: string | null;
  passwordCheck: string | null;
}
type RegisterErrorType = Record<keyof RegisterFormType, string | null>;

function useRegisterFormValidation() {
  const [registerFormValue, setRegisterFormValue] = useState<RegisterFormType>({
    email: null,
    nickname: null,
    companyName: null,
    password: null,
    passwordCheck: null,
  });
  const [errors, setErrors] = useState<RegisterErrorType>({
    nickname: null,
    companyName: null,
    email: null,
    password: null,
    passwordCheck: null,
  });

  const validateRegisterField = (
    name: string,
    formValues: RegisterFormType,
  ) => {
    let errorMessage;
    const {
      nickname: currentNicknameValue,
      companyName: currentCompanyNameValue,
      email: currentEmailValue,
      password: currentPasswordValue,
      passwordCheck: currentPasswordCheckValue,
    } = formValues;
    switch (name) {
      case 'nickname':
        if (!currentNicknameValue) {
          errorMessage = REGISTER_ERROR_MESSAGE.NICKNAME_EMPTY;
        } else if (
          currentNicknameValue.length <= 2 ||
          currentNicknameValue.length >= 20
        ) {
          errorMessage = REGISTER_ERROR_MESSAGE.NICKNAME_CONDITION;
        }
        break;
      case 'companyName':
        if (!currentCompanyNameValue) {
          errorMessage = REGISTER_ERROR_MESSAGE.COMPANY_EMPTY;
        }
        break;
      case 'email':
        if (!currentEmailValue) {
          errorMessage = REGISTER_ERROR_MESSAGE.EMAIL_EMPTY;
        } else if (!EMAIL_REGEXP.test(currentEmailValue)) {
          errorMessage = REGISTER_ERROR_MESSAGE.EMAIL_FORM;
        }
        break;
      case 'password':
        if (!currentPasswordValue) {
          errorMessage = REGISTER_ERROR_MESSAGE.PASSWORD_EMPTY;
        } else if (
          !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g.test(
            currentPasswordValue,
          )
        ) {
          errorMessage = REGISTER_ERROR_MESSAGE.PASSWORD_CONDITION;
        } else if (currentPasswordValue.length <= 8) {
          errorMessage = REGISTER_ERROR_MESSAGE.PASSWORD_LENGTH;
        }
        break;
      case 'passwordCheck':
        if (!currentPasswordCheckValue) {
          errorMessage = REGISTER_ERROR_MESSAGE.PASSWORD_EMPTY;
        } else if (currentPasswordCheckValue !== formValues.password) {
          errorMessage = REGISTER_ERROR_MESSAGE.PASSWORD_INCORRECT;
        }
        break;
      default:
        errorMessage = null;
        break;
    }
    return errorMessage;
  };

  const validateRegisterForm = () => {
    const newErrors: RegisterErrorType = {
      nickname: null,
      companyName: null,
      email: null,
      password: null,
      passwordCheck: null,
    };

    // 닉네임 검사
    if (!registerFormValue.nickname) {
      newErrors.nickname = REGISTER_ERROR_MESSAGE.NICKNAME_EMPTY;
    } else if (
      registerFormValue.nickname.length <= 2 ||
      registerFormValue.nickname.length >= 20
    ) {
      newErrors.nickname = REGISTER_ERROR_MESSAGE.NICKNAME_CONDITION;
    }

    // 회사명 검사
    if (!registerFormValue.companyName) {
      newErrors.companyName = REGISTER_ERROR_MESSAGE.COMPANY_EMPTY;
    }

    // 이메일 검사
    if (!registerFormValue.email) {
      newErrors.email = REGISTER_ERROR_MESSAGE.EMAIL_EMPTY;
    } else if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(registerFormValue.email)
    ) {
      newErrors.email = REGISTER_ERROR_MESSAGE.EMAIL_FORM;
    }

    // 비밀번호 검사
    if (!registerFormValue.password) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_EMPTY;
    } else if (registerFormValue.password.length <= 8) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_LENGTH;
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(registerFormValue.password)) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_CONDITION;
    }

    // 비밀번호 확인 검사
    if (!registerFormValue.passwordCheck) {
      newErrors.passwordCheck = REGISTER_ERROR_MESSAGE.PASSWORD_CHECK_EMPTY;
    } else if (registerFormValue.password !== registerFormValue.passwordCheck) {
      newErrors.passwordCheck = REGISTER_ERROR_MESSAGE.PASSWORD_INCORRECT;
    }

    // 오류가 있으면 상태 업데이트 후 false 반환
    if (
      newErrors.nickname ||
      newErrors.companyName ||
      newErrors.email ||
      newErrors.password ||
      newErrors.passwordCheck
    ) {
      setErrors(newErrors);
      return false;
    }

    // 모든 유효성 검사를 통과하면 true 반환
    return true;
  };

  // 디바운스된 유효성 검사 함수
  const debouncedValidate = useCallback(
    debounce((name: string, currentValues) => {
      const error = validateRegisterField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;

    setRegisterFormValue((prev) => {
      const newValues = { ...prev, [name]: value };

      debouncedValidate(name, newValues);
      return newValues;
    });
  };

  return { registerFormValue, handleChange, validateRegisterForm, errors };
}

export default useRegisterFormValidation;
