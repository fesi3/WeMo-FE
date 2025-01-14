import React from 'react';
import RegionDropdown from './dropdown/RegionDropdown';
// import DateDropdown from './dropdown/DateDropdown';
import SortDropdown from './dropdown/SortDropdown';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

interface FilterState {
  region: RegionOption | null;
  subRegion: SubRegionOption | null;
  date: Date | null;
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
  return (
    <div className="flex gap-4">
      <RegionDropdown
        selectedRegion={filters.region}
        selectedSubRegion={filters.subRegion}
        onRegionChange={(region) =>
          onFilterChange({ ...filters, region, subRegion: null })
        }
        onSubRegionChange={(subRegion) =>
          onFilterChange({ ...filters, subRegion })
        }
      />

      {/* <DateDropdown
        selectedDate={filters.date}
        onDateChange={(date) => onFilterChange({ ...filters, date })}
      /> */}

      <SortDropdown
        sortOptions={sortOptions}
        selectedSort={filters.sort}
        onChange={(sort) => onFilterChange({ ...filters, sort })}
      />
    </div>
  );
};

export default FilterBar;
