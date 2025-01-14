import SignupLayout from '@/components/auth/signup/signupLayout';
import SignupForm from '@/components/auth/signup/signupForm';
import useSignupForm from '@/hooks/useSignupForm';

function Signup() {
  const { signupFormValue, handleChange, errors } = useSignupForm();

  // 폼 제출 함수
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(signupFormValue);
  };

  return (
    <div className="flex w-full justify-center">
      <SignupForm
        formValues={signupFormValue}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <SignupLayout title={'회원가입'}>{page}</SignupLayout>;
};

export default Signup;
