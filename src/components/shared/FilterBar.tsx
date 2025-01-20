import React from 'react';
import DateModal from '@/components/shared/calendar/DateModal';
import RegionDropdown from '@/components/shared/dropdown/RegionDropdown';
import SortDropdown from './dropdown/SortDropdown';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

interface FilterState {
  region: RegionOption | null;
  subRegion: SubRegionOption | null;
  date: string | null;
  sort: { id: number; name: string } | null;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  sortOptions: { id: number; name: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  sortOptions,
}) => {
  const handleRegionChange = (region: RegionOption | null) => {
    onFilterChange({ ...filters, region, subRegion: null });
  };

  const handleSubRegionChange = (subRegion: SubRegionOption | null) => {
    onFilterChange({ ...filters, subRegion });
  };

  const handleDateChange = (date: string | null) => {
    onFilterChange({ ...filters, date });
  };

  const handleSortChange = (sort: { id: number; name: string } | null) => {
    onFilterChange({ ...filters, sort });
  };

  return (
    <div className="flex gap-4">
      <DateModal onDateSelect={handleDateChange} />

      <RegionDropdown
        selectedRegion={filters.region}
        selectedSubRegion={filters.subRegion}
        onRegionChange={handleRegionChange}
        onSubRegionChange={handleSubRegionChange}
      />

      <SortDropdown
        sortOptions={sortOptions}
        selectedSort={filters.sort}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default FilterBar;
