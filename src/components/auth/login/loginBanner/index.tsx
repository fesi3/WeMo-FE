import Image from 'next/image';

function LoginBanner() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Image
        width={'235'}
        height={'178'}
        src={'/assets/images/logo-with-color.png'}
        alt="logo-image"
      />
      <p className="text-[15px] font-bold text-primary-10">
        {'당신의 관심이 만나는 순간'}
      </p>
    </div>
  );
}

export default LoginBanner;
