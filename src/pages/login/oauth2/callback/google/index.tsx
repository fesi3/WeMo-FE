import instance from '@/api/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import logoWithColor from '@/assets/images/logo-with-color.png';
import { login } from '@/redux/authReducers';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

// oAuth 로그인 버튼을 누르면 리다이렉트되는 페이지
// url에서 autherization code를 받아 서버에 전달한다.
function KakaoSocialLoginRedirect() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // 리다이렉트 페이지 쿼리 스트링에는 구글서버에서 보내주는 authcode가 담겨져있습니다.
    const authCode = searchParams.get('code');
    const fetchAuthCode = async () => {
      try {
        //authcode를 쿼리스트링으로 담아서 리소스 서버에 요청을 보냅니다.
        // 서버에서는 전달받은 authcode를 갖고 googleAutherizationSever에서 accessToken을 발급 받아 내려줍니다.
        // 또한 서버에서는 accessToken을 활용해 사용자 정보를 구글서버에서 받아와 유저 정보를 저장합니다.
        const response = await instance.get(
          `/login/oauth2/callback/google?code=${authCode}`,
        );
        const { success } = response.data;
        // 요청이 성공해 accessToken이 클라이언트에 잘 전달됐다면 invalidateQueries를 통해 GNB 컴포넌트에서 useAuth 함수 안에 쿼리를 실행합니다.
        if (success) {
          dispatch(login());
          queryClient.invalidateQueries({ queryKey: ['auth'] });
          router.push('/plans');
        }
      } catch (error) {
        console.error('google oAuth Error fetching data:', error);
        throw error;
      }
    };

    if (authCode !== null) {
      fetchAuthCode();
    }
  }, [searchParams]);

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
