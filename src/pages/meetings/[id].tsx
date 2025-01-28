import { fetchMeetingDetail } from '@/api/meeting';
import MeetingDetailFooter from '@/components/meetings/MeetingDetailFooter';
import MeetingDetailMain from '@/components/meetings/MeetingDetailMain';
import { queryKey } from '@/constants/queryKey';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';
import { RootState } from '@/redux/store';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const idNum = parseInt(id as string);
  const { isLoading, data, isError } = useMeetingDetailQuery(idNum);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.email === data?.data.email) {
      setIsHost(true);
    }
  }, [data?.data.email, user?.email]);
  if (isLoading) return <div>로딩중</div>;
  if (!data || isError) return <div>데이터 불러오기 실패</div>;
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain meetingData={data.data} />
        <MeetingDetailFooter isHost={isHost} />
      </div>
    </HydrationBoundary>
  );
}
