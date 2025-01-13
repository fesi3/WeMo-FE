import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabItem = {
  category: string;
};

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  renderContent: (selectedLabel: string) => React.ReactNode;
}

const UNDERLINE_OFFSET = 120;

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Tabs({ tabs, defaultTab, renderContent }: TabsProps) {
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

  const handleTabClick = (tabcategory: string) => {
    setSelectedTab(tabcategory);
  };

  useEffect(() => {
    const currentIndex = tabs.findIndex((t) => t.category === selectedTab);
    const currentTab = tabRefs.current[currentIndex];

    if (currentTab) {
      setUnderlineStyle(calculateUnderlineStyle(currentTab, UNDERLINE_OFFSET));
    }
  }, [selectedTab]);

  return (
    <div className="w-full">
      {/* 탭 헤더 */}
      <div
        role="tablist"
        className="relative mb-4 flex border-b border-gray-300"
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
              className={`flex-1 py-2 text-center text-base transition-colors ${isActive ? 'font-bold' : 'text-gray-400'} `}
            >
              {tab.category}
            </button>
          );
        })}

        {/* 언더바 이동 */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className="absolute bottom-0 h-[2px] bg-white"
          style={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
        />
      </div>

      {/* 탭 콘텐츠 (fade in, fade out) */}
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
                {renderContent(selectedTab)}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
