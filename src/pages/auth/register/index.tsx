import useRegister from '@/features/auth/api/register';
import useRegisterFormValidation from '@/features/auth/model/register.validation';
import SignupForm from '@/features/auth/ui/registerForm';
import Header from '@/widgets/layout/Header';
import RegisterFormContainer from '@/widgets/register/registerFormContainer';

export function RegisterPage() {
  const { errors, setErrors } = useRegisterFormValidation();
  const { handleSubmit, requestStatus } = useRegister({ setErrors });
  return (
    <>
      <Header title="회원가입" />
      <RegisterFormContainer>
        <SignupForm
          handleSubmit={handleSubmit}
          errors={errors}
          setErrors={setErrors}
          requestStatus={requestStatus}
        />
      </RegisterFormContainer>
    </>
  );
}
