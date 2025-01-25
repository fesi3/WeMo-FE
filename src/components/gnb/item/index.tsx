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
    const iconClass = twMerge(
      router.pathname === path ? 'stroke-black' : 'stroke-[#BEBEBE]',
      'group-hover:stroke-black',
    );
    switch (name) {
      case '홈':
        return <HomeIcon className={iconClass} />;
      case '모든 리뷰':
        return <AllReviewsIcon className={iconClass} />;
      case '모임 찾기':
        return <Eye className={iconClass} />;
      case '로그인':
      case '마이페이지':
        return <Profile className={iconClass} />;
      default:
        return null;
    }
  }, [name]);

  return (
    <Link href={path}>
      <li
        className={twMerge(
          router.pathname === path ? 'font-bold text-black' : 'text-[#BEBEBE]',
          isHeader ? 'text-base' : 'text-xs',
          'group flex cursor-pointer flex-col items-center hover:text-black',
        )}
      >
        {isHeader ? '' : icon}
        <span>{name}</span>
      </li>
    </Link>
  );
}

export default GNBItem;
