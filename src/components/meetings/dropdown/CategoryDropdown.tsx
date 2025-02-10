import React from 'react';
import Dropdown from '@/components/shared/dropdown/DropDown';

export const categories = [
  { id: 0, name: '전체' },
  { id: 2, name: '워케이션' },
  { id: 3, name: '오피스 스트레칭' },
  { id: 4, name: '마인드 풀니스' },
];

interface CategoryOption {
  id: number;
  name: string;
}

interface CategoryDropdownProps {
  selectedCategory: CategoryOption | null;
  onChange: (option: CategoryOption | null) => void;
}

const CategoryDropdown = ({
  selectedCategory,
  onChange,
}: CategoryDropdownProps) => {
  return (
    <Dropdown
      options={categories}
      selectedOption={selectedCategory}
      onSelect={onChange}
      placeholder="카테고리"
      className="w-40"
    />
  );
};

export default CategoryDropdown;
