import MeetingCard from '@/components/mypage/MeetingCard';
import Button from '@/components/shared/Button';
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export interface MeetingData {
  email: string;
  meetingId: number;
  meetingName: string;
  meetingImagePath: StaticImageData;
  category: string;
  memberCount: number;
}

export default function MyMeeting() {
  const [activeButton, setActiveButton] = useState<'tabLeft' | 'tabRight'>(
    'tabLeft',
  );

  // 버튼 클릭 시 상태 변경
  const handleButtonClick = (type: 'tabLeft' | 'tabRight') => {
    if (activeButton === type) {
      return; // 이미 활성화된 버튼을 다시 클릭하면 아무 일도 일어나지 않음
    }
    // 클릭된 버튼을 활성화, 같은 버튼을 클릭하면 비활성화
    setActiveButton(type);
  };
  console.log('클릭', activeButton);

  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  //최초 렌더링 시에만 api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/my_meeting`,
          // {
          //   headers: {
          //     Authorization: ``, // JWT 토큰
          //   },
          // },
        );
        const userMeetingData = response.data.data.meetingList;
        const userMeetingCount = response.data.data.meetingCount;

        console.log('들어온 데이터 수', userMeetingCount);

        setMeetings(userMeetingData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log('업데이트 데이터', meetings);

  //유저 정보 전역 데이터로 수정하기@@@
  const useremail = 'test@test.com'; // 현재 사용자의 이메일

  const createdMeetings = meetings.filter((meet) => meet.email === useremail);
  const joinedMeetings = meetings.filter((meet) => meet.email !== useremail);
  console.log('내가 만든 모임데이터', createdMeetings);
  console.log('참여한 데이터', joinedMeetings);

  const meetingData =
    activeButton === 'tabLeft' ? joinedMeetings : createdMeetings;

  return (
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        모임페이지
      </header>

      <main className="flex flex-col px-4">
        <section className="flex h-[64px] w-full items-center justify-center">
          {' '}
          <Button
            type="tabLeft"
            text="참여 모임"
            isActive={activeButton === 'tabLeft'}
            onClick={() => handleButtonClick('tabLeft')}
          />
          <Button
            type="tabRight"
            text="내가 만든 모임"
            isActive={activeButton === 'tabRight'}
            onClick={() => handleButtonClick('tabRight')}
          />{' '}
        </section>

        <section className="flex flex-col">
          <ul>
            {meetingData.length > 0 ? (
              meetingData.map((meet, index) => (
                <MeetingCard
                  key={index}
                  meetingData={meet}
                  useremail={useremail} //유저 정보 전역 데이터로 수정하기@@@
                />
              ))
            ) : (
              // meetingData 배열에 데이터가 없는 경우
              <p className="mt-4 text-center">해당 모임이 없습니다.</p>
            )}
          </ul>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}

// MyMeeting.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="모임 페이지">{page}</MypageLayout>;
// };
