import React from 'react';
import RegionDropdown from '@/components/shared/dropdown/RegionDropdown';
// import SortDropdown from './dropdown/SortDropdown';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

interface FilterState {
  region: RegionOption | null;
  subRegion: SubRegionOption | null;
  date: Date | null;
  sort: { id: number; name: string } | null;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  // sortOptions: { id: number; name: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  // sortOptions,
}) => {
  // const handleRegionChange = (region: RegionOption | null) => {
  //   // 지역 변경 시 하위 지역 초기화
  //   onFilterChange({
  //     region,
  //     subRegion: null,
  //     date: filters.date,
  //     sort: filters.sort,
  //   });
  // };

  // const handleSubRegionChange = (subRegion: SubRegionOption | null) => {
  //   onFilterChange({ ...filters, subRegion });
  // };

  // const handleSortChange = (sort: { id: number; name: string } | null) => {
  //   onFilterChange({ ...filters, sort });
  // };

  return (
    <div className="flex gap-4">
      {/* 지역 드롭다운 */}
      <RegionDropdown
        selectedRegion={filters.region}
        selectedSubRegion={filters.subRegion}
        onRegionChange={(region) => {
          console.log('onRegionChange 호출됨:', region);
          onFilterChange({ ...filters, region, subRegion: null });
        }}
        onSubRegionChange={(subRegion) => {
          if (subRegion) {
            console.log('onSubRegionChange 호출됨:', subRegion);
            onFilterChange({ ...filters, subRegion });
          }
        }}
      />

      {/* 정렬 드롭다운 */}
      {/* <SortDropdown
        // sortOptions={sortOptions}
        selectedSort={filters.sort}
        onChange={handleSortChange}
      /> */}
    </div>
  );
};

export default FilterBar;
