import Link from 'next/link';
import { useRouter } from 'next/router';
import HomeIcon from '@/assets/icons/GNB_home.svg';
import AllReviewsIcon from '@/assets/icons/GNB_review.svg';
import Eye from '@/assets/icons/eye.svg';
import Profile from '@/assets/icons/GNB_profile.svg';
import { twMerge } from 'tailwind-merge';

interface GNBItemProps {
  name: string;
  path: string;
  isHeader?: boolean;
}

function GNBItem({ name, path, isHeader = false }: GNBItemProps) {
  const router = useRouter();
  const icon = () => {
    if (name === '홈') {
      return <HomeIcon />;
    }
    if (name === '모든 리뷰') {
      return <AllReviewsIcon />;
    }
    if (name === '모임 찾기') {
      return <Eye />;
    }
    if (name === '로그인' || name === '마이페이지') {
      return <Profile />;
    }
  };
  return (
    <Link href={path}>
      <li
        className={twMerge(
          router.pathname === path ? 'font-bold text-black' : 'text-gray-400',
          isHeader ? 'text-base' : 'text-xs',
          'flex cursor-pointer flex-col items-center transition-colors hover:text-black',
        )}
      >
        {isHeader ? '' : icon()}
        <span>{name}</span>
      </li>
    </Link>
  );
}

export default GNBItem;
