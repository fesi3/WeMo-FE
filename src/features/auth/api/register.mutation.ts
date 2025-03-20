import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { RegisterFormTypes } from '@/features/auth/model/type';
import { API_PATHS } from '@/shared/constants/apiPath';
import fetchData from '@/shared/api/fetchData';
import useSignupFormValidation from '@/features/auth/model/register.validation';

const {
  AUTH: { SIGNUP },
} = API_PATHS;

function useRegisterMutation() {
  const { registerFormValue } = useSignupFormValidation();
  const router = useRouter();

  return useMutation<RegisterFormTypes, AxiosError<{ message: string }>>({
    mutationFn: () =>
      fetchData({
        param: SIGNUP,
        method: 'post',
        requestData: registerFormValue,
      }),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    },
    onError: (error) => {
      alert(error.response?.data.message);
    },
  });
}

export default useRegisterMutation;
