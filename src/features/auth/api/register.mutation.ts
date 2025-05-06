import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { API_PATHS } from '@/shared/constants/apiPath';
import { RegisterErrorType } from '../model/register.validation';
import { RegisterFormTypes } from '../model/type';
import { fieldKeywordMap } from '../model/fieldKeywordMap';
import axiosInstance from '@/shared/utils/axios';

interface useRegisterMutation {
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
}

function useRegisterMutation({ setErrors }: useRegisterMutation) {
  const router = useRouter();

  return useMutation<
    RegisterFormTypes,
    AxiosError<{ message: string }>,
    RegisterFormTypes
  >({
    mutationFn: async (registerFormValue: RegisterFormTypes) => {
      const res = await axiosInstance({
        method: 'post',
        url: API_PATHS.AUTH.SIGNUP,
        data: registerFormValue,
      });
      return res.data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      router.push('/login');
    },
    onError: (error) => {
      const errorMessage = error.response?.data.message;
      const errorField = fieldKeywordMap.find((keywordArray) => {
        const [keyword] = keywordArray;
        return errorMessage?.includes(keyword);
      });

      if (errorField) {
        const [, errorKeyword] = errorField;
        setErrors((prev) => ({
          ...prev,
          [errorKeyword]: errorMessage || null,
        }));
      }
    },
  });
}

export default useRegisterMutation;
