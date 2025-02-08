import { LightningMeetup } from '@/types/lightningType';

interface LightningListProps {
  meetups: LightningMeetup[];
}

const LightningList = ({ meetups }: LightningListProps) => {
  return (
    <div className="h-[400px] overflow-y-auto border-t border-gray-300 p-4">
      {meetups.map((meetup) => (
        <div
          key={meetup.lightningId}
          className="mb-3 rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
        >
          {/* 카테고리 뱃지 */}
          <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">
            {meetup.lightningType}
          </span>

          {/* 모임 제목 */}
          <h3 className="mt-2 text-lg font-bold">{meetup.lightningName}</h3>

          {/* 설명 */}
          <p className="mt-1 text-sm text-gray-600">
            {meetup.lightningTime}에 같이 하실 분 구해요.
          </p>

          {/* 위치 및 시간 */}
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>{meetup.address}</span>
            <span className="font-semibold">
              {new Date(meetup.lightningDate).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LightningList;
