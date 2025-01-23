import MeetingDetailFooter from '@/components/meetingDetail/MeetingDetailFooter';
import MeetingDetailMain from '@/components/meetingDetail/MeetingDetailMain';
import Header from '@/components/shared/layout/Header';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';

export default function MeetingDetailPage() {
  const { isLoading, data, isError } = useMeetingDetailQuery();

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
