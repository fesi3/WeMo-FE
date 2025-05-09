import React from 'react';
import DateModal from '@/entities/plan/plans/DateModal';
import RegionDropdown from '@/shared/components/dropdown/RegionDropdown';
import { RegionOption, SubRegionOption } from '@/shared/types/reviewType';

interface PlanFilterProps {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption | null) => void;
  onSubRegionChange: (subRegion: SubRegionOption | null) => void;
}

const PlanFilter = ({
  selectedDate,
  setSelectedDate,
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange,
}: PlanFilterProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2 lg:gap-4">
      <DateModal selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      <RegionDropdown
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        onRegionChange={onRegionChange}
        onSubRegionChange={onSubRegionChange}
      />
    </div>
  );
};

export default PlanFilter;
