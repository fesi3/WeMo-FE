import SignupLayout from '@/components/auth/signup/signupLayout';
import SignupForm from '@/components/auth/signup/signupForm';
import { useState } from 'react';

function Signup() {
  const [signupFormValue, setSignupFormValue] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    passwordVerification: '',
  });

  // 입력창 제어 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupFormValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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
      />
    </div>
  );
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <SignupLayout title={'회원가입'}>{page}</SignupLayout>;
};

export default Signup;
