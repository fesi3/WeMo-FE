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
      if (selectedSubCategory === null) {
        // 하위 카테고리가 "전체"일 경우, "오피스 스트레칭"과 "마인드풀니스" 포함
        if (
          plan.category !== '오피스 스트레칭' &&
          plan.category !== '마인드풀니스'
        ) {
          return false;
        }
      } else {
        // 특정 하위 카테고리가 선택된 경우
        if (plan.category !== selectedSubCategory) {
          return false;
        }
      }
    } else if (selectedCategory === '워케이션') {
      // 워케이션만 포함
      if (plan.category !== '워케이션') {
        return false;
      }
    }

    // 2. 날짜 필터
    if (selectedDate) {
      // 날짜가 선택되었을 때만 필터 적용
      const planDate = dayjs(plan.dateTime).format('YYYY-MM-DD');
      if (planDate !== selectedDate) {
        return false;
      }
    }

    // 3. 지역 필터
    if (selectedRegion && selectedRegion.id > 0) {
      // 상위 지역 필터
      if (plan.province !== selectedRegion.name) {
        return false;
      }
    }
    if (selectedSubRegion && selectedSubRegion.id > 0) {
      // 하위 지역 필터
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
