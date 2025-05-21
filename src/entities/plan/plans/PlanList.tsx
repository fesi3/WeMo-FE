import React from 'react';
import dayjs from 'dayjs';
import CardList from '@/entities/plan/plans/card/CardList';
import { PlanDataWithCategory } from '@/shared/types/plans';
import { RegionOption, SubRegionOption } from '@/shared/types/reviewType';
import { PlanSubTabTypes, PlanTabTypes } from '@/shared/types/tabs';
import { subTabs, tabs } from '@/shared/constants/tabs';

interface PlanListProps {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  selectedCategory: PlanTabTypes;
  selectedSubCategory: PlanSubTabTypes;
  className?: string;
}

const PlanList = ({
  plans = [],
  selectedDate,
  selectedRegion,
  selectedSubRegion,
  selectedCategory,
  selectedSubCategory,
}: PlanListProps) => {
  const filteredPlans = plans.filter((plan) => {
    // 1. 상위 카테고리 필터: "달램핏" 또는 "워케이션"
    if (selectedCategory === tabs[0]) {
      if (
        selectedSubCategory === subTabs[0] &&
        plan.category !== subTabs[2] &&
        plan.category !== subTabs[1]
      ) {
        return false; // 하위 카테고리가 없을 때, 두 가지 카테고리만 포함
      } else if (
        selectedSubCategory !== subTabs[0] &&
        plan.category !== selectedSubCategory
      ) {
        return false; // 특정 하위 카테고리가 선택된 경우
      }
    } else if (selectedCategory === tabs[1]) {
      // 워케이션 카테고리: "마인드풀니스"와 "오피스 스트레칭"을 제외
      if (plan.category === subTabs[1] || plan.category === subTabs[2]) {
        return false;
      }
    }

    // 2. 날짜 필터
    if (selectedDate && selectedDate !== subTabs[0]) {
      const formattedPlanDate = dayjs(plan.dateTime).format('YYYY-MM-DD');
      if (formattedPlanDate !== selectedDate) {
        return false; // 선택된 날짜와 일치하지 않는 데이터는 제외
      }
    }

    // 3. 지역 필터
    if (selectedRegion && selectedRegion.name !== subTabs[0]) {
      if (plan.province !== selectedRegion.name) {
        return false;
      }
    }

    if (selectedSubRegion && selectedSubRegion.name !== subTabs[0]) {
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
