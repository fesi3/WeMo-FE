import React, { useState, useEffect } from 'react';

import { SortOption } from '@/shared/types/reviewType';
import { RegionOption, SubRegionOption } from '@/shared/types/reviewType';
import Tabs from '@/entities/plan/plans/tab/Tabs';
import RenderTabContent from '@/entities/plan/plans/RenderTabContent';
import { useCursorInfiniteScroll } from './model/useCursorInfiniteScrollPlans';
import { PlanListResponse } from '@/shared/types/plans';

export const Home = () => {
  //탭 상태 관리 (달램핏, 워케이션)
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];
  const [activeTab, setActiveTab] = useState<string>('달램핏');
  const [selectedCategory, setSelectedCategory] = useState<string>('달램핏');

  // 서브 카테고리 상태(전체, 오피스스트레칭, 마인드풀니스)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  // 필터 상태 관리(날짜, 시/도, 구/시)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionOption | null>(
    null,
  );
  const [selectedSubRegion, setSelectedSubRegion] =
    useState<SubRegionOption | null>(null);

  // 정렬 상태 (최신순, 마감임박순)
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);

  //무한 스크롤 커스텀 훅
  const { loaderRef, data, isFetchingNextPage, hasNextPage } =
    useCursorInfiniteScroll({
      selectedCategory,
      selectedSubCategory,
      selectedRegion,
      selectedSubRegion,
      selectedSort,
    });

  // 탭 변경 시 카테고리 업데이트
  useEffect(() => {
    setSelectedCategory(activeTab);
    setSelectedSort(null);
  }, [activeTab]);

  const plans =
    data?.pages.flatMap((page: PlanListResponse) => page.data.planList) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      {/* 탭 컴포넌트 */}
      <Tabs
        tabs={tabs}
        defaultTab="달램핏"
        onTabChange={(category) => {
          setActiveTab(category);
        }}
        renderContent={(category) => (
          <div className="mt-4">
            <RenderTabContent
              category={category}
              plans={plans}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedSubRegion={selectedSubRegion}
              setSelectedSubRegion={setSelectedSubRegion}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        )}
      />
      <div ref={loaderRef} className="h-12"></div>
      {isFetchingNextPage && <span>불러오는 중...</span>}
      {!hasNextPage && <span>모두 불러왔습니다!</span>}
    </div>
  );
};
