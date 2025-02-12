import { useState } from 'react';
import { LightningMeetup } from '@/types/lightningType';
import axiosInstance from '@/utils/axios';

interface LightningListProps {
  meetups: LightningMeetup[];
  isFetching: boolean;
}

const LightningList = ({ meetups, isFetching }: LightningListProps) => {
  const [participatedMeetups, setParticipatedMeetups] = useState<number[]>([]);

  const handleParticipation = async (lightningId: number) => {
    try {
      await axiosInstance.post(`/api/lightnings/participation/${lightningId}`);
      alert('참여가 완료되었습니다!');
      setParticipatedMeetups((prev) => [...prev, lightningId]);
    } catch (error) {
      console.error('참여 실패:', error);
      alert('참여 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] overflow-y-auto rounded-b-xl bg-white p-4">
      {/*로딩 중일 때 표시되는 UI */}
      {isFetching ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary-10"></div>
          <p className="mt-2 text-sm">번개팟을 불러오는 중...</p>
        </div>
      ) : meetups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <p className="text-sm">현재 참여 가능한 번개팟이 없습니다.</p>
        </div>
      ) : (
        meetups.map((meetup) => {
          const isParticipated = participatedMeetups.includes(
            meetup.lightningId,
          );
          return (
            <div
              key={meetup.lightningId}
              className="mb-3 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm"
            >
              {/*카테고리 배지 */}
              <span className="self-start rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                {meetup.lightningType}
              </span>

              {/*모임 제목 */}
              <h3 className="text-lg font-bold text-gray-900">
                {meetup.lightningName}
              </h3>

              {/*모임 설명 */}
              <p className="text-sm text-gray-600">
                {meetup.lightningTime}에 같이 하실 분 구해요.
              </p>

              {/*위치 및 시간 정보 (줄바꿈 고려하여 flex 정렬) */}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <span className="truncate">{meetup.address}</span>
                <span className="font-semibold">
                  {new Date(meetup.lightningDate).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              {/*참여 인원 & 버튼 (한 줄 정렬) */}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  <strong className="text-gray-900">
                    {meetup.lightningParticipants}/{meetup.lightningCapacity}
                  </strong>{' '}
                  명 참여 예정
                </span>
                <button
                  onClick={() => handleParticipation(meetup.lightningId)}
                  disabled={isParticipated}
                  className={`rounded-lg px-4 py-1 text-sm ${
                    isParticipated
                      ? 'cursor-not-allowed bg-gray-400 text-white'
                      : 'bg-primary-10 text-white hover:bg-primary-40 active:bg-primary-10'
                  }`}
                >
                  {isParticipated ? '참여 완료' : '참여하기'}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LightningList;
