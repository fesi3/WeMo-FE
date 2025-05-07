import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CreateMeetingButton from '../../entities/plan/plans/editMeeting/CreateMeetingButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/redux/store';
import { PlanTabTypes } from '@/shared/types/tabs';
import { fadeVariants, UNDERLINE_OFFSET } from '@/shared/constants/tabs';

interface TabsProps {
  tabs: PlanTabTypes[];
  renderContent: (selectedLabel: PlanTabTypes) => React.ReactNode;
  onTabChange?: (selectedLabel: PlanTabTypes) => void;
  className?: string;
}

export default function Tabs({ tabs, renderContent, onTabChange }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<PlanTabTypes>(tabs[0]);

  // 탭 버튼 DOM정보를 담을 ref 배열
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // underline 의 left, width 상태
  const [underlineStyle, setUnderlineStyle] = useState<{
    width: number;
    left: number;
  }>({
    width: 0,
    left: 0,
  });

  function calculateUnderlineStyle(
    tabEl: HTMLButtonElement,
    offset: number,
  ): { width: number; left: number } {
    return {
      width: Math.max(0, tabEl.offsetWidth - offset),
      left: tabEl.offsetLeft + offset / 2,
    };
  }

  const handleTabClick = (tabCategory: PlanTabTypes) => {
    setSelectedTab(tabCategory);
    if (onTabChange) {
      onTabChange(tabCategory);
    }
  };

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const currentIndex = tabs.findIndex((item) => item === selectedTab);
    const currentTab = tabRefs.current[currentIndex];

    if (currentTab) {
      setUnderlineStyle(calculateUnderlineStyle(currentTab, UNDERLINE_OFFSET));
    }
  }, [selectedTab]);

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full border-b border-gray-300"></div>
        {/* 탭 헤더 (max-w-lg 유지) */}
        <div
          role="tablist"
          className="relative mx-auto mb-4 flex w-full max-w-lg"
        >
          {tabs.map((tab, idx) => {
            const isActive = tab === selectedTab;
            return (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                onClick={() => handleTabClick(tab)}
                className={`flex-1 py-2 text-center text-base transition-colors ${
                  isActive ? 'font-bold text-primary-40' : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            );
          })}

          {/* 언더바 이동 (선택된 탭 강조선) */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            className="absolute bottom-0 h-[3px] bg-primary-30"
            style={{
              width: underlineStyle.width,
              left: underlineStyle.left,
            }}
          />
        </div>
      </div>
      {/* 탭이 변경돼도 애니메이션적용되지 않는 컴포넌트 */}
      {/* <Greeting /> */}
      {/* 로그인 상태일 때만 모임 만들기 버튼 표시 */}
      {isLoggedIn && (
        <div className="fixed bottom-20 right-5 z-10">
          <CreateMeetingButton />
        </div>
      )}
      {/* 탭 콘텐츠 */}
      <div className="min-h-[150px]">
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            tab === selectedTab ? (
              <motion.div
                key={tab}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderContent(tab)}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
