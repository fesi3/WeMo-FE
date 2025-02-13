import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Button from '../shared/Button';

const menuItems = [
  { href: '/user', label: 'My Home' },
  { href: '/user/plan', label: '나의 일정' },
  { href: '/user/meeting', label: '나의 모임' },
  { href: '/user/review', label: '나의 리뷰' },
  { href: '/user/saved-gathering', label: '찜한 일정' },
  { href: '/user/calendar', label: '이달의 일정' },
];

const Sidebar = React.memo(() => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 hidden h-screen min-w-[180px] flex-col justify-between bg-white p-4 text-gray-500 shadow-lg md:inline-block">
      <div className="mt-[60px] flex flex-1 flex-col space-y-4">
        <ul>
          {menuItems.map(({ href, label }) => {
            const isActive = router.pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`mb-4 flex items-center rounded-lg px-4 py-2 transition-colors ${
                    isActive
                      ? 'font-semibold text-primary-10'
                      : 'hover:text-black'
                  }`}
                >
                  <span className="text-lg"> {label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-[50px] border-t border-gray-200 py-4 dark:border-gray-700">
        <ul>
          <li>
            <Button
              text={'로그아웃'}
              variant={'text'}
              className="p-0 underline hover:text-black"
              onClick={() => {
                alert('준비 중인 기능입니다!');
              }}
            />
          </li>
          <li>
            <Button
              text={'탈퇴하기'}
              variant={'text'}
              className="mt-3 p-0 hover:text-red-600"
              onClick={() => {
                alert('준비 중인 기능입니다!');
              }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Sidebar;
