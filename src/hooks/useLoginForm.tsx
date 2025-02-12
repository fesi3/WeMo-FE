import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useMutation } from '@tanstack/react-query';
import { LoginFormTypes } from '@/components/auth/type';
import fetchData from '@/api/fetchData';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { login } from '@/redux/authReducers';
import { API_PATHS } from '@/constants/apiPath';
import { AxiosError } from 'axios';
import {
  EMAIL_VALIDATE_REG_EXP,
  WHITE_SPACE_REG_EXP,
} from '@/constants/regExp';
const {
  AUTH: { SIGNIN },
} = API_PATHS;

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

  const validateField = (name: string, formValues: LoginFormType) => {
    const { email: currentEmailValue, password: currentPasswordValue } =
      formValues;
    let errorMessage = '';
    // 공백제거
    const replacedCurrentEmailValue = currentEmailValue.replace(
      WHITE_SPACE_REG_EXP,
      '',
    );
    if (name === 'email') {
      if (!currentEmailValue) {
        errorMessage = '이메일을 작성해주세요.';
      } else if (!EMAIL_VALIDATE_REG_EXP.test(replacedCurrentEmailValue)) {
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
    } else if (!EMAIL_VALIDATE_REG_EXP.test(loginFormValue.email)) {
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
    // 공백제거
    const replacedEmailValue = value.replace(WHITE_SPACE_REG_EXP, '');
    setLoginFormValue((prev) => {
      const newValues = { ...prev, [name]: replacedEmailValue };

      if (errors['email'] || errors['password']) {
        debouncedValidate(name, newValues);
      }

      return newValues;
    });
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
