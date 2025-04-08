import { useState } from 'react';
import { REGISTER_ERROR_MESSAGE } from './message';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from './regExp';
import { RegisterFormType } from '../ui/registerForm';

export type RegisterErrorType = Record<keyof RegisterFormType, string | null>;

function useRegisterFormValidation() {
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
        } else if (!PASSWORD_REGEXP.test(currentPasswordValue)) {
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

  const validateRegisterForm = (registerFormValue: RegisterFormType) => {
    const newErrors: RegisterErrorType = {
      nickname: null,
      companyName: null,
      email: null,
      password: null,
      passwordCheck: null,
    };

    const {
      nickname: currentNicknameValue,
      companyName: currentCompanyNameValue,
      email: currentEmailValue,
      password: currentPasswordValue,
      passwordCheck: currentPasswordCheckValue,
    } = registerFormValue;

    // 닉네임 검사
    if (!currentNicknameValue) {
      newErrors.nickname = REGISTER_ERROR_MESSAGE.NICKNAME_EMPTY;
    } else if (
      currentNicknameValue.length <= 2 ||
      currentNicknameValue.length >= 20
    ) {
      newErrors.nickname = REGISTER_ERROR_MESSAGE.NICKNAME_CONDITION;
    }

    // 회사명 검사
    if (!currentCompanyNameValue) {
      newErrors.companyName = REGISTER_ERROR_MESSAGE.COMPANY_EMPTY;
    }

    // 이메일 검사
    if (!currentEmailValue) {
      newErrors.email = REGISTER_ERROR_MESSAGE.EMAIL_EMPTY;
    } else if (!EMAIL_REGEXP.test(currentEmailValue)) {
      newErrors.email = REGISTER_ERROR_MESSAGE.EMAIL_FORM;
    }

    // 비밀번호 검사
    if (!currentPasswordValue) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_EMPTY;
    } else if (currentPasswordValue.length <= 8) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_LENGTH;
    } else if (!PASSWORD_REGEXP.test(currentPasswordValue)) {
      newErrors.password = REGISTER_ERROR_MESSAGE.PASSWORD_CONDITION;
    }

    // 비밀번호 확인 검사
    if (!currentPasswordCheckValue) {
      newErrors.passwordCheck = REGISTER_ERROR_MESSAGE.PASSWORD_CHECK_EMPTY;
    } else if (currentPasswordValue !== currentPasswordCheckValue) {
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

  return { validateRegisterForm, validateRegisterField, errors, setErrors };
}

export default useRegisterFormValidation;
