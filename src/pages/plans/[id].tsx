import { attendPlan, leavePlan } from '@/api/plan';
import PlanDetailMain from '@/components/plans/PlanDetailMain';
import Header from '@/components/shared/layout/Header';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function PlanDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const idNum = parseInt(id as string);
  const { data, isLoading, refetch } = usePlanDetailQuery(idNum);
  const auth = useSelector((state: RootState) => state.auth);

  const onClickJoinPlan = async () => {
    if (!auth.isLoggedIn) {
      router.push('/login');
      return;
    }
    try {
      if (!data?.data.isJoined) {
        await attendPlan(idNum);
      } else {
        await leavePlan(idNum);
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
          userEmail={auth.user?.email}
          onClickJoinPlan={onClickJoinPlan}
          planData={data.data}
        />
      </div>
    </>
  );
}
