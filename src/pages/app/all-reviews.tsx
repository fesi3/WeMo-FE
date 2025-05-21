import Tabs from '@/widgets/tab/Tabs';
import { GetStaticProps } from 'next';
import { Review } from '@/shared/types/reviewType';

import ReviewContainer from '@/entities/review/all-reviews/ReviewContainer';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import fetchReviews from '@/entities/review/api/reviews';
import { tabs } from '@/shared/constants/tabs';

interface ReviewPageProps {
  dehydratedState: DehydratedState;
}

export const ReviewPage = ({ dehydratedState }: ReviewPageProps) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-7xl px-4 py-2">
        <Tabs
          tabs={tabs}
          renderContent={(category) => <ReviewContainer category={category} />}
        />
      </div>
    </HydrationBoundary>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const category = '달램핏';
  const filters = { region: null, subRegion: null, date: null, sort: null };
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['reviews', category, filters],
    queryFn: ({ pageParam = 1 }) => fetchReviews(category, filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: { reviews: Review[]; nextPage?: number }) =>
      lastPage.nextPage ?? null,
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    props: JSON.parse(JSON.stringify({ dehydratedState })),
    revalidate: 60,
  };
};
