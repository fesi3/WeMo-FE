/* eslint-disable no-useless-escape */
import { useState } from 'react';

function useLoginForm() {
  const [loginFormValue, setLoginFormValue] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = (name: string, value: string) => {
    let errorMessage;
    switch (name) {
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
        }
        break;
      default:
        errorMessage = '';
        break;
    }
    return errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    const error = validateForm(name, value);
    setLoginFormValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  return { loginFormValue, handleChange, errors };
}

export default useLoginForm;
