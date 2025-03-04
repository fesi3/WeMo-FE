import SignupForm from '@/features/auth/register/registerForm';
import useSignupForm from '@/shared/hooks/useSignupForm';
import Header from '@/widgets/Header';

export function Register() {
  const { signupFormValue, handleChange, handleSubmit, errors } =
    useSignupForm();

  return (
    <>
      <Header title="회원목록" />
      <div className="mt-[22.5px] flex w-full justify-center md:mt-[80px]">
        <SignupForm
          registerFormValue={signupFormValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
    </>
  );
}
