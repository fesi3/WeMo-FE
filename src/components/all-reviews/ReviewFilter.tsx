import React from 'react';
import RegionDropdown from '@/components/shared/dropdown/RegionDropdown';
// import SortDropdown from '../shared/dropdown/SortDropdown';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

interface ReviewFilterProps {
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption | null) => void;
  onSubRegionChange: (subRegion: SubRegionOption | null) => void;
  // selectedSort: { id: number; name: string } | null;
  // onSortChange: ()
}

const PlanFilter = ({
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange,
}: ReviewFilterProps) => {
  return (
    <div className="mb-4 flex gap-4">
      <RegionDropdown
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        onRegionChange={onRegionChange}
        onSubRegionChange={onSubRegionChange}
      />
      {/* <SortDropdown
        sortOptions={sortOptions}
        selectedSort={filters.sort}
        onChange={handleSortChange}
      /> */}
    </div>
  );
};

export default PlanFilter;
