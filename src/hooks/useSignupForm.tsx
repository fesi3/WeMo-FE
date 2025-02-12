import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { SignupFormTypes } from '@/components/auth/type';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';
import { API_PATHS } from '@/constants/apiPath';
import { AxiosError } from 'axios';
import {
  EMAIL_VALIDATE_REG_EXP,
  PASSWORD_VALIDATE_REG_EXP,
} from '@/constants/regExp';
import { MESSAGE } from '@/constants/message';

interface SignupFormType {
  email: string;
  nickname: string;
  companyName: string;
  password: string;
  passwordCheck: string;
}
type SignupErrorType = Record<keyof SignupFormType, string | null>;

function useSignupForm() {
  const [signupFormValue, setSignupFormValue] = useState<SignupFormType>({
    email: '',
    nickname: '',
    companyName: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState<SignupErrorType>({
    nickname: null,
    companyName: null,
    email: null,
    password: null,
    passwordCheck: null,
  });

  const router = useRouter();
  const {
    AUTH: { SIGNUP },
  } = API_PATHS;

  const signupMutation = useMutation<
    SignupFormTypes,
    AxiosError<{ message: string }>
  >({
    mutationFn: () =>
      fetchData({
        param: SIGNUP,
        method: 'post',
        requestData: signupFormValue,
      }),
    onSuccess: () => {
      alert(MESSAGE.SUCCESS.SIGNUP);
      router.push('/login');
    },
    onError: (error) => {
      alert(error.response?.data.message);
    },
  });

  const validateField = (name: string, formValues: SignupFormType) => {
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
          errorMessage = MESSAGE.ERROR.NICKNAME_EMPTY;
        } else if (
          currentNicknameValue.length <= 2 ||
          currentNicknameValue.length >= 20
        ) {
          errorMessage = MESSAGE.ERROR.NICKNAME_BOUNDARY;
        }
        break;
      case 'companyName':
        if (!currentCompanyNameValue) {
          errorMessage = MESSAGE.ERROR.COMPANYNAME_EMPTY;
        }
        break;
      case 'email':
        if (!currentEmailValue) {
          errorMessage = MESSAGE.ERROR.EMAIL_EMPTY;
        } else if (!EMAIL_VALIDATE_REG_EXP.test(currentEmailValue)) {
          errorMessage = MESSAGE.ERROR.EMAIL_VALIDATE;
        }
        break;
      case 'password':
        if (!currentPasswordValue) {
          errorMessage = MESSAGE.ERROR.PASSWORD_EMPTY;
        } else if (!PASSWORD_VALIDATE_REG_EXP.test(currentPasswordValue)) {
          errorMessage = MESSAGE.ERROR.PASSWORD_VALIDATE;
        } else if (currentPasswordValue.length <= 8) {
          errorMessage = MESSAGE.ERROR.PASSWORD_BOUNDARY;
        }
        break;
      case 'passwordCheck':
        if (!currentPasswordCheckValue) {
          errorMessage = MESSAGE.ERROR.PASSWORD_EMPTY;
        } else if (currentPasswordCheckValue !== formValues.password) {
          errorMessage = MESSAGE.ERROR.PASSWORD_NOT_EQUAL;
        }
        break;
      default:
        errorMessage = '';
        break;
    }
    return errorMessage;
  };

  const validateForm = () => {
    const newErrors: SignupErrorType = {
      nickname: null,
      companyName: null,
      email: null,
      password: null,
      passwordCheck: null,
    };

    // 닉네임 검사
    if (!signupFormValue.nickname) {
      newErrors.nickname = MESSAGE.ERROR.NICKNAME_EMPTY;
    } else if (signupFormValue.nickname.length <= 2) {
      newErrors.nickname = MESSAGE.ERROR.NICKNAME_BOUNDARY;
    }

    // 회사명 검사
    if (!signupFormValue.companyName) {
      newErrors.companyName = MESSAGE.ERROR.COMPANYNAME_EMPTY;
    }

    // 이메일 검사
    if (!signupFormValue.email) {
      newErrors.email = MESSAGE.ERROR.EMAIL_EMPTY;
    } else if (!EMAIL_VALIDATE_REG_EXP.test(signupFormValue.email)) {
      newErrors.email = MESSAGE.ERROR.EMAIL_VALIDATE;
    }

    // 비밀번호 검사
    if (!signupFormValue.password) {
      newErrors.password = MESSAGE.ERROR.PASSWORD_EMPTY;
    } else if (signupFormValue.password.length <= 8) {
      newErrors.password = MESSAGE.ERROR.PASSWORD_BOUNDARY;
    } else if (!PASSWORD_VALIDATE_REG_EXP.test(signupFormValue.password)) {
      newErrors.password = MESSAGE.ERROR.PASSWORD_VALIDATE;
    }

    // 비밀번호 확인 검사
    if (!signupFormValue.passwordCheck) {
      newErrors.passwordCheck = MESSAGE.ERROR.PASSWORD_EMPTY;
    } else if (signupFormValue.password !== signupFormValue.passwordCheck) {
      newErrors.passwordCheck = MESSAGE.ERROR.PASSWORD_NOT_EQUAL;
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
      const error = validateField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    setSignupFormValue((prev) => {
      const newValues = { ...prev, [name]: value };
      debouncedValidate(name, newValues);
      return newValues;
    });
  };

  // onBlur 이벤트 핸들러
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    const newValues = { ...signupFormValue, [name]: value };
    const error = validateField(name, newValues);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 폼 제출 함수
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 폼 검증 실행
    const isValid = validateForm();

    // 폼이 유효하면 mutation 호출
    if (isValid) {
      signupMutation.mutate();
    }
  };

  return { signupFormValue, handleChange, handleSubmit, handleBlur, errors };
}

export default useSignupForm;
