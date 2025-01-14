import SignupLayout from '@/components/auth/signup/signupLayout';
import SignupForm from '@/components/auth/signup/signupForm';

function Signup() {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('폼 제출 완료!');
  };
  return (
    <div className="flex w-full justify-center">
      <SignupForm handleSubmit={handleSubmit} />
    </div>
  );
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <SignupLayout title={'회원가입'}>{page}</SignupLayout>;
};

export default Signup;
