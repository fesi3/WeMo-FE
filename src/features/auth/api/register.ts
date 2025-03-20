import useSignupFormValidation from '@/features/auth/model/register.validation';
import useRegisterMutation from './register.mutation';

function useRegister() {
  const { validateRegisterForm } = useSignupFormValidation();
  const registerMutation = useRegisterMutation();
  // 폼 제출 함수
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 폼 검증 실행
    const isValid = validateRegisterForm();

    // 폼이 유효하면 mutation 호출
    if (isValid) {
      registerMutation.mutate();
    }
  };

  return { handleSubmit };
}

export default useRegister;
