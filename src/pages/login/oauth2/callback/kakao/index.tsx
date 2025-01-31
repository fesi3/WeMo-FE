import Image from 'next/image';
import logoWithColor from '@/assets/images/logo-with-color.png';
import useOAuthLogin from '@/hooks/useOAuthLogin';

// oAuth 로그인 버튼을 누르면 리다이렉트되는 페이지
// url에서 autherization code를 받아 서버에 전달한다.
function KakaoSocialLoginRedirect() {
  useOAuthLogin('kakao');

  return (
    <div className="flex h-screen w-full items-center justify-center text-3xl font-extrabold">
      <Image
        width={234}
        height={177}
        src={logoWithColor}
        alt="logo-with-color"
      />
    </div>
  );
}

export default KakaoSocialLoginRedirect;
