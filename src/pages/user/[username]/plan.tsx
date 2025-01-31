import { useEffect, useState } from 'react';
import PlanCard from '@/components/mypage/PlanCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { PlanData } from '@/types/mypageType';
import useFetchDataFromKey from '@/hooks/useFetchDataFromKey';

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1); // 페이지 상태 추가

  const apiUrl =
    activeTab === 'tabLeft'
      ? `/api/users/plans?page=${page}` // 참여한 일정
      : `/api/users/reviews/available?page=${page}`; // 내가 만든 일정

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // 참여한 일정
  const {
    data: joinedPlans,
    totalPage: joinedPlansTotalPage,
    loading: joinedPlansLoading,
    error: joinedPlansError,
  } = useFetchDataFromKey<PlanData[]>(apiUrl, 'planList');

  // 내가 만든 일정
  const {
    data: createdPlans,
    totalPage: createdPlansTotalPage,
    loading: createdPlansLoading,
    error: createdPlansError,
  } = useFetchDataFromKey<PlanData[]>(apiUrl, 'planList');

  // console.log('참여한 모임', joinedPlans);
  // console.log('만든 모임', createdPlans);

  const planData = activeTab === 'tabLeft' ? joinedPlans : createdPlans;

  if (joinedPlansLoading || createdPlansLoading) {
    return <div>Loading...</div>;
  }
  if (joinedPlansError || createdPlansError) {
    return <div>Error: {joinedPlansError || createdPlansError}</div>;
  }

  return (
    <MypageLayout
      headerProps="일정 페이지"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabsTitle={[
        { key: 'tabLeft', label: '신청한 일정' },
        { key: 'tabRight', label: '내가 만든 일정' },
      ]}
      page={page}
      totalPage={
        activeTab === 'tabLeft' ? joinedPlansTotalPage : createdPlansTotalPage
      }
      onPageChange={setPage}
    >
      <section className="mt-4 flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
        <ul className="flex flex-col gap-y-10">
          {planData && planData.length > 0 ? (
            planData.map((plan, index) => (
              <PlanCard key={index} planData={plan} />
            ))
          ) : (
            // 배열에 데이터가 없는 경우
            <NoData comment="일정이" toPage="/" text="일정 보러가기" />
          )}
        </ul>
      </section>
    </MypageLayout>
  );
}
