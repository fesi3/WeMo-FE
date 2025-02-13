import { UserData } from '@/types/mypageType';
import Link from 'next/link';

interface UserProps {
  user: UserData; // 부모에서 null 처리로 변경
}

const StatisticsCard = ({ user }: UserProps) => {
  const { joinedPlanCount, likedPlanCount, writtenReviewCount } = user;
  const statistics = [
    { text: '이용 예정', value: joinedPlanCount, href: '/user/plan' },
    { text: '찜한 일정', value: likedPlanCount, href: '/saved-gathering' },
    { text: '작성 리뷰', value: writtenReviewCount, href: '/user/review' },
  ];

  return (
    <div>
      {/* 하단 통계 부분 */}
      <div className="flex items-center justify-center gap-2">
        {statistics.map((stat, index) => (
          <Link href={stat.href}>
            <div
              key={index}
              className="border-rgba(0,0,0,0.01) relative flex h-[76px] w-[107px] flex-col items-start rounded-md border p-3"
            >
              <p className="text-sm text-gray-500">{stat.text}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCard;
