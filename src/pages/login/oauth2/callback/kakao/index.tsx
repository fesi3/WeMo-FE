import instance from '@/api/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function SocialLogin() {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code'); // 인가코드가 저장된다.
  console.log(authCode);
  useEffect(() => {
    const response = instance.get(
      `/login/oauth2/callback/kakao?code=${authCode}`,
    );
    console.log(response);
  }, []);

  return <p>소셜 로그인 페이지</p>;
}

export default SocialLogin;
