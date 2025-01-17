import MeetingCard from '@/components/mypage/MeetingCard';
import Button from '@/components/shared/Button';
import { useState } from 'react';
import meetingImg from '@/assets/images/Rectangle 6188.png';
import { StaticImageData } from 'next/image';

export interface meetingProps {
  meetingData: {
    email: string;
    meetingId: number;
    meetingName: string;
    meetingImagePath: StaticImageData;
    category: string;
    memberCount: number;
  };
  useremail: string; // meetings에서 전달하는 유저의 이메일 정보
}

export default function MyMeeting() {
  const [activeButton, setActiveButton] = useState<
    'tabLeft' | 'tabRight' | null
  >('tabLeft');

  // 버튼 클릭 시 상태 변경
  const handleButtonClick = (type: 'tabLeft' | 'tabRight') => {
    if (activeButton === type) {
      return; // 이미 활성화된 버튼을 다시 클릭하면 아무 일도 일어나지 않음
    }
    // 클릭된 버튼을 활성화, 같은 버튼을 클릭하면 비활성화
    setActiveButton(type);
  };
  console.log('클릭', activeButton);

  // 현재 사용자 이메일(임시 정보)
  const useremail = 'aaa@naver.com'; // 현재 사용자의 이메일

  const meetings = [
    {
      email: 'aaa@naver.com',
      meetingId: 1,
      meetingName: '노래방팟팟',
      meetingImagePath: meetingImg,
      category: '달램핏',
      memberCount: 6,
    },
    {
      email: 'abc@naver.com',
      meetingId: 21,
      meetingName: '운동팟',
      meetingImagePath: meetingImg,
      category: '워케이션',
      memberCount: 7,
    },
    {
      email: 'aaa@naver.com',
      meetingId: 3,
      meetingName: '야식팟',
      meetingImagePath: meetingImg,
      category: '달램핏',
      memberCount: 10,
    },
  ];

  const createdMeetings = meetings.filter((meet) => meet.email === useremail);
  const joinedMeetings = meetings.filter((meet) => meet.email !== useremail);
  console.log(createdMeetings);

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
            {meetingData.map((meet) => (
              <MeetingCard
                key={meet.meetingId}
                meetingData={meet}
                useremail={useremail}
              />
            ))}
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
