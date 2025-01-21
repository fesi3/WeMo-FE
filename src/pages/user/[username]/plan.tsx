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
  const router = useRouter();

  //최초 렌더링 시에만 api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          alert('로그인이 필요합니다!');
          router.push('/login');
          return;
        }
        const response = await axios.get(`${BASE_URL}/api/users/plans?page=1`, {
          headers: {
            Authorization: `${token}`, // JWT 토큰
          },
        });
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

  return (
    <MypageLayout headerProps="일정 페이지">
      <section className="mt-4 flex flex-col sm:w-[500px] md:w-[650px] lg:w-[850px]">
        <ul className="flex flex-col gap-y-10">
          {plans.length > 0 ? (
            plans.map((plan, index) => <PlanCard key={index} planData={plan} />)
          ) : (
            // 배열에 데이터가 없는 경우
            <NoData comment="일정이" toPage="일정 둘러보기" />
          )}
        </ul>
      </section>
    </MypageLayout>
  );
}

// MyMeMyPlaneting.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="일정 페이지">{page}</MypageLayout>;
// };
