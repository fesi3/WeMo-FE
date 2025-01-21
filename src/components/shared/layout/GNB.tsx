import { PropsWithChildren, useEffect } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';
import { setEmail } from '@/components/redux/actions/emailAction';
import { useDispatch, useSelector } from 'react-redux';
import { menuItems } from '@/constants/gnbMenu';
import { RootState } from '@/components/redux/store';
import { getCookieValue } from '@/utils/getCookieValue';

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

  return (
    <>
      <div className={noto.className}>
        <div className="fixed bottom-0 left-0 z-10 flex h-[50px] w-full items-center justify-center bg-white shadow-md">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`${
                  router.pathname === item.path
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                } cursor-pointer transition-colors hover:text-black`}
                onClick={() => router.push(item.path)}
              >
                {item.name}
              </li>
            ))}
            {storedData?.email ? (
              <li
                className={`${
                  router.pathname === 'user'
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                } cursor-pointer transition-colors hover:text-black`}
                onClick={() => router.push(`/user/${storedData.nickname}`)}
              >
                {'마이페이지'}
              </li>
            ) : (
              <li
                className={`${
                  router.pathname === 'start'
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                } cursor-pointer transition-colors hover:text-black`}
                onClick={() => router.push('/start')}
              >
                {'로그인'}
              </li>
            )}
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}

export default GNB;
