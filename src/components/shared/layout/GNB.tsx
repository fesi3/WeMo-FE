import { PropsWithChildren, useEffect } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import GNBHeader from '@/components/gnb/header';
import GNBFooter from '@/components/gnb/footer';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/authReducers';
import { clearUser, setUser } from '@/redux/userReducers';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  // 렌더링 될 때 마다 로그인 상태 서버에 요청.
  // 로그인이 성공해도, Invalidate하여 GNB가 렌더링 되도 캐싱 데이터가 전역 객체에 담기는 문제 해결.
  const { response } = useAuth();
  useEffect(() => {
    // 로그인 상태 변경 시 로그인 상태 전역 객체에 업데이트
    if (response?.success) {
      dispatch(login());
      dispatch(setUser(response.data));
    } else {
      dispatch(logout());
      dispatch(clearUser());
    }
  }, [response]);

  return (
    <main className={noto.className}>
      <GNBHeader response={response} />
      {children}
      <GNBFooter response={response} />
    </main>
  );
}

export default GNB;
