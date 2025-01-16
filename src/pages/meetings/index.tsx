import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import Greeting from '@/components/findGatherings/Greeting';
import Tabs from '@/components/findGatherings/tab/Tabs';
import EditMeetingButton from '@/components/findGatherings/EditMeeting/EditMeetingButton';
import SubCategoryFilter from '@/components/findGatherings/SubCategoryFilter';
import PlanFilter from '@/components/findGatherings/PlanFilter';
import PlanList from '@/components/findGatherings/PlanList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getCategoryId } from '@/utils/categoryUtils';
import { PlanDataWithCategory } from '@/components/types/plans';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

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

  // 탭 정보 (필요에 따라 API 호출 후 변경 가능)
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];

  // 무한 스크롤 커스텀 훅 사용
  const { loaderRef } = useInfiniteScroll({
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

  // 탭별 콘텐츠 렌더링
  const renderTabContent = (category: string) => {
    setSelectedCategory(category);
    return (
      <div className="container mx-auto p-4">
        <Greeting />
        {/* 달램핏 탭인 경우 서브 필터 버튼 렌더링 */}
        {selectedCategory === '달램핏' && (
          <SubCategoryFilter
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        )}
        {/* 필터 컴포넌트 */}
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
        {/* 편집 버튼 */}
        <div className="mb-6 flex justify-end">
          <EditMeetingButton />
        </div>
        {/* 필터된 플랜 목록 */}
        <PlanList
          plans={plans}
          selectedDate={selectedDate}
          selectedRegion={selectedRegion}
          selectedSubRegion={selectedSubRegion}
          selectedCategory={category}
          selectedSubCategory={selectedSubCategory}
        />
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6">
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
    const categoryId = getCategoryId('달램핏', null);
    console.log(categoryId);
    const res = await axios.get<PlanListResponse>(
      //`https://677e23a294bde1c1252a8cc0.mockapi.io/plans`,
      `${baseUrl}/api/plans?size=10&page=0&`,
      //탭선택시에 category 1또는 2넘겨주는 로직 추가하기
    );
    const data = res.data;
    console.log(data.data);
    // API 데이터 전처리
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
