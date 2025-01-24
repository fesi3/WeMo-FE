import Link from 'next/link';
import { useRouter } from 'next/router';
import HomeIcon from '@/assets/icons/GNB_home.svg';
import AllReviewsIcon from '@/assets/icons/GNB_review.svg';
import Eye from '@/assets/icons/eye.svg';
import Profile from '@/assets/icons/GNB_profile.svg';
import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';

interface GNBItemProps {
  name: string;
  path: string;
  isHeader?: boolean;
}

function GNBItem({ name, path, isHeader = false }: GNBItemProps) {
  const router = useRouter();
  const icon = useMemo(() => {
    switch (name) {
      case '홈':
        return <HomeIcon />;
      case '모든 리뷰':
        return <AllReviewsIcon />;
      case '모임 찾기':
        return <Eye />;
      case '로그인':
      case '마이페이지':
        return <Profile />;
      default:
        return null;
    }
  }, [name]);

  return (
    <Link href={path}>
      <li
        className={twMerge(
          router.pathname === path ? 'font-bold text-black' : 'text-gray-400',
          isHeader ? 'text-base' : 'text-xs',
          'flex cursor-pointer flex-col items-center transition-colors hover:text-black',
        )}
      >
        {isHeader ? '' : icon}
        <span>{name}</span>
      </li>
    </Link>
  );
}

export default GNBItem;
