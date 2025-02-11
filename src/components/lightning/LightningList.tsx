import { useState } from 'react';
import { LightningMeetup } from '@/types/lightningType';
import axiosInstance from '@/api/axiosInstance';

interface LightningListProps {
  meetups: LightningMeetup[];
}

const LightningList = ({ meetups }: LightningListProps) => {
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
    <div className="mx-auto h-[400px] w-full max-w-[1200px] overflow-y-auto rounded-b-xl bg-white p-4">
      {meetups.map((meetup) => {
        const isParticipated = participatedMeetups.includes(meetup.lightningId);
        return (
          <div
            key={meetup.lightningId}
            className="mb-3 flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm"
          >
            <span className="self-start rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
              {meetup.lightningType}
            </span>
            <h3 className="text-lg font-bold text-gray-900">
              {meetup.lightningName}
            </h3>
            <p className="text-sm text-gray-600">
              {meetup.lightningTime}에 같이 하실 분 구해요.
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span>{meetup.address}</span>
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
            <button
              onClick={() => handleParticipation(meetup.lightningId)}
              disabled={isParticipated}
              className={`mt-2 w-full rounded-lg px-4 py-2 ${
                isParticipated
                  ? 'cursor-not-allowed bg-gray-400 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isParticipated ? '참여 완료' : '참여하기'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LightningList;
