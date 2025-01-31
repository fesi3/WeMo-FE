import MeetingCard from '@/components/mypage/MeetingCard';
import { useEffect, useState } from 'react';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { MeetingData } from '@/types/mypageType';
import useFetchDataFromKey from '@/hooks/useFetchDataFromKey';

export default function MyMeeting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1);

  const apiUrl =
    activeTab === 'tabLeft'
      ? `/api/users/meetings?page=${page}` // 참여한 모임
      : `/api/users/meetings?page=${page}`; // 내가 만든 모임

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  const {
    data: joinedMeetings,
    totalPage: joinedMeetingsTotalPage,
    loading: joinedMeetingsLoading,
    error: joinedMeetingsError,
  } = useFetchDataFromKey<MeetingData[]>(apiUrl, 'meetingList');

  const {
    data: createdMeetings,
    totalPage: createdMeetingsTotalPage,
    loading: createdMeetingsLoading,
    error: createdMeetingsError,
  } = useFetchDataFromKey<MeetingData[]>(apiUrl, 'meetingList');

  // console.log('내가 만든 모임데이터', createdMeetings);
  // console.log('참여한 데이터', joinedMeetings);

  const meetingData =
    activeTab === 'tabLeft' ? joinedMeetings : createdMeetings;

  if (joinedMeetingsLoading || createdMeetingsLoading) {
    return <div>Loading...</div>;
  }
  if (joinedMeetingsError || createdMeetingsError) {
    return <div>Error: {joinedMeetingsError || createdMeetingsError}</div>;
  }
  // console.log('업데이트 데이터', meetings);

  return (
    <MypageLayout
      headerProps="모임 페이지"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabsTitle={[
        { key: 'tabLeft', label: '참여한 모임' },
        { key: 'tabRight', label: '내가 만든 모임' },
      ]}
      page={page}
      totalPage={
        activeTab === 'tabLeft'
          ? joinedMeetingsTotalPage
          : createdMeetingsTotalPage
      }
      onPageChange={setPage}
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
