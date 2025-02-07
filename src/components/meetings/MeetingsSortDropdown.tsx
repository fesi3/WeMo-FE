import React from 'react';
import SortDropdown from '@/components/shared/dropdown/SortDropdown';

interface MeetingsSortDropdownProps {
  selectedSort: { id: number; name: string; value: string } | null;
  onChange: (
    option: { id: number; name: string; value: string } | null,
  ) => void;
}

const MeetingsSortDropdown = ({
  selectedSort,
  onChange,
}: MeetingsSortDropdownProps) => {
  const sortOptions = [
    { id: 1, name: '최신순', value: 'default' },
    { id: 2, name: '가입 인원 많은 순', value: 'memberDesc' },
  ];

  return (
    <SortDropdown
      sortOptions={sortOptions}
      selectedSort={selectedSort}
      onChange={onChange}
    />
  );
};

export default MeetingsSortDropdown;
