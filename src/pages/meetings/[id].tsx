import MeetingDetailFooter from '@/components/meetings/MeetingDetailFooter';
import MeetingDetailMain from '@/components/meetings/MeetingDetailMain';
import Header from '@/components/shared/layout/Header';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';
import { useRouter } from 'next/router';

export default function MeetingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data, isError } = useMeetingDetailQuery(
    typeof id === 'string' ? parseInt(id) : null,
  );

  if (isLoading) return <div>로딩중</div>;
  if (!data || isError) return <div>데이터 불러오기 실패</div>;
  return (
    <>
      <Header title="모임 상세" />
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain meetingData={data.data} />
        <MeetingDetailFooter />
      </div>
    </>
  );
}
