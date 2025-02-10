import MeetingCard from '@/components/mypage/MeetingCard';
import { useEffect, useState } from 'react';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { useMypageMeetings } from '@/hooks/mypage/fetch/useMypageData';
import { API_PATHS } from '@/constants/apiPath';

export default function MyMeeting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1);

  // activeTab이 변경될 때 page를 1로 리셋
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // useMeetings 훅을 통해 모임 데이터 가져오기
  const {
    data: joinedMeetings,
    isLoading: joinedMeetingsLoading,
    error: joinedMeetingsError,
  } = useMypageMeetings(
    API_PATHS.MYPAGE.GET_JOINED_MEETINGS(page),
    'joined',
    page,
    activeTab === 'tabLeft',
  );

  // 내가 만든 모임 데이터 가져오기 (useMeetings)
  const {
    data: createdMeetings,
    isLoading: createdMeetingsLoading,
    error: createdMeetingsError,
  } = useMypageMeetings(
    API_PATHS.MYPAGE.GET_CREATED_MEETINGS(page),
    'created',
    page,
    activeTab === 'tabRight',
  );

  //로딩 및 에러 처리
  if (activeTab === 'tabLeft') {
    if (joinedMeetingsLoading) return <div>참여한 모임 로딩 중...</div>;
    if (joinedMeetingsError)
      return <div>Error: {joinedMeetingsError.message} </div>;
  }

  if (activeTab === 'tabRight') {
    if (createdMeetingsLoading) return <div>생성한 모임 로딩 중...</div>;
    if (createdMeetingsError)
      return <div>Error: {createdMeetingsError.message} </div>;
  }

  const meetingData =
    activeTab === 'tabLeft'
      ? joinedMeetings?.data.meetingList
      : createdMeetings?.data.meetingList;

  const joinedMeetingsTotalPage = joinedMeetings?.data.totalPage;
  const createdMeetingsTotalPage = createdMeetings?.data.totalPage;

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
        // activeTab === 'tabLeft' ? joinedPlansTotalPage : createdPlansTotalPage
        activeTab === 'tabLeft'
          ? joinedMeetingsTotalPage
            ? joinedMeetingsTotalPage
            : 0
          : createdMeetingsTotalPage
            ? createdMeetingsTotalPage
            : 0
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
