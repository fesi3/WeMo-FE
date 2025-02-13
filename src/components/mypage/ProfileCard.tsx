import { UserData } from '@/types/mypageType';
import Image from 'next/image';
import Button from '@/components/shared/Button';
import profile_default from '@/assets/images/default_profile.png';

interface UserProps {
  user: UserData;
}

const ProfileCard = ({ user }: UserProps) => {
  const { nickname, profileImagePath, companyName } = user;
  console.log(profileImagePath); //나중에 바꾸기

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* 상단 부분 */}
      <div className="flex items-center justify-center gap-3 sm:flex-col">
        {/* 수정 버튼 */}
        <Button
          size={'small'}
          variant={'text'}
          className="order-3 self-end text-[#808080] sm:order-1"
          onClick={() => {
            alert('준비 중인 기능입니다!');
          }}
        >
          프로필 편집 &gt;
        </Button>
        <div className="relative order-1 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-200 sm:order-2 sm:h-[108px] sm:w-[108px] sm:p-3">
          <Image
            src={profile_default}
            alt="profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="order-2 flex flex-1 flex-col sm:order-3 sm:items-center sm:justify-center">
          <p className="text-base font-semibold leading-[24px]">{nickname}</p>
          <p className="text-xs text-gray-500">{companyName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
