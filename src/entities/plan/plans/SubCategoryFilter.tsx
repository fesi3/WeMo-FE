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
  const commonButtonStyles =
    'rounded-2xl drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] px-4 py-1';

  const buttons = [
    { text: '전체', category: null },
    { text: '오피스', category: '오피스 스트레칭' },
    { text: '마인드풀니스', category: '마인드풀니스' },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 lg:gap-4">
        {buttons.map(({ text, category }) => (
          <Button
            key={text}
            text={text}
            variant="option"
            onClick={() => setSelectedSubCategory(category)}
            isActive={selectedSubCategory === category}
            className={`${commonButtonStyles} ${
              selectedSubCategory !== category ? 'bg-primary-70 text-white' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
