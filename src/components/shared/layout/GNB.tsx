import { ReactNode } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import { useRouter } from 'next/router';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: { children: ReactNode }) {
  const router = useRouter();

  const menuItems = [
    { name: '홈', path: '/meetings' },
    { name: '찜한 모임', path: '/savedGathering' },
    { name: '모든 리뷰', path: '/allReviews' },
    { name: '마이 페이지', path: '/user/1' },
  ];

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
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}

export default GNB;
