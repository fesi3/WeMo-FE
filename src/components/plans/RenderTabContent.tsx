import React from 'react';
import Greeting from '@/components/plans/Greeting';
import SubCategoryFilter from '@/components/plans/SubCategoryFilter';
//import PlanFilter from '@/components/plans/PlanFilter';
import RenderCommonContent from '@/components/plans/RenderCommonContent';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import { SortOption } from '@/types/reviewType';

interface RenderTabContentProps {
  category: string;
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRegion: RegionOption | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<RegionOption | null>>;
  selectedSubRegion: SubRegionOption | null;
  setSelectedSubRegion: React.Dispatch<
    React.SetStateAction<SubRegionOption | null>
  >;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void; //
  selectedSubCategory: string | null;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string | null>>;
  selectedSort: SortOption | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<SortOption | null>>;
}

const RenderTabContent: React.FC<RenderTabContentProps> = ({
  category,
  plans,
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  selectedSubRegion,
  setSelectedSubRegion,
  selectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedSort,
  setSelectedSort,
}) => {
  return (
    <div className="mx-auto sm:w-[400px] sm:justify-center md:w-full lg:w-full">
      {/* Greeting */}
      <Greeting />
      {/* SubCategoryFilter */}
      {category === '달램핏' && (
        <div className="sticky top-0 z-20 bg-white pb-2 pt-4">
          <SubCategoryFilter
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>
      )}
      <RenderCommonContent
        plans={plans}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedSubRegion={selectedSubRegion}
        setSelectedSubRegion={setSelectedSubRegion}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
    </div>
  );
};

export default RenderTabContent;
