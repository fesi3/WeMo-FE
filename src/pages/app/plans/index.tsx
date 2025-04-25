import React, { useState, useEffect } from 'react';

import { SortOption } from '@/shared/types/reviewType';
import { useCursorInfiniteScroll } from './model/useCursorInfiniteScrollPlans';
import { PlanDataWithCategory } from '@/shared/types/plans';
import { RegionOption, SubRegionOption } from '@/shared/types/reviewType';
import Tabs from '@/entities/plan/plans/tab/Tabs';
import RenderTabContent from '@/entities/plan/plans/RenderTabContent';
import { useQuery } from '@tanstack/react-query';
import getPlans from './api/getPlans';

export const Home = () => {
  const { data } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlans({}),
    select: (data) => data.data,
  });

  // 일정 데이터 상태관리
  const [plans, setPlans] = useState<PlanDataWithCategory[]>(
    () => data?.planList ?? [],
  );
  const [cursor, setCursor] = useState<number | null | undefined>(
    () => data?.nextCursor,
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
  const { loaderRef } = useCursorInfiniteScroll({
    cursor,
    setCursor,
    isFetching,
    setIsFetching,
    selectedCategory,
    selectedSubCategory,
    selectedRegion,
    selectedSubRegion,
    selectedSort,
    onDataFetched: (newData) => {
      setPlans((prev) => {
        const filtered = newData.filter(
          (newItem) =>
            !prev.some((oldItem) => oldItem.planId === newItem.planId),
        );
        return [...prev, ...filtered];
      });
    },
  });

  // 주의: data가 undefined인 경우도 있을 수 있으므로 방어 코드 필요
  useEffect(() => {
    if (data?.planList) {
      setPlans(data.planList);
    }
  }, [data]);

  // 탭 변경 시 카테고리 업데이트
  useEffect(() => {
    setSelectedCategory(activeTab);
    setSelectedSort(null);
  }, [activeTab]);

  // 정렬이 바뀔 때 새 목록 불러오기기
  useEffect(() => {
    if (selectedSort) {
      setPlans([]);
      setIsFetching(false);
    }
  }, [selectedSort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      {/* 탭 컴포넌트 */}
      <Tabs
        tabs={tabs}
        defaultTab="달램핏"
        onTabChange={(category) => {
          setActiveTab(category);
          setCursor(undefined);
          setIsFetching(false);
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
    </div>
  );
};
