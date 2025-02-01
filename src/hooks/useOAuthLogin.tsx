import instance from '@/api/axiosInstance';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { login } from '@/redux/authReducers';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

function useOAuthLogin(platform: string) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const isFetched = useRef(false); // ✅ 2번 요청 보내는 것 방지
  // 리다이렉트 페이지 쿼리 스트링에는 구글서버에서 보내주는 authcode가 담겨져있습니다.
  const authCode = searchParams.get('code');
  useEffect(() => {
    if (!authCode || isFetched.current) return; // ✅ authCode가 없거나 이미 요청을 보냈다면 실행하지 않음

    isFetched.current = true; // ✅ 요청 전에 상태 업데이트
    const fetchAuthCode = async () => {
      try {
        //authcode를 쿼리스트링으로 담아서 리소스 서버에 요청을 보냅니다.
        // 서버에서는 전달받은 authcode를 갖고 googleAutherizationSever에서 accessToken을 발급 받아 내려줍니다.
        // 또한 서버에서는 accessToken을 활용해 사용자 정보를 구글서버에서 받아와 유저 정보를 저장합니다.
        const response = await instance.get(
          `/login/oauth2/callback/${platform}?code=${authCode}`,
        );
        const { success } = response.data;
        // 요청이 성공해 accessToken이 클라이언트에 잘 전달됐다면 invalidateQueries를 통해 GNB 컴포넌트에서 useAuth 함수 안에 쿼리를 실행합니다.
        if (success) {
          dispatch(login());
          queryClient.invalidateQueries({ queryKey: ['auth'] });
          router.replace('/plans');
        }
      } catch (error) {
        console.error(`${platform} oAuth Error fetching data:`, error);
        throw error;
      }
    };
    fetchAuthCode();
  }, [authCode]);
}

export default useOAuthLogin;
