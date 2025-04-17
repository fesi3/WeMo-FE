import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { LoginFormTypes } from '@/features/auth/model/type';
import fetchData from '@/shared/api/fetchData';
import { API_PATHS } from '@/shared/constants/apiPath';
import { loginErrorType } from '@/features/auth/model/login.validation';
import { login } from '@/shared/lib/redux/authReducers';

const {
  AUTH: { SIGNIN },
} = API_PATHS;

interface useLoginMutaionProps {
  loginFormValue: LoginFormTypes;
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
}

function useLoginMutaion({ loginFormValue, setErrors }: useLoginMutaionProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<LoginFormTypes, AxiosError<{ message: string }>>({
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
      const errorMessage = error.response?.data.message;
      const field = errorMessage?.includes('비밀번호') ? 'password' : 'email';

      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage || null,
      }));
    },
  });
}

export default useLoginMutaion;
