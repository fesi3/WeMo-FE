import type { GetServerSideProps } from 'next';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Home } from '@/pages/app/plans';
import getPlans from '@/pages/app/plans/api/getPlans';

interface HomeProps {
  dehydratedState: DehydratedState;
}

export default function HomePage({ dehydratedState }: HomeProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookie = req.headers.cookie || '';
    const isLoggedIn = !!cookie.includes('accessToken');
    const queryClient = new QueryClient();

    const [sortParam, categoryParam] = ['', 1];

    await queryClient.prefetchInfiniteQuery({
      queryKey: ['plans', { sortParam, categoryParam }],
      queryFn: ({ pageParam }) => {
        return getPlans({
          sortParam,
          categoryParam,
          cookie,
          isLoggedIn,
          pageParam,
        });
      },
      initialPageParam: null,
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('초기 데이터 로딩 실패:', error);
    return {
      props: {
        initialPlans: [],
      },
    };
  }
};
