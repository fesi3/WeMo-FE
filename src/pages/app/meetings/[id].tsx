import { fetchMeetingDetailSSR } from '@/shared/api/ssr/meetings';
import MeetingDetailMain from '@/entities/meeting/meetingDetail/MeetingDetailMain';
import Header from '@/widgets/Header';
import { QUERY_KEY } from '@/shared/constants/queryKey';
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
  const cookie = context.req.headers.cookie || '';
  const queryClient = new QueryClient();
  const idNum = parseInt(id as string);
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.meetingDetail(idNum),
    queryFn: () => fetchMeetingDetailSSR(idNum, cookie),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

interface MeetingDetailPageProps {
  dehydratedState: DehydratedState;
}

export function MeetingDetailPage({ dehydratedState }: MeetingDetailPageProps) {
  const router = useRouter();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Header
        title="모임 상세"
        onClickBack={() => {
          router.push('/meetings');
        }}
      />
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain />
      </div>
    </HydrationBoundary>
  );
}
