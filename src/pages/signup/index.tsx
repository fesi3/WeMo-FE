import SignupLayout from '@/components/signup/signupLayout';
import SignupForm from '@/components/signup/signupForm';

function Signup() {
  return (
    <div className="flex w-full justify-center">
      <SignupForm />
    </div>
  );
}

Signup.getLayout = function getLayout(page: React.ReactElement) {
  return <SignupLayout title={'회원가입'}>{page}</SignupLayout>;
};

export default Signup;
