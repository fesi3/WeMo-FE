import { LightningMeetup } from '@/types/lightningType';
import axiosInstance from '@/api/axiosInstance';

interface LightningListProps {
  meetups: LightningMeetup[];
}

const LightningList = ({ meetups }: LightningListProps) => {
  const handleParticipation = async (lightningId: number) => {
    try {
      const response = await axiosInstance.post(
        `/api/lightnings/participation/${lightningId}`,
      );
      alert('참여가 완료되었습니다!');
      console.log('참여 성공:', response.data);
    } catch (error) {
      console.error('참여 실패:', error);
      alert('참여 요청 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="mx-auto h-[400px] w-full max-w-[1200px] overflow-y-auto rounded-b-xl bg-white p-4">
      {meetups.map((meetup) => (
        <div
          key={meetup.lightningId}
          className="mb-3 flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          {/* 카테고리 뱃지 */}
          <span className="self-start rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
            {meetup.lightningType}
          </span>

          {/* 모임 제목 */}
          <h3 className="text-lg font-bold text-gray-900">
            {meetup.lightningName}
          </h3>

          {/* 설명 */}
          <p className="text-sm text-gray-600">
            {meetup.lightningTime}에 같이 하실 분 구해요.
          </p>

          {/* 위치 및 시간 */}
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <div>
              <span className="truncate">{meetup.address}</span>
              <span className="ml-4 font-semibold">
                {new Date(meetup.lightningDate).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <div>
                <span className="font-semibold">
                  {meetup.lightningParticipants}/{meetup.lightningCapacity}
                </span>
                명 참여 예정
              </div>
            </div>
          </div>
          <button
            onClick={() => handleParticipation(meetup.lightningId)}
            className="mt-2 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            참여하기
          </button>
        </div>
      ))}
    </div>
  );
};

export default LightningList;
