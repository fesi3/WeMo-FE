import React from 'react';
import Dropdown from '@/components/shared/dropdown/DropDown';
import { AdjustmentsVerticalIcon } from '@heroicons/react/20/solid';

interface SortOption {
  id: number;
  name: string;
}

interface SortDropdownProps {
  sortOptions: SortOption[]; // 동적으로 전달받는 정렬 옵션
  selectedSort: SortOption | null;
  onChange: (option: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  selectedSort,
  onChange,
}) => {
  return (
    <Dropdown
      options={sortOptions}
      selectedOption={selectedSort}
      onSelect={onChange}
      customTrigger={
        <button className="flex items-center justify-center rounded-full border border-gray-300 bg-white p-2 shadow-md focus:ring-2 focus:ring-blue-500">
          <AdjustmentsVerticalIcon
            className="h-6 w-6 text-gray-600 hover:text-gray-800"
            aria-hidden="true"
          />
        </button>
      }
    />
  );
};

export default SortDropdown;
