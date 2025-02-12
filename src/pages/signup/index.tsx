import SignupForm from '@/components/auth/signup/signupForm';
import useSignupForm from '@/hooks/useSignupForm';

import Header from '@/components/shared/layout/Header';

function Signup() {
  const { signupFormValue, handleChange, handleSubmit, handleBlur, errors } =
    useSignupForm();

  return (
    <>
      <Header title={'회원목록'} />
      <div className="mt-[22.5px] flex w-full justify-center md:mt-[80px]">
        <SignupForm
          signupFormValue={signupFormValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
        />
      </div>
    </>
  );
}

export default Signup;
