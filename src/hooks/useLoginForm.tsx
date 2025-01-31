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
const {
  AUTH: { SIGNIN },
} = PATHS;

function useLoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [loginFormValue, setLoginFormValue] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
    const newErrors: { email: string; password: string } = {
      email: '',
      password: '',
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

    if (newErrors.email.length || newErrors.password.length) {
      setErrors(newErrors);
    } else {
      return true;
    }
  };

  const mutation = useMutation<LoginFormTypes>({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setErrors((prev) => ({ ...prev, email: error.response.data.message }));
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
      mutation.mutate();
    }
  };
  return { loginFormValue, handleChange, handleSubmit, errors };
}

export default useLoginForm;
