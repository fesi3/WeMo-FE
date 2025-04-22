import MeetingDetailMain from '@/entities/meeting/meetingDetail/MeetingDetailMain';
import Header from '@/widgets/Header';
import { useRouter } from 'next/router';

export function MeetingDetail() {
  const router = useRouter();
  return (
    <>
      <Header
        title="모임 상세"
        onClickBack={() => {
          router.push('/meetings');
        }}
      />
      <div className="mx-auto max-w-screen-md">
        <MeetingDetailMain />
      </div>
    </>
  );
}
