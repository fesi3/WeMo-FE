import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import axios from 'axios';
import PlanCard from '@/components/mypage/PlanCard';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { useRouter } from 'next/navigation';

// const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface PlanData {
  email: string;
  planId: number;
  planName: string;
  category: string;
  province: string;
  district: string;
  planImagePath: StaticImageData | string;
  dateTime: string;
  meetingId: number;
  meetingName: string;
  capacity: number;
  participants: number;
  registrationEnd: string; // 마감 날짜
  isOpened: boolean;
  isCancled: boolean;
  isFulled: boolean;
  isLiked: boolean;
}

export default function MyMeMyPlaneting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [plans, setPlans] = useState<PlanData[]>([]);
  //유저 정보 전역 데이터로 수정하기@@@
  const useremail = 'test123@test.com'; // 현재 사용자의 이메일
  const router = useRouter();

  //최초 렌더링 시에만 api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/plans?page=1`, {
          withCredentials: true,
        });
        const userPlanData = response.data.data.planList;
        const userPlanCount = response.data.data.planCount;

        console.log('들어온 데이터 수', userPlanCount);

        setPlans(userPlanData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          console.log('서버로부터 받은 에러 데이터', error.response.data);
          if (error.response.status === 400) {
            alert('로그인이 필요합니다!.');
            router.push('/login');
            return;
          } else {
            alert('[error] 서버와 통신 오류 발생.');
          }
        } else {
          //axios 에러가 아닌 다른 예외가 발생한 경우
          alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchData();
  }, []);

  console.log('일정 업데이트 데이터', plans);

  // 나중에 이메일로 바꾸기 ==-======================
  const createdPlans = plans.filter((plan) => plan.email === useremail);
  const joinedPlans = plans.filter((plan) => plan.email !== useremail);
  console.log('내가 만든 일정데이터', createdPlans);
  console.log('참여한 일정데이터', joinedPlans);

  const planData = activeTab === 'tabLeft' ? joinedPlans : createdPlans;

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
          {planData.length > 0 ? (
            planData.map((plan, index) => (
              <PlanCard key={index} planData={plan} useremail={useremail} />
            ))
          ) : (
            // 배열에 데이터가 없는 경우
            <NoData comment="일정이" toPage="일정 둘러보기" />
          )}
        </ul>
      </section>
    </MypageLayout>
  );
}
