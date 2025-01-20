import React from 'react';
import RegionDropdown from '@/components/shared/dropdown/RegionDropdown';
import SortDropdown from './dropdown/SortDropdown';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

interface FilterState {
  region: RegionOption | null;
  subRegion: SubRegionOption | null;
  date: Date | null;
  sort: SortOption | null;
}

interface SortOption {
  id: number;
  name: string; // 사용자에게 표시할 이름
  value: string; // 서버로 보낼 값
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  sortOptions: SortOption[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  sortOptions,
}) => {
  const handleRegionChange = (region: RegionOption | null) => {
    if (region) {
      console.log('onRegionChange 호출됨:', region);
      onFilterChange({ ...filters, region, subRegion: null });
    }
  };

  const handleSubRegionChange = (subRegion: SubRegionOption | null) => {
    if (subRegion) {
      console.log('onSubRegionChange 호출됨:', subRegion);
      onFilterChange({ ...filters, subRegion });
    }
  };

  const handleSortChange = (sort: SortOption | null) => {
    onFilterChange({ ...filters, sort });
  };

  return (
    <div className="flex gap-4">
      {/* 지역 드롭다운 */}
      <RegionDropdown
        selectedRegion={filters.region}
        selectedSubRegion={filters.subRegion}
        onRegionChange={handleRegionChange}
        onSubRegionChange={handleSubRegionChange}
      />

      {/* 정렬 드롭다운 */}
      <SortDropdown
        sortOptions={sortOptions}
        selectedSort={filters.sort}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default FilterBar;
