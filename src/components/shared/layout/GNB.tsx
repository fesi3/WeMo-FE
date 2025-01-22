import { PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import GNBHeader from '@/components/gnb/header';
import GNBFooter from '@/components/gnb/footer';
import useAuth from '@/hooks/useAuth';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/components/redux/store';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const router = useRouter();
  const { response } = useAuth();
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
