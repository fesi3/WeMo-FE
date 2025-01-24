import MeetingCard from '@/components/mypage/MeetingCard';
import { useState } from 'react';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { MeetingData } from '@/types/mypageType';
import useFetchData from '@/api/mypage/useFetchData';

export default function MyMeeting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  //유저 정보 전역 데이터로 수정하기@@@
  const useremail = 'test123@test.com'; // 현재 사용자의 이메일
  const {
    data: meetings,
    loading,
    error,
  } = useFetchData<MeetingData[]>('/api/users/meetings?page=1', 'meetingList');

  // console.log('업데이트 데이터', meetings);

  const createdMeetings = meetings?.filter((meet) => meet.email === useremail);
  const joinedMeetings = meetings?.filter((meet) => meet.email !== useremail);
  // console.log('내가 만든 모임데이터', createdMeetings);
  // console.log('참여한 데이터', joinedMeetings);

  const meetingData =
    activeTab === 'tabLeft' ? joinedMeetings : createdMeetings;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MypageLayout
      headerProps="모임 페이지"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabsTitle={[
        { key: 'tabLeft', label: '참여한 모임' },
        { key: 'tabRight', label: '내가 만든 모임' },
      ]}
    >
      <section className="mt-5 flex flex-col items-center sm:w-[350px] md:w-[700px] lg:w-[1050px]">
        <ul className="flex flex-col gap-y-10 md:flex-row md:flex-wrap md:gap-10">
          {meetingData && meetingData.length > 0 ? (
            meetingData.map((meet, index) => (
              <MeetingCard key={index} meetingData={meet} />
            ))
          ) : (
            <NoData comment="모임이" toPage="/user/1" text="모임 구경하기" />
          )}
        </ul>
      </section>
    </MypageLayout>
  );
}
