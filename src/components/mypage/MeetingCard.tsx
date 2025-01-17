import Image from 'next/image';
import Button from '../shared/Button';
import { MeetingData } from '@/pages/user/[username]/meeting';

export interface MeetingProps {
  meetingData: MeetingData;
  useremail: string; // 사용자 정보(전역 데이터)로 수정하기@@@@
}

const MeetingCard = ({ meetingData, useremail }: MeetingProps) => {
  const {
    email,
    meetingId,
    meetingName,
    meetingImagePath,
    category,
    memberCount,
  } = meetingData;

  // 동일한 이메일이면 "삭제" 버튼, 다르면 "탈퇴" 버튼
  const renderButton = () => {
    if (email === useremail) {
      return (
        <Button
          type="exit_meeting"
          text="모임 삭제"
          textColor="black"
          border="#343434"
          onClick={() => handleDeleteMeeting(meetingId)}
        />
      );
    } else {
      return (
        <Button
          type="exit_meeting"
          text="탈퇴하기"
          textColor="black"
          border="#343434"
          onClick={() => handleLeaveMeeting(meetingId)}
        />
      );
    }
  };

  // "삭제" 버튼 클릭 시 처리 함수
  const handleDeleteMeeting = (meetingId: number) => {
    console.log(`${meetingId}번 모임을 삭제합니다.`);
    // 삭제 로직 추가
  };

  // "탈퇴" 버튼 클릭 시 처리 함수
  const handleLeaveMeeting = (meetingId: number) => {
    console.log(`${meetingId}번 모임에서 탈퇴합니다.`);
    // 탈퇴 로직 추가
  };

  return (
    <div className="my-5 flex w-full flex-col rounded-md bg-gray-100">
      <div className="relative mb-1 h-[170px] w-full overflow-hidden rounded-t-md">
        {' '}
        {/* w-[336px] */}
        <Image
          src={meetingImagePath}
          alt="meetingImg"
          layout="fill" // div를 채우도록 설정
          objectFit="cover" // 비율을 유지하면서 div 크기에 맞게 이미지 조정
        />
      </div>

      <div className="flex w-full flex-col gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-[#00000080] p-1 text-center text-sm text-white">
            {category}
          </span>
          <div className="text-sm font-medium">
            <span className="font-semibold text-green-700">{memberCount}</span>
            명 참여 중
          </div>
        </div>
        <div className="flex items-center justify-between">
          {' '}
          <div className="my-1 text-lg font-semibold">{meetingName}</div>
          <div>{renderButton()}</div>
        </div>

        {/* <div className="text-sm font-medium text-[#A4A4A4]">{description}</div> */}
      </div>
    </div>
  );
};

export default MeetingCard;
