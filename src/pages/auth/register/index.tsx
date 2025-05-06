import SignupForm from '@/features/auth/ui/registerForm';
import Header from '@/widgets/layout/Header';

export function Register() {
  return (
    <>
      <Header title="회원가입" />
      <div className="mt-[80px] flex w-full justify-center">
        <SignupForm />
      </div>
    </>
  );
}
