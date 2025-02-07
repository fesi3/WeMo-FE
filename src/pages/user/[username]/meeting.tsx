import MeetingCard from '@/components/mypage/MeetingCard';
import { useEffect, useState } from 'react';
import NoData from '@/components/mypage/NoData';
import MypageLayout from '@/components/mypage/MypageLayout';
import { MeetingDataResponse } from '@/types/mypageType';
import instance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

// 마이페이지 모임 가져오는 함수
const fetchMypageMeetings = async (url: string) => {
  const response = await instance<MeetingDataResponse>(url);
  return response.data;
};

// 모임 데이터를 가져오는 커스텀 훅
const useMypageMeetings = (
  apiUrl: string,
  status: string,
  page: number,
  enabled: boolean,
) => {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return useQuery({
    queryKey: ['meetingList', status, page],
    queryFn: () => fetchMypageMeetings(apiUrl),
    //   enabled: isLoggedIn, // (로그인 상태일 때만 실행)
    staleTime: 100 * 1000, // 10초
    enabled,
  });
};

export default function MyMeeting() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight'>('tabLeft');
  const [page, setPage] = useState(1);

  const joinedMeetingApiUrl = `/api/users/meetings?page=${page}`; // 참여한 모임
  const createdMeetingApiUrl = `/api/users/meetings/me?page=${page}`; // 내가 만든 모임

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
    joinedMeetingApiUrl,
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
    createdMeetingApiUrl,
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
