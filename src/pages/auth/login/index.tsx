import LoginForm from '@/features/auth/ui/loginForm';
import LoginFormContainer from '@/widgets/login/loginFormContainer';
import useLoginValidation from '@/features/auth/model/login.validation';
import useLogin from '@/features/auth/api/login';

export function LoginPage() {
  // 유효성 검사를 통해 errors를 반환
  // handleChange과 handleSubmit 함수에 setErrors 함수를 props로 전달해 각 함수 실행 시, error가 발생하면 setError를 할 수 있도록 설계.
  const { errors, setErrors } = useLoginValidation();

  // 폼 제출 핸들러 함수
  const { handleSubmit, requestStatus } = useLogin({
    setErrors,
  });

  return (
    <LoginFormContainer>
      <LoginForm
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
        requestStatus={requestStatus}
      />
    </LoginFormContainer>
  );
}
