import SignupForm from '@/features/auth/ui/registerForm';
import Header from '@/widgets/Header';

export function Register() {
  return (
    <>
      <Header title="회원목록" />
      <div className="mt-[22.5px] flex w-full justify-center md:mt-[80px]">
        <SignupForm />
      </div>
    </>
  );
}
