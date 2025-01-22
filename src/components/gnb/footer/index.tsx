import { menuItems } from '@/constants/gnbMenu';
import GNBItem from '../item';
import { UserData } from '@/pages/user/[username]';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

interface GNBFooterProps {
  response?: {
    data: UserData;
    message: string;
    success: boolean;
  };
}

function GNBFooter({ response }: GNBFooterProps) {
  const router = useRouter();
  const nickname = response?.data?.nickname || '';
  const isLogin = useSelector((state: RootState) => state.auth.isLoggedIn);
  const hideGnbFooterRoutes = ['/signup', '/login', '/start'];
  const showGnbFooter = hideGnbFooterRoutes.includes(router.pathname);
  return (
    <>
      {showGnbFooter || (
        <footer className="fixed bottom-0 z-10 flex h-[50px] w-full items-center bg-white shadow-md md:invisible">
          <ul className="flex w-full justify-around px-5">
            {menuItems.map((item) => (
              <GNBItem text={item.name} path={item.path} />
            ))}
            {isLogin ? (
              <GNBItem text={'마이페이지'} path={`/user/${nickname}`} />
            ) : (
              <div>
                <GNBItem text={'로그인'} path={'/login'} />
              </div>
            )}
          </ul>
        </footer>
      )}
    </>
  );
}

export default GNBFooter;
