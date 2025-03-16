/* eslint-disable no-useless-escape */
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import useLoginMutaion from '@/features/auth/api/login.mutation';
interface LoginFormType {
  email: string;
  password: string;
}

type loginErrorType = Record<keyof LoginFormType, string | null>;

function useLoginForm() {
  const [loginFormValue, setLoginFormValue] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<loginErrorType>({
    email: null,
    password: null,
  });

  const validateField = (name: string, formValues: LoginFormType) => {
    const { email: currentEmailValue, password: currentPasswordValue } =
      formValues;
    let errorMessage = '';
    if (name === 'email') {
      if (!currentEmailValue) {
        errorMessage = '이메일을 작성해주세요.';
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(currentEmailValue)) {
        errorMessage = '이메일 형식이 아닙니다.';
      }
    } else if (name === 'password') {
      if (!currentPasswordValue) {
        errorMessage = '비밀번호를 작성해주세요.';
      }
    }
    return errorMessage;
  };

  const validateForm = () => {
    const newErrors: loginErrorType = {
      email: null,
      password: null,
    };

    if (!loginFormValue.email) {
      newErrors.email = '이메일을 작성해주세요.';
    } else if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(loginFormValue.email)
    ) {
      newErrors.email = '이메일 형식이 아닙니다.';
    }

    if (!loginFormValue.password) {
      newErrors.password = '비밀번호를 작성해주세요.';
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
    debounce((name: string, currentValues: LoginFormType) => {
      const error = validateField(name, currentValues);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;

    setLoginFormValue((prev) => {
      const newValues = { ...prev, [name]: value };

      debouncedValidate(name, newValues); // ✅ Pass latest form values
      return newValues;
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 폼 검증 실행
    const loginMutation = useLoginMutaion();
    const isValid = validateForm();
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };
  return { loginFormValue, handleChange, handleSubmit, errors, setErrors };
}

export default useLoginForm;
