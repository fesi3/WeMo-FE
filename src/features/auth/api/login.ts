import useLoginValidation from '../model/login.validation';
import useLoginMutaion from './login.mutation';

function useLogin() {
  const { validateForm } = useLoginValidation();
  const loginMutation = useLoginMutaion();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 폼 검증 실행
    const isValid = validateForm();
    // 폼이 유효하면 mutation 호출
    if (isValid) {
      loginMutation.mutate();
    }
  };

  return { handleSubmit };
}

export default useLogin;
