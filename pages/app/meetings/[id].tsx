import { fetchMeetingDetailSSR } from '@/shared/api/ssr/meetings';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { GetServerSideProps } from 'next';
import { MeetingDetail } from '@/pages/app/meetings/[id]';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
interface MeetingDetailProps {
  dehydratedState: DehydratedState;
}
export default function MeetingDetailPage({
  dehydratedState,
}: MeetingDetailProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <MeetingDetail />
    </HydrationBoundary>
  );
}

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
