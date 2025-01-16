import React from 'react';
import CardList from '@/components/findGatherings/card/CardList';
//import { filterPlans } from '@/utils/planUtils';
import { PlanDataWithCategory } from '@/components/types/plans';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

interface PlanListProps {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedCategory: string; //달램핏 or 워케이션
  selectedSubCategory: string | null; //하위필터(전체, 오피스 스트레칭, 마인드풀니스)
}

const PlanList = ({
  plans,
  selectedDate,
  selectedRegion,
  selectedSubRegion,
  selectedCategory,
  selectedSubCategory,
}: PlanListProps) => {
  const filteredPlans = plans.filter((plan) => {
    // 1. 상위 카테고리 필터 (달램핏 또는 워케이션)
    if (selectedCategory === '달램핏') {
      // 달램핏 하위 카테고리 필터 적용
      if (selectedSubCategory === null) {
        // "전체" 버튼 -> 오피스 스트레칭 + 마인드풀니스만 포함
        return (
          plan.category === '오피스 스트레칭' ||
          plan.category === '마인드풀니스'
        );
      }
      // 특정 하위 카테고리만 포함
      return plan.category === selectedSubCategory;
    } else if (selectedCategory === '워케이션') {
      // 워케이션만 포함
      return plan.category === '워케이션';
    }

    // 지역 필터: 선택된 지역이 있을 경우만 필터 적용
    if (
      selectedRegion &&
      selectedRegion.id > 0 &&
      plan.province !== selectedRegion.name
    )
      return false;
    if (
      selectedSubRegion &&
      selectedSubRegion.id > 0 &&
      plan.district !== selectedSubRegion.name
    )
      return false;

    // 날짜 필터: 선택된 날짜가 있을 경우만 필터 적용
    if (selectedDate && plan.dateTime !== selectedDate) return false;

    return true;
  });

  return <CardList plans={filteredPlans} />;
};

export default PlanList;
