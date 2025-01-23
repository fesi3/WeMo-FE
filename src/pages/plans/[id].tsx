import { attendPlan, leavePlan } from '@/api/plan';
import PlanDetailMain from '@/components/planDetail/PlanDetailMain';
import Header from '@/components/shared/layout/Header';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';
import { useRouter } from 'next/router';

export default function PlanDetailPage() {
  const { data, isLoading, refetch } = usePlanDetailQuery();
  const router = useRouter();
  const { id } = router.query;
  const onClickJoinPlan = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) router.push('login');
    try {
      if (!data?.data.isJoined) {
        await attendPlan(parseInt(id as string));
      } else {
        await leavePlan(parseInt(id as string));
      }
    } finally {
      refetch();
    }
  };
  if (isLoading) return <div>로딩중</div>;
  if (!data) return <div>데이터 없음</div>;
  return (
    <>
      <Header title="일정 상세" />
      <div className="mx-auto min-h-screen max-w-screen-md">
        <PlanDetailMain
          onClickJoinPlan={onClickJoinPlan}
          planData={data.data}
        />
      </div>
    </>
  );
}
