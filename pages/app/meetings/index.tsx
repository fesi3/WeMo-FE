import { Meetings } from '@/pages/app/meetings';
import { Meeting } from '@/shared/types/api/meetingList';
import ssrInstance from '@/shared/utils/axios';
import { GetServerSideProps } from 'next';

interface MeetingsPageProps {
  initialMeetings: Meeting[];
  nextCursor: number | null;
}

export default function MeetingsPage({
  initialMeetings,
  nextCursor,
}: MeetingsPageProps) {
  return <Meetings initialMeetings={initialMeetings} nextCursor={nextCursor} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await ssrInstance.get('/api/meetings', {
      params: {
        size: 10,
      },
      withCredentials: false,
    });
    return {
      props: {
        initialMeetings: response.data.data.meetingList,
        nextCursor: response.data.data.nextCursor || null,
      },
    };
  } catch (error) {
    console.error('모임 목록 불러오기 실패', error);
    return { props: { initialMeetings: [], nextCursor: null } };
  }
};
