import React from 'react';
//import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/shared/Button';

interface SubCategoryFilterProps {
  selectedSubCategory: string | null;
  setSelectedSubCategory: (category: string | null) => void;
}

const SubCategoryFilter = ({
  selectedSubCategory,
  setSelectedSubCategory,
}: SubCategoryFilterProps) => {
  return (
    <div>
      {/* 버튼 필터 */}
      <div className="flex gap-2">
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
    </div>
  );
};

export default SubCategoryFilter;
