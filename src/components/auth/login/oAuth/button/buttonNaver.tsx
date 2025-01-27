import buttonNaver from '@/assets/images/btnG_naver.png';
import { NAVER_AUTH_URL } from '@/constants/oAuth';
import Image from 'next/image';
import Link from 'next/link';

function ButtonNaver() {
  return (
    <Link href={NAVER_AUTH_URL}>
      <button className="h-[42px] w-[42px] rounded-full bg-green-500">
        <Image src={buttonNaver} width={48} height={48} alt="naver-login" />
      </button>
    </Link>
  );
}

export default ButtonNaver;
