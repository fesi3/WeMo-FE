import { Dispatch, SetStateAction } from 'react';
import useLoginValidation, { loginErrorType } from '../model/login.validation';
import { LoginFormTypes } from '../model/type';
import useLoginMutaion from './login.mutation';

interface useLoginProps {
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
  loginFormValue: LoginFormTypes;
}

function useLogin({ setErrors, loginFormValue }: useLoginProps) {
  const { validateForm } = useLoginValidation();
  const loginMutation = useLoginMutaion({ loginFormValue, setErrors });
  const handleSubmit = async (loginFormValue: LoginFormTypes) => {
    // 폼 검증 실행
    const isValid = validateForm(loginFormValue);
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };

  return { handleSubmit };
}

export default useLogin;
