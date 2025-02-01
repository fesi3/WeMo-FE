import { fetchMeetingDetail } from '@/api/meeting';
import MeetingDetailMain from '@/components/meetingDetail/MeetingDetailMain';
import { queryKey } from '@/constants/queryKey';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const idNum = parseInt(id as string);
  await queryClient.prefetchQuery({
    queryKey: queryKey.meetingDetail(idNum),
    queryFn: () => fetchMeetingDetail(idNum),
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

export default function MeetingDetailPage({
  dehydratedState,
}: MeetingDetailPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain />
      </div>
    </HydrationBoundary>
  );
}
