import React from 'react';
import Greeting from '@/components/plans/Greeting';
import SubCategoryFilter from '@/components/plans/SubCategoryFilter';
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

// 탭별 콘텐츠 렌더링(필터링 적용)
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
      {/* 인삿말 컴포넌트트 */}
      <Greeting />
      {/* 달램핏 탭일 경우 하위 카테고리 필터 추가 */}
      {category === '달램핏' && (
        <SubCategoryFilter
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
        />
      )}
      {/* 공통 콘텐츠 렌더링 */}
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
