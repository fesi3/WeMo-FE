import React, { ReactNode } from 'react';
import Header from '../shared/layout/Header';
import MyPageTab from './MyPageTab';

interface BaseMypageLayoutProps {
  children: ReactNode;
  headerProps: string;
}

// Tab 있는 경우
interface MypageLayoutWithTab extends BaseMypageLayoutProps {
  activeTab: 'tabLeft' | 'tabRight';
  onTabChange: (tab: 'tabLeft' | 'tabRight') => void;
  tabsTitle: { key: 'tabLeft' | 'tabRight'; label: string }[];
}

// Tab 없는 경우
interface MypageLayoutWithoutTab extends BaseMypageLayoutProps {
  activeTab?: undefined;
  onTabChange?: undefined;
  tabsTitle?: undefined;
}

type MypageLayoutProps = MypageLayoutWithTab | MypageLayoutWithoutTab;

export default function MypageLayout({
  children,
  headerProps,
  activeTab,
  onTabChange,
  tabsTitle,
}: MypageLayoutProps) {
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
    </div>
  );
}
