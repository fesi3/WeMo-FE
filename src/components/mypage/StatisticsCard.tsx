import { UserData } from '@/types/mypageType';

interface UserProps {
  user: UserData; // 부모에서 null 처리로 변경
}

const StatisticsCard = ({ user }: UserProps) => {
  const { joinedPlanCount, likedPlanCount, writtenReviewCount } = user;

  const statistics = [
    { text: '나의 일정', value: joinedPlanCount },
    { text: '나의 모임', value: likedPlanCount },
    { text: '작성 리뷰', value: writtenReviewCount, hasNotification: true },
  ];

  return (
    <div>
      {/* 하단 통계 부분 */}
      <div className="flex items-center justify-center gap-2">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="border-rgba(0,0,0,0.01) relative flex h-[76px] w-[107px] flex-col items-start rounded-md border p-3"
          >
            <p className="text-sm text-gray-500">{stat.text}</p>
            {stat.hasNotification && (
              <span className="absolute right-[15px] top-[6px] h-1.5 w-1.5 rounded-full bg-red-500"></span>
            )}
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
