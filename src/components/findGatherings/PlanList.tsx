import React from 'react';
import CardList from '@/components/findGatherings/card/CardList';
import { filterPlans } from '@/utils/planUtils';
import { PlanDataWithCategory } from '@/components/types/plans';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

interface PlanListProps {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedCategory: string;
  selectedSubCategory: string | null;
}

const PlanList = ({
  plans,
  selectedDate,
  selectedRegion,
  selectedSubRegion,
  selectedCategory,
  selectedSubCategory,
}: PlanListProps) => {
  const filteredPlans = filterPlans({
    plans,
    selectedDate,
    selectedRegion,
    selectedSubRegion,
    selectedCategory,
    selectedSubCategory,
  });
  return <CardList plans={filteredPlans} />;
};

export default PlanList;
