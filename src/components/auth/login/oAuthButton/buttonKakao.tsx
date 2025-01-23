import buttonKakao from '@/assets/images/btnY_kakao.png';
import Image from 'next/image';
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_PROD_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

function ButtonKakao() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(KAKAO_AUTH_URL, '_blank', 'width=500,height=700');
  };
  return (
    <button
      onClick={handleClick}
      className="h-[42px] w-[42px] rounded-full bg-yellow-400"
    >
      <Image src={buttonKakao} width={48} height={48} alt="kakao-login" />
    </button>
  );
}

export default ButtonKakao;
