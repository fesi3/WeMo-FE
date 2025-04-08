import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import { API_PATHS } from '@/shared/constants/apiPath';
import fetchData from '@/shared/api/fetchData';
import { RegisterErrorType } from '../model/register.validation';
import { RegisterFormType } from '../ui/registerForm';
import { fieldKeywordMap } from '../model/fieldKeywordMap';

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
