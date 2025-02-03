import Image from 'next/image';
import Link from 'next/link';
import logoWithColor from '@/assets/images/logo-with-color.png';
import { twMerge } from 'tailwind-merge';

function LoginBanner({ description }: { description?: string }) {
  return (
    <div
      className={twMerge(
        description && 'mb-[63px] md:mb-[65px]',
        'flex flex-col items-center gap-6',
      )}
    >
      <Link href={'/plans'}>
        <div className="flex flex-col items-center">
          <Image
            width={'235'}
            height={'178'}
            src={logoWithColor}
            alt="logo-image"
          />
          <p className="mt-6 text-[15px] font-bold text-primary-10">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default LoginBanner;
