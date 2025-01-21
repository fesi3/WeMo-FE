import { PropsWithChildren, useEffect } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import { setEmail } from '@/components/redux/actions/emailAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/components/redux/store';
import { getCookieValue } from '@/utils/getCookieValue';
import GNBHeader from '@/components/gnb/header';
import GNBFooter from '@/components/gnb/footer';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const router = useRouter();
  const storedData = useSelector((state: RootState) => state.email);

  useEffect(() => {
    const storedEmail = getCookieValue('user_email');
    const storedNickname = getCookieValue('user_nickname') || '';
    if (storedEmail) {
      dispatch(setEmail(storedEmail, storedNickname));
    }
  }, []);

  // 하나의 레이아웃 컴포넌트에서 pathName에 접근해 조건부로 렌더링 합니다.
  const hideGnbRoutes = ['/login', '/start'];
  const showGnb = hideGnbRoutes.includes(router.pathname);

  return (
    <main className={noto.className}>
      {showGnb || <GNBHeader storedData={storedData} />}
      {children}
      {showGnb || <GNBFooter />}
    </main>
  );
}

export default GNB;
