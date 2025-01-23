import React from 'react';
import Greeting from '@/components/plans/Greeting';
import SubCategoryFilter from '@/components/plans/SubCategoryFilter';
//import PlanFilter from '@/components/plans/PlanFilter';
import RenderCommonContent from '@/components/plans/RenderCommonContent';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

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
}) => {
  return (
    <div className="mx-auto items-center sm:w-[400px] sm:justify-center md:w-[600px] md:justify-center lg:w-full">
      {/* Greeting */}
      <Greeting />
      {/* SubCategoryFilter */}
      {category === '달램핏' && (
        <div className="sticky top-0 z-20 my-2 bg-white">
          <SubCategoryFilter
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>
      )}
      {/* RenderCommonContent */}
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
      />
    </div>
  );
};

export default RenderTabContent;
