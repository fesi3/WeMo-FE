import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { useCursorInfiniteScroll } from '@/hooks/useCursorInfiniteScroll';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import Tabs from '@/components/plans/tab/Tabs';
import RenderTabContent from '@/components/plans/RenderTabContent';
import { SortOption } from '@/types/reviewType';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface PlanListData {
  planCount: number;
  planList: PlanDataWithCategory[];
  nextCursor: number | null;
}

interface PlanListResponse {
  success: boolean;
  message: string;
  data: PlanListData;
}

interface HomeProps {
  initialPlans: PlanDataWithCategory[];
  initialCursor: number | null;
}

const Home: NextPage<HomeProps> = ({ initialPlans, initialCursor }) => {
  //상태관리
  const [plans, setPlans] = useState<PlanDataWithCategory[]>(initialPlans);
  const [cursor, setCursor] = useState<number | null | undefined>(
    initialCursor,
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // 필터 상태 관리
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionOption | null>(
    null,
  );
  const [selectedSubRegion, setSelectedSubRegion] =
    useState<SubRegionOption | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('달램핏');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  // 정렬 상태
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);

  //탭 상태 관리
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];
  const [activeTab, setActiveTab] = useState<string>('달램핏');

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

  // 탭 변경 시 카테고리 업데이트
  useEffect(() => {
    setSelectedCategory(activeTab);
    setCursor(undefined);
    setSelectedSort(null);
  }, [activeTab]);

  // 정렬이 바뀔 때 새 목록 불러오기기
  useEffect(() => {
    if (selectedSort) {
      setPlans([]);
      setCursor(undefined);
      setIsFetching(false);
    }
  }, [selectedSort]);

  return (
    <div className="mx-auto px-4 py-2">
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get<PlanListResponse>(
      `${baseUrl}/api/plans?size=10&sort=default`,
    );
    const data = res.data;
    const initialPlans: PlanDataWithCategory[] = data.data.planList.map(
      (item) => ({ ...item }),
    );
    const nextCursor = data.data.nextCursor;
    return {
      props: {
        initialPlans,
        initialCursor: nextCursor !== undefined ? nextCursor : null,
      },
    };
  } catch (error) {
    console.error('초기 데이터 로딩 실패:', error);
    return {
      props: {
        initialPlans: [],
        initialCursor: undefined,
      },
    };
  }
};

export default Home;
