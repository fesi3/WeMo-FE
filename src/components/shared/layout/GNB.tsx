import { PropsWithChildren, useEffect } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import GNBHeader from '@/components/gnb/header';
import GNBFooter from '@/components/gnb/footer';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/authReducers';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const router = useRouter();
  const dispatch = useDispatch();
  // 렌더링 될 때 마다 로그인 상태 서버에 요청
  const { response } = useAuth();

  useEffect(() => {
    // 로그인 상태 변경 시 로그인 상태 전역 객체에 업데이트
    if (response?.success) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [response]);

  // 하나의 레이아웃 컴포넌트에서 pathName에 접근해 조건부로 렌더링 합니다.
  const hideGnbHeaderRoutes = ['/login', '/start'];
  const hideGnbFooterRoutes = ['/signup', '/login', '/start'];
  const showGnbHeader = hideGnbHeaderRoutes.includes(router.pathname);
  const showGnbFooter = hideGnbFooterRoutes.includes(router.pathname);

  return (
    <main className={noto.className}>
      {showGnbHeader || <GNBHeader response={response} />}
      {children}
      {showGnbFooter || <GNBFooter response={response} />}
    </main>
  );
}

export default GNB;
