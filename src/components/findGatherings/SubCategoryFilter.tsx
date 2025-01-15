import React from 'react';
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
    <div className="mb-4 flex gap-2">
      <Button
        type="main_tab_total"
        text="전체"
        onClick={() => setSelectedSubCategory(null)}
        isActive={selectedSubCategory === null}
        backColor={selectedSubCategory === '전체' ? 'bg-gray' : ''}
        textColor={selectedSubCategory === '전체' ? 'text-white' : ''}
      />
      <Button
        type="main_tab_office"
        text="오피스"
        onClick={() => setSelectedSubCategory('오피스 스트레칭')}
        isActive={selectedSubCategory === '오피스 스트레칭'}
        backColor={selectedSubCategory === '오피스 스트레칭' ? 'bg-gray' : ''}
        textColor={
          selectedSubCategory === '오피스 스트레칭' ? 'text-white' : ''
        }
      />
      <Button
        type="main_tab_mind"
        text="마인드풀니스"
        onClick={() => setSelectedSubCategory('마인드풀니스')}
        isActive={selectedSubCategory === '마인드풀니스'}
        backColor={selectedSubCategory === '마인드풀니스' ? 'bg-gray' : ''}
        textColor={selectedSubCategory === '마인드풀니스' ? 'text-white' : ''}
      />
    </div>
  );
};

export default SubCategoryFilter;
