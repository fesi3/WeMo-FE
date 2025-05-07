import React from 'react';
import Button from '@/shared/components/Button';
import { PlanSubTabTypes } from '@/shared/types/tabs';
import { subTabs } from '@/shared/constants/tabs';

interface SubCategoryFilterProps {
  selectedSubCategory: PlanSubTabTypes;
  setSelectedSubCategory: (category: PlanSubTabTypes) => void;
}

const SubCategoryFilter = ({
  selectedSubCategory,
  setSelectedSubCategory,
}: SubCategoryFilterProps) => {
  const commonButtonStyles =
    'rounded-2xl drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] px-4 py-1';

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 lg:gap-4">
        {subTabs.map((item) => (
          <Button
            key={item}
            text={item}
            variant="option"
            onClick={() => setSelectedSubCategory(item)}
            isActive={selectedSubCategory === item}
            className={`${commonButtonStyles} ${
              selectedSubCategory !== item ? 'bg-primary-70 text-white' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
