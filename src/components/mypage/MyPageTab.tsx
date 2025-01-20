import React from 'react';

type TabType = 'tabLeft' | 'tabRight';

type MyPageTabProps = {
  activeTab: 'tabLeft' | 'tabRight';
  onTabChange: (tab: 'tabLeft' | 'tabRight') => void;
  tabsTitle: { key: TabType; label: string }[]; // 탭 제목 props로 받기!
};

export default function MyPageTab({
  activeTab,
  onTabChange,
  tabsTitle,
}: MyPageTabProps) {
  return (
    <section className="flex h-[64px] w-full items-center justify-center">
      <div className="mx-auto flex w-full justify-center bg-[#F6F6F6] pt-[14px]">
        {tabsTitle.map(({ key, label }) => (
          <div key={key} className="flex w-2/5 flex-col items-center gap-3">
            <div
              className={`cursor-pointer text-nowrap text-center ${
                activeTab === key ? 'text-primary-10' : 'text-primary-0'
              }`}
              onClick={() => onTabChange(key)}
            >
              {label}
            </div>
            <div
              className={`${activeTab === key ? 'bg-primary-10' : ''} h-[2px] w-[66px]`}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}
