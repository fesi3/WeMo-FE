import { useEffect, useState } from 'react';
import PlanCard from '@/components/mypage/PlanCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { useMypagePlans } from '@/hooks/mypage/fetch/useMypageData';
import { API_PATHS } from '@/constants/apiPath';

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1); // 페이지 상태 추가

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // 참여한 일정
  const {
    data: joinedPlans,
    isLoading: joinedPlansLoading,
    error: joinedPlansError,
  } = useMypagePlans(
    API_PATHS.MYPAGE.GET_JOINED_PLANS(page),
    'joined',
    page,
    activeTab === 'tabLeft',
  );

  // 내가 만든 일정
  const {
    data: createdPlans,
    isLoading: createdPlansLoading,
    error: createdPlansError,
  } = useMypagePlans(
    API_PATHS.MYPAGE.GET_CREATED_PLANS(page),
    'created',
    page,
    activeTab === 'tabRight',
  );

  const planData =
    activeTab === 'tabLeft'
      ? joinedPlans?.data.planList
      : createdPlans?.data.planList;

  const joinedPlansTotalPage = joinedPlans?.data.totalPage;
  const createdPlansTotalPage = createdPlans?.data.totalPage;

  //로딩 및 에러 처리
  if (activeTab === 'tabLeft') {
    if (joinedPlansLoading) return <div>참여한 일정 로딩 중...</div>;
    if (joinedPlansError) return <div>Error: {joinedPlansError.message} </div>;
  }

  if (activeTab === 'tabRight') {
    if (createdPlansLoading) return <div>생성한 일정 로딩 중...</div>;
    if (createdPlansError)
      return <div>Error: {createdPlansError.message} </div>;
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
        // activeTab === 'tabLeft' ? joinedPlansTotalPage : createdPlansTotalPage
        activeTab === 'tabLeft'
          ? joinedPlansTotalPage
            ? joinedPlansTotalPage
            : 0
          : createdPlansTotalPage
            ? createdPlansTotalPage
            : 0
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
