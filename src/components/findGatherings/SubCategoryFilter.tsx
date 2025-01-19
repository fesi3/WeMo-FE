import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/shared/Button';

interface SubCategoryFilterProps {
  selectedSubCategory: string | null;
  setSelectedSubCategory: (category: string | null) => void;
  renderContent: (subCategory: string | null) => React.ReactNode;
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const SubCategoryFilter = ({
  selectedSubCategory,
  setSelectedSubCategory,
  renderContent,
}: SubCategoryFilterProps) => {
  return (
    <div>
      {/* 버튼 필터 */}
      <div className="mb-4 flex gap-2">
        {/* 전체 버튼 */}
        <Button
          type="main_tab_total"
          text="전체"
          onClick={() => setSelectedSubCategory(null)}
          isActive={selectedSubCategory === null}
        />
        {/* 오피스 스트레칭 버튼 */}
        <Button
          type="main_tab_office"
          text="오피스"
          onClick={() => setSelectedSubCategory('오피스 스트레칭')}
          isActive={selectedSubCategory === '오피스 스트레칭'}
        />
        {/* 마인드풀니스 버튼 */}
        <Button
          type="main_tab_mind"
          text="마인드풀니스"
          onClick={() => setSelectedSubCategory('마인드풀니스')}
          isActive={selectedSubCategory === '마인드풀니스'}
        />
      </div>

      {/* 콘텐츠 애니메이션 */}
      <div className="min-h-[150px]">
        <AnimatePresence mode="wait">
          {selectedSubCategory !== null ? (
            <motion.div
              key={selectedSubCategory}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {renderContent(selectedSubCategory)}
            </motion.div>
          ) : (
            <motion.div
              key="전체"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {renderContent(null)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubCategoryFilter;
