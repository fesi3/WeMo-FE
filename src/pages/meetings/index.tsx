import React, { useState, useRef, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import Greeting from '../../components/findGatherings/Greeting';
import Tabs from '../../components/findGatherings/tab/tab';
import DateModal from '../../components/shared/calendar/DateModal';
import RegionDropdown from '../../components/shared/dropdown/RegionDropdown';
import {
  RegionOption,
  SubRegionOption,
} from '../../components/types/reviewType';

import CardList from '../../components/findGatherings/card/CardList';

import { PlanDataWithCategory } from '@/components/types/plans';
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

//카테고리 string을 categoryId로 매핑
const getCategoryId = (
  selectedCategory: string,
  selectedSubCategory: string | null,
) => {
  // "달램핏" 탭
  if (selectedCategory === '달램핏') {
    if (selectedSubCategory === '오피스 스트레칭') return 3;
    if (selectedSubCategory === '마인드풀니스') return 4;
    return 1; // 서브 필터가 없으면 달램핏 전체 = 1
  }
  // "워케이션" 탭
  if (selectedCategory === '워케이션') {
    return 2;
  }
  return 0;
};

const Home: NextPage<HomeProps> = ({ initialPlans, initialCursor }) => {
  const [plans, setPlans] = useState<PlanDataWithCategory[]>(initialPlans);
  const [cursor, setCursor] = useState<number | null>(initialCursor);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<RegionOption | null>(
    null,
  );
  const [selectedSubRegion, setSelectedSubRegion] =
    useState<SubRegionOption | null>(null);

  // 달램핏 탭일 때만 사용하는 ‘서브 필터’(오피스 스트레칭, 마인드풀니스)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  //PlanList에서 동적으로 받아오는 게 좋을 지?? 하드코딩 유지할 지?? 멘토님께 여쭤보기
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];

  const renderTabContent = (selectedCategory: string) => {
    // 1) 달램핏 탭 선택 시 → 서브 필터 UI 표시
    const isDalFit = selectedCategory === '달램핏';

    return (
      <>
        {/* 서브필터 버튼들 */}
        {isDalFit && (
          <div className="mb-4 flex gap-2">
            {/* 추후 공통컴포넌트(버튼)으로 변경 */}
            <button
              className={`rounded border px-3 py-1 ${
                selectedSubCategory === null ? 'bg-primary-10 text-white' : ''
              }`}
              onClick={() => setSelectedSubCategory(null)}
            >
              전체
            </button>
            <button
              className={`rounded border px-3 py-1 ${
                selectedSubCategory === '오피스 스트레칭'
                  ? 'bg-primary-10 text-white'
                  : ''
              }`}
              onClick={() => setSelectedSubCategory('오피스 스트레칭')}
            >
              오피스 스트레칭
            </button>
            <button
              className={`rounded border px-3 py-1 ${
                selectedSubCategory === '마인드풀니스'
                  ? 'bg-primary-10 text-white'
                  : ''
              }`}
              onClick={() => setSelectedSubCategory('마인드풀니스')}
            >
              마인드풀니스
            </button>
          </div>
        )}

        {/* 일정 목록 렌더링 */}
        {renderPlanList(selectedCategory)}
      </>
    );
  };

  // 탭하위 일정 목록 필터링
  const renderPlanList = (selectedCategory: string) => {
    const actualCategory =
      selectedCategory === '달램핏' && selectedSubCategory
        ? selectedSubCategory
        : selectedCategory;

    const filteredPlans = plans.filter((p) => {
      const planDate = new Date(p.dateTime).toLocaleDateString();

      const dateCondition = !selectedDate || planDate === selectedDate;
      const categoryCondition = p.category === actualCategory;
      const provinceCondition =
        !selectedRegion || selectedRegion.id === 0 // "전체" or 미선택
          ? true
          : p.province === selectedRegion.name;
      const districtCondition =
        !selectedSubRegion || selectedSubRegion.id === 0
          ? true
          : p.district === selectedSubRegion.name;

      return (
        dateCondition &&
        categoryCondition &&
        provinceCondition &&
        districtCondition
      );
    });

    return (
      <>
        <Greeting />
        <div className="mb-4 flex gap-4">
          <DateModal onDateSelect={setSelectedDate} />
          <RegionDropdown
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            onRegionChange={(region) => {
              setSelectedRegion(region);
              setSelectedSubRegion(null);
            }}
            onSubRegionChange={(sub) => {
              setSelectedSubRegion(sub);
            }}
          />
        </div>
        <CardList plans={filteredPlans} />
      </>
    );
  };

  //로딩 트리거용 ref -> 커서 기반으로 수정정
  const loaderRef = useRef<HTMLDivElement | null>(null);

  //무한 스크롤 로직, 추후 코드 분리
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching && cursor !== null) {
          setIsFetching(true);
          try {
            const categoryId = getCategoryId('달램핏', selectedSubCategory);
            const provinceParam =
              selectedRegion && selectedRegion.id > 0
                ? `&province=${selectedRegion.name}`
                : '';
            const districtParam =
              selectedSubRegion && selectedSubRegion.id > 0
                ? `&district=${selectedSubRegion.name}`
                : '';
            const res = await axios.get<PlanListResponse>(
              `${baseUrl}/api/plans?cursor=${cursor}&size=10&categoryId=${categoryId}${provinceParam}${districtParam}`,
            );
            const newData = res.data;

            // API 데이터 형태변환
            const formatted = newData.data.planList.map(
              (item: PlanDataWithCategory) => ({
                ...item,
              }),
            );

            const nextCursor = newData.data.nextCursor;

            // 이전 plans + 신규 plans 합치기
            setPlans((prev) => {
              // 동일한 PlanId 가지는 데이터 거르기 (중복 데이터 제거)
              const filtered = formatted.filter(
                (newItem) =>
                  !prev.some((oldItem) => oldItem.planId === newItem.planId),
              );
              return [...prev, ...filtered];
            });

            setCursor(nextCursor);
          } catch (error) {
            console.error('추가 데이터 로딩 실패:', error);
          } finally {
            setIsFetching(false);
          }
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    cursor,
    isFetching,
    selectedSubCategory,
    selectedRegion,
    selectedSubRegion,
  ]);

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <Tabs tabs={tabs} defaultTab="달램핏" renderContent={renderTabContent} />
      <div ref={loaderRef} className="h-px"></div>
    </div>
  );
};

// SSR로 초기 10개 목록, 추후 로직 분리
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get<PlanListResponse>(
      `${baseUrl}/api/plans?cursor=0&size=10&categoryId=1`,
    );
    const data = res.data;
    console.log('데이터 확인:', data.data);

    // API 데이터 형태 변환
    const initialPlans: PlanDataWithCategory[] = data.data.planList.map(
      (item: PlanDataWithCategory) => ({
        ...item,
      }),
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
