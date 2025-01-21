import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import Greeting from '@/components/findGatherings/Greeting';
import EditMeetingButton from '@/components/findGatherings/editMeeting/EditMeetingButton';
import SubCategoryFilter from '@/components/findGatherings/SubCategoryFilter';
import PlanFilter from '@/components/findGatherings/PlanFilter';
import PlanList from '@/components/findGatherings/PlanList';
import { useCursorInfiniteScroll } from '@/hooks/useCursorInfiniteScroll';
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

// 탭별(달램핏/워케이션) 공통 렌더링 컴포넌트
// 서브카테고리, 모임 만들기 버튼 (인증필요), 일정카드 목록
const RenderCommonContent: React.FC<{
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
  selectedSubCategory: string | null;
}> = ({
  plans,
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  selectedSubRegion,
  setSelectedSubRegion,
  selectedCategory,
  selectedSubCategory,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 토큰 저장소에 따라 변경 필요
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      {/* PlanFilter: 지역/날짜 선택 필터 */}
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
      {/* 모임 만들기 버튼 (인증된 사용자만 노출) */}
      {isAuthenticated && (
        <div className="mb-6 flex justify-end">
          <EditMeetingButton />
        </div>
      )}
      {/* 필터링된 일정 카드 목록 */}
      <PlanList
        plans={plans || []}
        selectedDate={selectedDate}
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  );
};

const Home: NextPage<HomeProps> = ({ initialPlans, initialCursor }) => {
  //상태관리
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
  }, [activeTab]);

  // 탭별 콘텐츠 렌더링
  const renderTabContent = (category: string) => {
    //setSelectedCategory(category);
    return (
      <div className="mx-auto items-center sm:w-[400px] sm:justify-center md:w-[600px] lg:w-full">
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

  return (
    <div className="mx-auto px-4 py-6">
      {/* 탭 컴포넌트 */}
      <Tabs
        tabs={tabs}
        defaultTab="달램핏"
        onTabChange={(category) => setActiveTab(category)}
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
        initialCursor: null,
      },
    };
  }
};

export default Home;
