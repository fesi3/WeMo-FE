import MeetingDetailFooter from '@/components/meetingDetail/MeetingDetailFooter';
import MeetingDetailMain from '@/components/meetingDetail/MeetingDetailMain';
import Header from '@/components/shared/layout/Header';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function MeetingDetailPage() {
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data, isError } = useMeetingDetailQuery(
    typeof id === 'string' ? parseInt(id) : null,
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.email === data?.data.email) {
      setIsHost(true);
    }
  }, [data?.data.email, user?.email]);
  if (isLoading) return <div>로딩중</div>;
  if (!data || isError) return <div>데이터 불러오기 실패</div>;
  return (
    <>
      <Header title="모임 상세" />
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain meetingData={data.data} />
        <MeetingDetailFooter isHost={isHost} />
      </div>
    </>
  );
}
