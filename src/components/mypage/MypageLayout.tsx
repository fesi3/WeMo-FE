import React, { ReactNode } from 'react';
import Header from '../shared/layout/Header';
import MyPageTab from './MyPageTab';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Pagination from './Pagination';

interface BaseMypageLayoutProps {
  children: ReactNode;
  headerProps: string;
}

// Tab 있는 경우
interface MypageLayoutWithTab extends BaseMypageLayoutProps {
  activeTab: 'tabLeft' | 'tabRight';
  onTabChange: (tab: 'tabLeft' | 'tabRight') => void;
  tabsTitle: { key: 'tabLeft' | 'tabRight'; label: string }[];
  page: number;
  totalPage: number;
  onPageChange: (newPage: number) => void;
}

// Tab 없는 경우
interface MypageLayoutWithoutTab extends BaseMypageLayoutProps {
  activeTab?: undefined;
  onTabChange?: undefined;
  tabsTitle?: undefined;
  page?: undefined;
  totalPage?: undefined;
  onPageChange?: undefined;
}

type MypageLayoutProps = MypageLayoutWithTab | MypageLayoutWithoutTab;

export default function MypageLayout({
  children,
  headerProps,
  activeTab,
  onTabChange,
  tabsTitle,
  page,
  totalPage,
  onPageChange,
}: MypageLayoutProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // 로그인 상태가 아니면 렌더링 하지 않음.
  if (!isLoggedIn) return;

  return (
    <div className="flex min-h-screen flex-col">
      <Header title={headerProps} />

      {/* 활성화된 탭이 있는 경우에만 MyPageTab 렌더링 */}
      {activeTab && onTabChange && tabsTitle && (
        <MyPageTab
          activeTab={activeTab}
          onTabChange={onTabChange}
          tabsTitle={tabsTitle}
        />
      )}

      <main className="mx-auto flex flex-col p-4 sm:justify-center">
        {children}
      </main>

      {/* 페이지네이션을 하단에 배치 */}
      {activeTab && (
        <div className="mt-auto">
          <Pagination
            page={page}
            totalPage={totalPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
