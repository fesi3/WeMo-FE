import { fetchPlanDetailSSR } from '@/api/ssr/plans';
import PlanDetailMain from '@/components/planDetail/PlanDetailMain';
import Header from '@/components/shared/layout/Header';
import { QUERY_KEY } from '@/constants/queryKey';

import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  //쿠키를 추출해 SSR전용 패치함수에 전달합니다.
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

interface PlanDetailPageProps {
  dehydratedState: DehydratedState;
  idNum: number;
}

export default function PlanDetailPage({
  dehydratedState,
  idNum,
}: PlanDetailPageProps) {
  const router = useRouter();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Header
        title="일정 상세"
        onClickBack={() => {
          router.push('/plans');
        }}
      />
      <div className="mx-auto min-h-screen max-w-screen-md">
        <PlanDetailMain id={idNum} />
      </div>
    </HydrationBoundary>
  );
}
