import { PlanDetail } from '@/pages/app/plans/[id]';
import fetchPlanDetailSSR from './ssr/plans';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

interface PlanDetailPageProps {
  dehydratedState: DehydratedState;
  idNum: number;
}

export default function PlanDetailPage({
  dehydratedState,
  idNum,
}: PlanDetailPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <PlanDetail idNum={idNum} />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const cookie = context.req.headers.cookie || '';
  const queryClient = new QueryClient();
  const idNum = parseInt(id as string);
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.planDetail(idNum),
    queryFn: () => fetchPlanDetailSSR(idNum, cookie),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      idNum,
    },
  };
};
