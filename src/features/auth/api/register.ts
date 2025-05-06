import { Dispatch, SetStateAction } from 'react';
import useSignupFormValidation, {
  RegisterErrorType,
} from '@/features/auth/model/register.validation';
import useRegisterMutation from './register.mutation';
import { RegisterFormTypes } from '../model/type';
import { REGISTER_ERROR_MESSAGE } from '../model/message';
import { resetFocusFlag } from '@/shared/components/input/HoC/withError';

interface useRegisterProps {
  setErrors: Dispatch<SetStateAction<RegisterErrorType>>;
}

function useRegister({ setErrors }: useRegisterProps) {
  const { validateRegisterForm } = useSignupFormValidation();
  const registerMutation = useRegisterMutation({
    setErrors,
  });
  // 폼 제출 함수
  const handleSubmit = (registerFormValue: RegisterFormTypes) => {
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
        resetFocusFlag(); // 포커스 초기화
        registerMutation.mutate(registerFormValue);
      }
    }
  };

  const { status: requestStatus } = registerMutation;

  return { handleSubmit, requestStatus };
}

export default useRegister;
