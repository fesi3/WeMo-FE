/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoginFormTypes } from '@/components/auth/type';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { login } from '@/redux/authReducers';
import { PATHS } from '@/constants/apiPath';
import { AxiosError } from 'axios';
const {
  AUTH: { SIGNIN },
} = PATHS;

interface LoginFormType {
  email: string;
  password: string;
}

type loginErrorType = Record<keyof LoginFormType, string | null>;

function useLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [loginFormValue, setLoginFormValue] = useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<loginErrorType>({
    email: null,
    password: null,
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    if (name === 'email') {
      if (!value) {
        errorMessage = '이메일을 작성해주세요.';
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
        errorMessage = '이메일 형식이 아닙니다.';
      }
    } else if (name === 'password') {
      if (!value) {
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

  const loginMutation = useMutation<
    LoginFormTypes,
    AxiosError<{ message: string }>
  >({
    mutationFn: () =>
      fetchData({
        param: SIGNIN,
        method: 'post',
        requestData: loginFormValue,
      }),
    onSuccess: () => {
      // 로그인이 성공하면 로그인 여부를 상태 업데이트 및 쿼리 invalidate
      // (invalidate 안해주면 요청 GNB 렌더링 되도 요청 안보냄)
      dispatch(login());
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      router.replace('/plans');
    },
    onError: (error) => {
      console.error(error);
      if (error.response?.data.message === '비밀번호가 일치하지 않습니다.') {
        setErrors((prev) => ({
          ...prev,
          password: error.response?.data.message || null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: error.response?.data.message || null,
        }));
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: name, value } = e.target;
    //
    setLoginFormValue((prev) => ({ ...prev, [name]: value }));

    if (errors['email'] || errors['password']) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 폼 검증 실행
    const isValid = validateForm();
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };
  return { loginFormValue, handleChange, handleSubmit, errors };
}

export default useLoginForm;
