import Image, { StaticImageData } from 'next/image';
// 프로필 유저 정보
export interface User {
  nickname: string;
  companyName: string;
  profileImagePath: StaticImageData;
  myPlan: number;
  myMeeting: number;
  myReview: number;
}

const ProfileCard = ({ user }: { user: User | null }) => {
  if (!user) {
    return <p>로딩 중</p>;
  }

  const statistics = [
    { text: '나의 일정', value: user.myPlan },
    { text: '나의 모임', value: user.myMeeting },
    { text: '작성 리뷰', value: user.myReview, hasNotification: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* 상단 부분분 */}
      <div className="flex items-center justify-center gap-3 py-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <Image
            src={user.profileImagePath}
            alt="profile"
            width={30}
            height={30}
          />
        </div>
        <div className="flex-1 text-start">
          <p className="text-base font-semibold leading-[24px]">
            {user.nickname}
          </p>
          <p className="text-xs text-gray-500">{user.companyName}</p>
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
