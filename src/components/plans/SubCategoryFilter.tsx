import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/shared/Button';

interface SubCategoryFilterProps {
  selectedSubCategory: string | null;
  setSelectedSubCategory: (category: string | null) => void;
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const SubCategoryFilter = ({
  selectedSubCategory,
  setSelectedSubCategory,
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
      <AnimatePresence mode="wait">
        {selectedSubCategory && ( // 선택된 서브카테고리가 있을 때만 렌더링
          <motion.div
            key={selectedSubCategory}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubCategoryFilter;
