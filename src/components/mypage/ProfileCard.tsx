import Image, { StaticImageData } from 'next/image';
export interface User {
  nickname: string;
  companyName: string;
  profileImagePath: StaticImageData;
  myPlan: number;
  myMeeting: number;
  myReview: number;
}

export default function ProfileCard({ user }: { user: User | null }) {
  if (!user) {
    return <p>로딩 중</p>;
  }

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex items-center justify-center gap-3 py-3.5">
        {' '}
        {/* px-4  모바일에서만 쓰이면 padding 요소 안에 넣기 */}
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
          {'프로필 편집 >'}
        </button>
      </div>
      <div className="flex items-center gap-2">
        {' '}
        {/* px-4 pb-7 */}
        <div className="border-rgba(0,0,0,0.01) flex h-[76px] w-[107px] flex-col items-start rounded-md border p-3">
          <p className="text-sm text-gray-500">{'나의 일정'}</p>
          <p className="text-xl font-semibold">{user.myPlan}</p>
        </div>
        <div className="border-rgba(0,0,0,0.01) flex h-[76px] w-[107px] flex-col items-start rounded-md border p-3">
          <p className="text-sm text-gray-500">{'나의 모임'}</p>
          <p className="text-xl font-semibold">{user.myMeeting}</p>
        </div>
        <div className="border-rgba(0,0,0,0.01) relative flex h-[76px] w-[107px] flex-col items-start rounded-md border p-3">
          <p className="text-sm text-gray-500">{'작성 리뷰'}</p>
          <span className="absolute right-[15px] top-[6px] h-1.5 w-1.5 rounded-full bg-red-500"></span>
          <p className="text-xl font-semibold">{user.myReview}</p>
        </div>
      </div>
    </div>
  );
}
