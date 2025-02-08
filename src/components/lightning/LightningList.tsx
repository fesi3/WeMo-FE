import { LightningMeetup } from '@/types/lightningType';

interface LightningListProps {
  meetups: LightningMeetup[];
}

const LightningList = ({ meetups }: LightningListProps) => {
  return (
    <div className="mx-auto h-[400px] w-full max-w-[1200px] overflow-y-auto rounded-b-xl border-t border-gray-200 bg-white p-4 shadow-md">
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
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span className="truncate">{meetup.address}</span>
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
