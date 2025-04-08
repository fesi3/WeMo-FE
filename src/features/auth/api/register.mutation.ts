import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { API_PATHS } from '@/shared/constants/apiPath';
import fetchData from '@/shared/api/fetchData';
import { RegisterErrorType } from '../model/register.validation';
import { RegisterFormType } from '../ui/registerForm';

const {
  AUTH: { SIGNUP },
} = API_PATHS;

interface useRegisterMutation {
  registerFormValue: RegisterFormType;
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
}

function useRegisterMutation({
  registerFormValue,
  setErrors,
}: useRegisterMutation) {
  const router = useRouter();

  return useMutation<RegisterFormType, AxiosError<{ message: string }>>({
    mutationFn: () =>
      fetchData({
        param: SIGNUP,
        method: 'post',
        requestData: registerFormValue,
      }),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      router.push('/app/login');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      // alert(errorMessage);
      const field = errorMessage?.includes('비밀번호') ? 'password' : 'email';

      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage || null,
      }));
    },
  });
}

export default useRegisterMutation;
