import buttonGoogle from '@/assets/images/btnW_google.png';
import { GOOGLE_AUTH_URL } from '@/constants/oAuth';
import Image from 'next/image';
import Link from 'next/link';

function ButtonGoogle() {
  return (
    <Link href={GOOGLE_AUTH_URL}>
      <button className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-200">
        <Image src={buttonGoogle} width={30} height={30} alt="google-login" />
      </button>
    </Link>
  );
}

export default ButtonGoogle;
