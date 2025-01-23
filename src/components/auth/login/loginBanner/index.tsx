import Image from 'next/image';
import Link from 'next/link';

function LoginBanner({ description }: { description?: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link href={'/plans'}>
        <Image
          width={'235'}
          height={'178'}
          src={'/assets/images/logo-with-color.png'}
          alt="logo-image"
        />
        <p className="text-[15px] font-bold text-primary-10">{description}</p>
      </Link>
    </div>
  );
}

export default LoginBanner;
