import React from 'react';
import CardList from '@/components/findGatherings/card/CardList';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import dayjs from 'dayjs';

interface PlanListProps {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedCategory: string; // "달램핏" or "워케이션"
  selectedSubCategory: string | null; // 하위 필터: "전체", "오피스 스트레칭", "마인드풀니스"
  className?: string;
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
    // 1. 상위 카테고리 필터: "달램핏" 또는 "워케이션"
    if (selectedCategory === '달램핏') {
      if (
        selectedSubCategory === null &&
        plan.category !== '오피스 스트레칭' &&
        plan.category !== '마인드풀니스'
      ) {
        return false; // 하위 카테고리가 없을 때, 두 가지 카테고리만 포함
      } else if (
        selectedSubCategory !== null &&
        plan.category !== selectedSubCategory
      ) {
        return false; // 특정 하위 카테고리가 선택된 경우
      }
    }

    // 2. 날짜 필터
    if (selectedDate && selectedDate !== '전체') {
      const formattedPlanDate = dayjs(plan.dateTime).format('YYYY-MM-DD');
      if (formattedPlanDate !== selectedDate) {
        return false; // 선택된 날짜와 일치하지 않는 데이터는 제외
      }
    }

    // 3. 지역 필터
    if (selectedRegion && selectedRegion.name !== '전체') {
      if (plan.province !== selectedRegion.name) {
        return false;
      }
    }

    if (selectedSubRegion && selectedSubRegion.name !== '전체') {
      if (plan.district !== selectedSubRegion.name) {
        return false;
      }
    }

    // 모든 조건에 부합하면 포함
    return true;
  });

  return <CardList plans={filteredPlans} />;
};

export default PlanList;
