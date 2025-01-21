import { menuItems } from '@/constants/gnbMenu';
import GNBItem from '../item';
import { UserData } from '@/pages/user/[username]';

interface GNBFooterProps {
  response?: {
    data: UserData;
    message: string;
    success: boolean;
  };
}

function GNBFooter({ response }: GNBFooterProps) {
  const nickname = response?.data?.nickname || ''; // Fallback to empty string
  const success = response?.success || false; // Default to `false` if `response` is undefined
  return (
    <footer className="fixed bottom-0 z-10 flex h-[50px] w-full items-center bg-white shadow-md md:invisible">
      <ul className="flex w-full justify-around px-5">
        {menuItems.map((item) => (
          <GNBItem text={item.name} path={item.path} />
        ))}
        {success ? (
          <GNBItem text={'마이페이지'} path={`/user/${nickname}`} />
        ) : (
          <div>
            <GNBItem text={'로그인'} path={'/login'} />
          </div>
        )}
      </ul>
    </footer>
  );
}

export default GNBFooter;
