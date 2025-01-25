import instance from '@/api/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// oAuth 로그인 버튼을 누르면 리다이렉트되는 페이지
// url에서 autherization code를 받아 서버에 전달한다.
function SocialLoginRedirect() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const authCode = searchParams.get('code');
    if (authCode !== null) {
      const response = instance.get(
        `/login/oauth2/callback/kakao?code=${authCode}`,
      );
      console.log(response, '---response---');
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center text-3xl font-extrabold">
      <p>로그인 중...</p>
    </div>
  );
}

export default SocialLoginRedirect;
