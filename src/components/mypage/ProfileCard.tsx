import { UserData } from '@/pages/user/[username]';
import Image from 'next/image';

interface UserProps {
  user: UserData | null; // planData의 타입을 PlanData로 변경
}

const ProfileCard = ({ user }: UserProps) => {
  if (!user) {
    return <p>로딩 중</p>;
  }
  const {
    nickname,
    profileImagePath,
    companyName,
    joinedPlanCount,
    likedPlanCount,
    writtenReviewCount,
  } = user;

  const statistics = [
    { text: '나의 일정', value: joinedPlanCount },
    { text: '나의 모임', value: likedPlanCount },
    { text: '작성 리뷰', value: writtenReviewCount, hasNotification: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* 상단 부분 */}
      <div className="flex items-center justify-center gap-3 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <Image src={profileImagePath} alt="profile" width={30} height={30} />
        </div>
        <div className="flex-1 text-start">
          <p className="text-base font-semibold leading-[24px]">{nickname}</p>
          <p className="text-xs text-gray-500">{companyName}</p>
        </div>
        <button className="self-end text-xs text-[#808080]">
          프로필 편집 &gt;
        </button>
      </div>

      {/* 하단 통계 부분 */}

      <div className="flex items-center gap-2">
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

export default ProfileCard;
