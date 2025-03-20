import { Dispatch, SetStateAction } from 'react';
import useLoginValidation, { loginErrorType } from '../model/login.validation';
import { LoginFormTypes } from '../model/type';
import useLoginMutaion from './login.mutation';

interface useLoginProps {
  currentLoginFormValue: LoginFormTypes;
  setErrors: Dispatch<SetStateAction<loginErrorType>>;
}

function useLogin({ currentLoginFormValue, setErrors }: useLoginProps) {
  const { validateForm } = useLoginValidation();
  const loginMutation = useLoginMutaion({ setErrors });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 검증 실행
    const isValid = validateForm(currentLoginFormValue);
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };

  return { handleSubmit };
}

export default useLogin;
