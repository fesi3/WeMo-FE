import Image from 'next/image';
import Button from '../shared/Button';
import { MeetingData } from '@/pages/user/[username]/meeting';
import meetingImg from '@/assets/images/Rectangle 6188.png';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

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

  const imageSrc = meetingImagePath || meetingImg; // 서버에서 받아온 데이터가 없을 시 기본 이미지로 대체
  const router = useRouter();

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
  const handleDeleteMeeting = async (meetingId: number) => {
    console.log(`${meetingId}번 모임을 삭제합니다.`);
    // 삭제 로직 추가 /api/meetings/{meetingId}
    try {
      console.log(`${meetingId}번 모임을 삭제합니다.`);

      // 삭제 API 요청
      const response = await axios.delete(
        `${BASE_URL}/api/meetings/${meetingId}`,
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        alert(`${meetingId}번 모임이 탈퇴되었습니다.`);
        // 삭제 후 모임 리스트에서 해당 모임을 제거
        window.location.reload(); // 페이지 새로 고침
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('서버로부터 받은 에러 데이터', error.response.data);
        if (error.response.status === 400) {
          alert('로그인이 필요합니다!.');
          router.push('/login');
          return;
        } else {
          alert('[error] 서버와 통신 오류 발생.');
        }
      } else {
        //axios 에러가 아닌 다른 예외가 발생한 경우
        alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  // "탈퇴" 버튼 클릭 시 처리 함수 - api 아직 안 나옴옴
  const handleLeaveMeeting = async (meetingId: number) => {
    // 탈퇴 로직 추가/api/meetings/{meetingId}
    console.log(`${meetingId}번 모임을 탈퇴합니다.`);
    alert('모임 탈퇴하기는 아직 api 구현 중입니다!');
    // try {
    //   console.log(`${meetingId}번 모임을 탈퇴합니다.`);

    //   // 삭제 API 요청
    //   const response = await axios.delete(
    //     `${BASE_URL}/api/meetings/${meetingId}`,
    //     {
    //       withCredentials: true,
    //     },
    //   );

    //   if (response.status === 200) {
    //     alert(`${meetingId}번 모임이 탈퇴되었습니다.`);
    //     // 탈퇴 후 로직
    //     window.location.reload(); // 페이지 새로 고침
    //   }
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error) && error.response) {
    //     console.log('서버로부터 받은 에러 데이터', error.response.data);
    //     if (error.response.status === 400) {
    //       alert('로그인이 필요합니다!.');
    //       router.push('/login');
    //       return;
    //     } else {
    //       alert('[error] 서버와 통신 오류 발생.');
    //     }
    //   } else {
    //     //axios 에러가 아닌 다른 예외가 발생한 경우
    //     alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
    //   }
    // }
  };

  return (
    <div className="flex w-[320px] flex-col items-center rounded-md bg-gray-100">
      <div
        onClick={() => {
          router.push(`/meetings/1`);
        }}
        className="relative mb-1 h-[170px] w-full overflow-hidden"
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
            onClick={() => {
              router.push(`/meetings/1`);
            }}
            className="my-1 text-lg font-semibold"
          >
            {meetingName}
          </div>
          <div>{renderButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
