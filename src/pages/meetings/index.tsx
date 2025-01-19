import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import Greeting from '@/components/findGatherings/Greeting';
import EditMeetingButton from '@/components/findGatherings/editMeeting/EditMeetingButton';
import SubCategoryFilter from '@/components/findGatherings/SubCategoryFilter';
import PlanFilter from '@/components/findGatherings/PlanFilter';
import PlanList from '@/components/findGatherings/PlanList';
import { useCursorInfiniteScroll } from '@/hooks/useCursorInfiniteScroll';
// import { getCategoryId } from '@/utils/categoryUtils';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import Tabs from '@/components/findGatherings/tab/Tabs';

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
  const [plans, setPlans] = useState<PlanDataWithCategory[]>(initialPlans);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
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

  // 탭 정보
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];

  // 무한 스크롤 커스텀 훅
  const { loaderRef } = useCursorInfiniteScroll({
    cursor,
    setCursor,
    isFetching,
    setIsFetching,
    selectedCategory,
    selectedSubCategory,
    selectedRegion,
    selectedSubRegion,
    onDataFetched: (newData) => {
      setPlans((prev) => {
        // 중복 데이터 제거
        const filtered = newData.filter(
          (newItem) =>
            !prev.some((oldItem) => oldItem.planId === newItem.planId),
        );
        return [...prev, ...filtered];
      });
    },
  });

  //필터링 로직을 탭 공통으로 사용
  //  const filteredPlans = plans.filter((plan) => {
  //    const matchesDate = selectedDate === null || plan.dateTime === selectedDate;
  //    const matchesRegion =
  //      selectedRegion === null || plan.province === selectedRegion.name;
  //    const matchesSubRegion =
  //      selectedSubRegion === null || plan.district === selectedSubRegion.name;
  //    const matchesSubCategory =
  //      selectedCategory === '달램핏'
  //        ? selectedSubCategory === null || plan.category === selectedSubCategory
  //        : true; // 워케이션 탭에서는 서브 카테고리 조건 무시
  //
  //    return (
  //      matchesDate && matchesRegion && matchesSubRegion && matchesSubCategory
  //    );
  //  });

  //탭(달램핏/워케이션션) 공통 컴포넌트
  const renderCommonContent = () => (
    <div>
      {/* PlanFilter 렌더링 */}
      <PlanFilter
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        onRegionChange={(region) => {
          setSelectedRegion(region);
          setSelectedSubRegion(null);
        }}
        onSubRegionChange={(sub) => setSelectedSubRegion(sub)}
      />
      {/* 모임 만들기 버튼 */}
      <div className="mb-6 flex justify-end">
        <EditMeetingButton />
      </div>
      {/* 필터링된 일정 카드 목록 */}
      <PlanList
        plans={plans}
        selectedDate={selectedDate}
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  );

  // 탭별 콘텐츠 렌더링
  const renderTabContent = (category: string) => {
    setSelectedCategory(category);
    return (
      <div className="mx-auto items-center sm:w-[400px] sm:justify-center md:w-[600px] lg:w-full">
        <Greeting />
        {/* 달램핏 탭 처리 */}
        {category === '달램핏' ? (
          <SubCategoryFilter
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            renderContent={(subCategory) => {
              setSelectedSubCategory(subCategory); // 선택된 서브 카테고리 업데이트
              return renderCommonContent(); // 공통 컴포넌트 렌더링
            }}
          />
        ) : (
          // 워케이션 탭 처리(SubCategoryFilter제외)
          renderCommonContent()
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 py-6">
      <Tabs
        tabs={tabs}
        defaultTab="달램핏"
        onTabChange={(category) => {
          setSelectedCategory(category);
        }}
        renderContent={renderTabContent}
      />
      <div ref={loaderRef} className="h-12"></div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get<PlanListResponse>(
      `${baseUrl}/api/plans?size=10&page=0&`,
    );
    const data = res.data;
    const initialPlans: PlanDataWithCategory[] = data.data.planList.map(
      (item: PlanDataWithCategory) => ({ ...item }),
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
        initialCursor: null,
      },
    };
  }
};

export default Home;
