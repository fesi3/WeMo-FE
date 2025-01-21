import { PropsWithChildren, useEffect } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import { setEmail } from '@/components/redux/actions/emailAction';
import { useDispatch, useSelector } from 'react-redux';
import { menuItems } from '@/constants/gnbMenu';
import { RootState } from '@/components/redux/store';
import { getCookieValue } from '@/utils/getCookieValue';
import Link from 'next/link';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const router = useRouter();

  const dispatch = useDispatch();
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
      {showGnb || (
        <header>
          <div className="w-full md:h-[80px]"></div>
          <div className="fixed top-0 z-10 flex h-16 w-full items-center bg-white shadow-md md:flex md:h-[80px]">
            <div className="flex w-full justify-between px-5">
              {/* 이미지 교체 필요 */}
              <Link href={'/meetings'}>
                <span className="text-xl font-bold">WeMo</span>
              </Link>
              <div className="flex items-center">
                <ul className="flex space-x-6">
                  <li
                    className={`${
                      router.pathname === 'user'
                        ? 'font-bold text-black'
                        : 'text-gray-400'
                    } invisible cursor-pointer transition-colors hover:text-black md:visible`}
                  >
                    {'검색'}
                  </li>
                  {storedData?.email ? (
                    <>
                      <Link href={`/user/${storedData.nickname}`}>
                        <li
                          className={`${
                            router.pathname === 'user'
                              ? 'font-bold text-black'
                              : 'text-gray-400'
                          } cursor-pointer transition-colors hover:text-black`}
                        >
                          {'마이페이지'}
                        </li>
                      </Link>
                      <Link href={'allReviews'}>
                        <li
                          className={`${
                            router.pathname === 'user'
                              ? 'font-bold text-black'
                              : 'text-gray-400'
                          } invisible cursor-pointer transition-colors hover:text-black md:visible`}
                        >
                          {'찜한 모임'}
                        </li>
                      </Link>
                    </>
                  ) : (
                    <Link href={'/start'}>
                      <li
                        className={`${
                          router.pathname === 'start'
                            ? 'font-bold text-black'
                            : 'text-gray-400'
                        } cursor-pointer transition-colors hover:text-black`}
                      >
                        {'로그인'}
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header>
      )}
      {children}
      <footer className="fixed bottom-0 z-10 flex h-[50px] w-full items-center bg-white shadow-md md:invisible">
        <ul className="flex w-full justify-around px-5">
          {menuItems.map((item) => (
            <li key={item.path} className="space-x-6">
              <Link href={item.path}>
                <span
                  className={`${
                    router.pathname === item.path
                      ? 'font-bold text-black'
                      : 'text-gray-400'
                  } cursor-pointer transition-colors hover:text-black`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </footer>
    </main>
  );
}

export default GNB;
