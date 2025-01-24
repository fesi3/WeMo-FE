import { useState } from 'react';
import PlanCard from '@/components/mypage/PlanCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { PlanData } from '@/types/mypageType';
import useFetchData from '@/api/mypage/useFetchData';

export default function MyMeMyPlaneting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  //유저 정보 전역 데이터로 수정하기@@@
  const useremail = 'test123@test.com'; // 현재 사용자의 이메일

  const {
    data: plans,
    loading,
    error,
  } = useFetchData<PlanData[]>('/api/users/plans?page=1', 'planList');

  // 나중에 이메일로 바꾸기 ==-======================
  const createdPlans = plans?.filter((plan) => plan.email === useremail);
  const joinedPlans = plans?.filter((plan) => plan.email !== useremail);
  console.log('내가 만든 일정데이터', createdPlans);
  console.log('참여한 일정데이터', joinedPlans);

  const planData = activeTab === 'tabLeft' ? joinedPlans : createdPlans;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MypageLayout
      headerProps="일정 페이지"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabsTitle={[
        { key: 'tabLeft', label: '신청한 일정' },
        { key: 'tabRight', label: '내가 만든 일정' },
      ]}
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
