import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import axios from 'axios';
import PlanCard from '@/components/mypage/PlanCard';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export interface PlanData {
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
  const [plans, setPlans] = useState<PlanData[]>([]);
  //최초 렌더링 시에만 api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/my_plan`,
          // {
          //   headers: {
          //     Authorization: ``, // JWT 토큰
          //   },
          // },
        );
        const userPlanData = response.data.data.planList;
        const userPlanCount = response.data.data.planCount;

        console.log('들어온 데이터 수', userPlanCount);

        setPlans(userPlanData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log('일정 업데이트 데이터', plans);

  // 현재 사용자 이메일(임시 정보)

  return (
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        일정 페이지
      </header>

      <main className="flex flex-col px-4">
        <section className="mt-4 flex flex-col">
          <ul>
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <PlanCard key={index} planData={plan} />
              ))
            ) : (
              // 배열에 데이터가 없는 경우
              <p className="mt-4 text-center">일정이 없습니다.</p>
            )}
          </ul>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}
