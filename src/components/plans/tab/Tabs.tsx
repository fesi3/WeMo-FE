import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Greeting from '../Greeting';
import CreateMeetingButton from '../editMeeting/CreateMeetingButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

//추후 UI컴포넌트와 기능 로직 분리리
type TabItem = {
  category: string;
};

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  renderContent: (selectedLabel: string) => React.ReactNode;
  onTabChange?: (selectedLabel: string) => void;
  className?: string;
}

const UNDERLINE_OFFSET = 120;

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Tabs({
  tabs,
  defaultTab,
  renderContent,
  onTabChange,
}: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string>(
    defaultTab || tabs[0]?.category,
  );

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

  const handleTabClick = (tabCategory: string) => {
    setSelectedTab(tabCategory);
    if (onTabChange) {
      onTabChange(tabCategory);
    }
  };

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const currentIndex = tabs.findIndex((t) => t.category === selectedTab);
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
            const isActive = tab.category === selectedTab;
            return (
              <button
                key={tab.category}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                onClick={() => handleTabClick(tab.category)}
                className={`flex-1 py-2 text-center text-base transition-colors ${
                  isActive ? 'font-bold text-primary-40' : 'text-gray-500'
                }`}
              >
                {tab.category}
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
      <Greeting />
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
            tab.category === selectedTab ? (
              <motion.div
                key={tab.category}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderContent(tab.category)}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
