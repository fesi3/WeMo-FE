import MeetingDetailFooter from '@/components/meetings/MeetingDetailFooter';
import MeetingDetailMain from '@/components/meetings/MeetingDetailMain';
import Header from '@/components/shared/layout/Header';
import useMeetingDetailQuery from '@/hooks/useMeetingDetailQuery';
import { useRouter } from 'next/router';

export default function MeetingDetailPage() {
  const router = useRouter();
  const { isLoading, data, isError } = useMeetingDetailQuery();
  const onClickBack = () => {
    router.push('/meetings');
  };

  if (isLoading) return <div>로딩중</div>;
  if (!data || isError) return <div>데이터 불러오기 실패</div>;
  return (
    <>
      <Header title="모임 상세" onClickBack={onClickBack} />
      <MeetingDetailMain meetingData={data.data} />
      <MeetingDetailFooter />
    </>
  );
}
