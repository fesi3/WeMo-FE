/* eslint-disable no-useless-escape */
import { useState } from 'react';

function useSignupForm() {
  const [signupFormValue, setSignupFormValue] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    passwordVerification: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    passwordVerification: '',
  });

  const validateFrom = (name: string, value: string) => {
    let errorMessage;
    switch (name) {
      case 'name':
        if (!value) {
          errorMessage = '이름을 작성해주세요.';
        }
        break;
      case 'company':
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
        } else if (value.length < 8) {
          errorMessage = '비밀번호는 8자리 이상 이어야 합니다.';
        }
        break;
      case 'passwordVerification':
        if (!value) {
          errorMessage = '비밀번호를 작성해주세요.';
        } else if (value !== signupFormValue.password) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
        }
        break;
    }
    return errorMessage;
  };

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    const error = validateFrom(name, value);

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
