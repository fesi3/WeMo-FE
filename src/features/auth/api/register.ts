import useSignupFormValidation, {
  RegisterErrorType,
} from '@/features/auth/model/register.validation';
import useRegisterMutation from './register.mutation';
import { RegisterFormType } from '../ui/registerForm';
import { Dispatch, SetStateAction } from 'react';
import { REGISTER_ERROR_MESSAGE } from '../model/message';

interface useRegisterProps {
  registerFormValue: RegisterFormType;
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
}

function useRegister({ registerFormValue, setErrors }: useRegisterProps) {
  const { validateRegisterForm } = useSignupFormValidation();
  const registerMutation = useRegisterMutation({
    registerFormValue,
    setErrors,
  });
  // 폼 제출 함수
  const handleSubmit = (registerFormValue: RegisterFormType) => {
    const { email, nickname, companyName, password, passwordCheck } =
      registerFormValue;

    if (!email && !nickname && !companyName && !password && !passwordCheck) {
      setErrors({
        email: REGISTER_ERROR_MESSAGE.EMAIL_EMPTY,
        nickname: REGISTER_ERROR_MESSAGE.NICKNAME_EMPTY,
        companyName: REGISTER_ERROR_MESSAGE.COMPANY_EMPTY,
        password: REGISTER_ERROR_MESSAGE.PASSWORD_EMPTY,
        passwordCheck: REGISTER_ERROR_MESSAGE.PASSWORD_CHECK_EMPTY,
      });
    } else {
      // 폼 검증 실행
      const isValid = validateRegisterForm(registerFormValue);

      // 폼이 유효하면 mutation 호출
      if (isValid) {
        registerMutation.mutate();
      }
    }
  };

  return { handleSubmit };
}

export default useRegister;
