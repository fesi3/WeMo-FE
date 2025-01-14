import React from 'react';
import Dropdown from '@/components/shared/dropdown/DropDown';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

const regionOptions: RegionOption[] = [
  {
    id: 1,
    name: '서울',
    subRegions: [
      { id: 101, name: '양천구' },
      { id: 102, name: '강동구' },
      { id: 103, name: '구로구' },
    ],
  },
  {
    id: 2,
    name: '경기',
    subRegions: [
      { id: 201, name: '수원시' },
      { id: 202, name: '성남시' },
      { id: 203, name: '용인시' },
    ],
  },
];

interface RegionDropdownProps {
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption) => void;
  onSubRegionChange: (subRegion: SubRegionOption) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange,
}) => {
  return (
    <div className="flex gap-4">
      {/* 상위 지역 드롭다운 */}
      <Dropdown
        options={regionOptions}
        selectedOption={selectedRegion}
        onSelect={onRegionChange}
        placeholder="지역 선택"
      />

      {/* 하위 카테고리 드롭다운 */}
      <Dropdown
        options={selectedRegion?.subRegions || []} // 상위 지역에 따라 하위 카테고리 표시
        selectedOption={selectedSubRegion}
        onSelect={onSubRegionChange}
        placeholder={selectedRegion ? '구 선택' : '지역 먼저 선택'}
        className={!selectedRegion ? 'pointer-events-none opacity-50' : ''} // 지역 선택 안 했을 때 비활성화
      />
    </div>
  );
};

export default RegionDropdown;
