import React, { useState, useRef, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import DateModal from '../../components/shared/calendar/DateModal';
import CardList from '../../components/findGatherings/card/CardList';
import Tabs from '../../components/findGatherings/tab/tab';
import { PlanDataWithCategory } from '@/components/types/plans';

interface PlanListData {
  planCount: number;
  planList: PlanDataWithCategory[];
  nextCursor: number;
}

interface PlanListResponse {
  success: boolean;
  message: string;
  data: PlanListData;
}

interface HomeProps {
  initialPlans: PlanDataWithCategory[];
}

const Home: NextPage<HomeProps> = ({ initialPlans }) => {
  const [plans, setPlans] = useState<PlanDataWithCategory[]>(initialPlans);
  const [page, setPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //PlanList에서 받아오는걸로 수정필요
  const tabs = [{ category: '달램핏' }, { category: '워케이션' }];

  // => 선택된 label을 받고, 거기에 맞는 데이터 + 공통 UI를 반환
  const renderTabContent = (selectedLabel: string) => {
    //카테고리에 맞는 데이터 필터
    const filteredPlans = plans.filter((p) => p.category === selectedLabel);

    //날짜/지역/정렬 필터 컴포넌트, 카드 컴포넌트 렌더링 필요
    return (
      <>
        <DateModal />
        {/* 공통 UI 추가 */}
        <CardList plans={filteredPlans} />
      </>
    );
  };

  //로딩 트리거용 ref
  const loaderRef = useRef<HTMLDivElement | null>(null);

  //무한 스크롤 로직, 추후 코드 분리
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
          setIsFetching(true);
          const nextPage = page + 1;
          // 다음 페이지 호출
          try {
            const res = await axios.get<PlanListResponse>(
              //커서 기반 로직으로 추후 수정
              `https://677e23a294bde1c1252a8cc0.mockapi.io/plans?page=${nextPage}&limit=10`,
            );
            const newData = res.data;

            // API 데이터 형태변환
            const formatted = newData.data.planList.map(
              (item: PlanDataWithCategory) => ({
                ...item,
              }),
            );

            // 이전 plans + 신규 plans 합치기
            setPlans((prev) => {
              // 동일한 PlanId 가지는 데이터 거르기 (중복 데이터 제거)
              const filtered = formatted.filter(
                (newItem) =>
                  !prev.some((oldItem) => oldItem.planId === newItem.planId),
              );
              return [...prev, ...filtered];
            });
            setPage(nextPage);
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
  }, [page, isFetching]);

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
    const res = await axios.get(
      'https://677e23a294bde1c1252a8cc0.mockapi.io/plans',
    );
    const data = res.data;
    console.log('데이터 확인:', data.data);

    // API 데이터 형태 변환
    const initialPlans: PlanDataWithCategory[] = data.data.planList.map(
      (item: PlanDataWithCategory) => ({
        ...item,
      }),
    );

    return {
      props: {
        initialPlans,
      },
    };
  } catch (error) {
    console.error('초기 데이터 로딩 실패:', error);
    return {
      props: {
        initialPlans: [],
      },
    };
  }
};

export default Home;
