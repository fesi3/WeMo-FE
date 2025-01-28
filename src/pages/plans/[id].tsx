import { attendPlan, fetchPlanDetail, leavePlan } from '@/api/plan';
import PlanDetailMain from '@/components/plans/PlanDetailMain';
import { queryKey } from '@/constants/queryKey';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';
import { RootState } from '@/redux/store';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const idNum = parseInt(id as string);
  await queryClient.prefetchQuery({
    queryKey: queryKey.planDetail(idNum),
    queryFn: () => fetchPlanDetail(idNum),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

interface PlanDetailPageProps {
  dehydratedState: DehydratedState;
}

export default function PlanDetailPage({
  dehydratedState,
}: PlanDetailPageProps) {
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
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto min-h-screen max-w-screen-md">
        <PlanDetailMain
          userEmail={auth.user?.email}
          onClickJoinPlan={onClickJoinPlan}
          planData={data.data}
        />
      </div>
    </HydrationBoundary>
  );
}
