import buttonKakao from '@/assets/images/btnY_kakao.png';
import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import Image from 'next/image';
import Link from 'next/link';

function ButtonKakao() {
  return (
    <Link href={KAKAO_AUTH_URL}>
      <div className="h-[42px] w-[42px] rounded-full bg-yellow-400">
        <Image src={buttonKakao} width={48} height={48} alt="kakao-login" />
      </div>
    </Link>
  );
}

export default ButtonKakao;
