import Image from 'next/image';
import meetingImg from '@/shared/assets/images/Rectangle 6188.png';
import { useRouter } from 'next/router';
import OwnerButton from './OwnerButton';
import { MeetingData } from '@/shared/types/mypageType';
import { useLeaveMeetingMutation } from '@/shared/hooks/mypage/mutation/useLeaveMutation';
import { useDeleteMeetingMutation } from '@/shared/hooks/mypage/mutation/useDeleteMutation';
import { useEffect } from 'react';

export interface MeetingProps {
  meetingData: MeetingData;
}

const MeetingCard = ({ meetingData }: MeetingProps) => {
  const {
    email,
    meetingId,
    meetingName,
    meetingImagePath,
    category,
    memberCount,
  } = meetingData;

  const imageSrc = meetingImagePath || meetingImg; // 서버에서 받아온 데이터가 없을 시 기본 이미지로 대체
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/meetings/${meetingId}`);
  }, [meetingId, router]);

  const leaveMeetingMutation = useLeaveMeetingMutation();
  const deleteMeetingMutation = useDeleteMeetingMutation();

  // "삭제" 버튼 클릭 시 처리 함수 (내가 만든 모임)
  const handleDeleteMeeting = (meetingId: number) => {
    console.log(`${meetingId}번 모임을 삭제합니다.`);
    const isConfirmed = window.confirm(
      '모임을 삭제하시겠습니까? 다시 복구할 수 없습니다!',
    );
    if (isConfirmed) {
      deleteMeetingMutation.mutate(meetingId);
    }
  };

  // "탈퇴" 버튼 클릭 시 처리 함수 (내가 참여한 모임)
  const handleLeaveMeeting = (meetingId: number) => {
    console.log(`${meetingId}번 모임을 탈퇴합니다.`);
    const isConfirmed = window.confirm('모임을 탈퇴하시겠습니까?');
    if (isConfirmed) {
      leaveMeetingMutation.mutate(meetingId);
    }
  };

  // 페이지 이동
  const handleDetailPage = () => {
    router.push(`/meetings/${meetingId}`);
  };

  return (
    <div className="flex w-[320px] flex-col items-center rounded-md bg-white shadow-lg sm:shadow-xl">
      <div
        onClick={handleDetailPage}
        className="relative mb-1 h-[170px] w-full cursor-pointer overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt="meetingImg"
          fill
          className="rounded-t-md object-cover"
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
          <div
            onClick={handleDetailPage}
            className="cursor my-1 text-lg font-semibold hover:underline"
          >
            {meetingName}
          </div>
          <div>
            {' '}
            <OwnerButton
              email={email}
              id={meetingId}
              onDelete={handleDeleteMeeting} //onLeave(id)
              onLeave={handleLeaveMeeting} //OwnerButton에서 버튼이 클릭되면 onLeave(id)가 호출됨.=> handleLeaveMeeting(id-meetingId)가 호출됨.
              type="meeting"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
