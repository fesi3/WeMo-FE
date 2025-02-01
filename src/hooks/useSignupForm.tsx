/* eslint-disable no-useless-escape */
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

function useSignupForm() {
  const [signupFormValue, setSignupFormValue] = useState({
    email: '',
    nickname: '',
    companyName: '',
    password: '',
    passwordCheck: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    companyName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const validateForm = (name: string, value: string) => {
    let errorMessage;
    switch (name) {
      case 'nickname':
        if (!value) {
          errorMessage = '닉네임을 작성해주세요.';
        } else if (value.length < 2 || value.length > 20) {
          errorMessage = '닉네임은 최소 2자, 최대 20자 이어야 합니다.';
        }
        break;
      case 'companyName':
        if (!value) {
          errorMessage = '회사명을 작성해주세요.';
        }
        break;
      case 'email':
        if (!value) {
          errorMessage = '이메일을 작성해주세요.';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
          errorMessage = '이메일 형식이 아닙니다.';
        }
        break;
      case 'password':
        if (!value) {
          errorMessage = '비밀번호를 작성해주세요.';
        } else if (
          !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g.test(
            value,
          )
        ) {
          errorMessage = '문자, 숫자, 특수기호를 하나 이상 포함해야 합니다.';
        } else if (value.length < 8) {
          errorMessage = '비밀번호는 8자리 이상 이어야 합니다.';
        }
        break;
      case 'passwordCheck':
        if (!value) {
          errorMessage = '비밀번호를 작성해주세요.';
        } else if (value !== signupFormValue.password) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
        }
        break;
      default:
        errorMessage = '';
        break;
    }
    return errorMessage;
  };

  // 디바운스된 유효성 검사 함수
  const debouncedValidate = useCallback(
    debounce((name: string, value: string) => {
      const error = validateForm(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    const error = validateForm(name, value);

    // 디바운스를 적용한 유효성 검사 실행
    debouncedValidate(name, value);

    // 폼 벨류 세터 함수
    setSignupFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 에러 세터 함수
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return { signupFormValue, handleChange, errors };
}

export default useSignupForm;
