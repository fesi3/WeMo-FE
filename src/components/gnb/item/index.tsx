import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import HomeIcon from '@/assets/icons/GNB_home.svg';
import AllReviewsIcon from '@/assets/icons/GNB_review.svg';
import EyeIcon from '@/assets/icons/eye.svg';
import ThunderIcon from '@/assets/icons/GNB_thunder.svg';
import ProfileIcon from '@/assets/icons/GNB_profile.svg';
import SearchIcon from '@/assets/icons/GNB_search.svg';
import BellIcon from '@/assets/icons/GNB_bell.svg';
import LinkWrapper from '../wrapper';

interface GNBItemProps {
  name: string;
  path?: string;
  isHeader?: boolean;
  isRouteDisabled?: boolean;
}

function GNBItem({
  name,
  path = '/',
  isHeader = false,
  isRouteDisabled = false,
}: GNBItemProps) {
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
        return <EyeIcon className={iconClass} />;
      case '번개팟':
        return <ThunderIcon className={iconClass} />;
      case '알림':
        return <BellIcon className={iconClass} />;
      case '검색':
        return <SearchIcon className={iconClass} />;
      case '로그인':
      case '마이페이지':
        return <ProfileIcon className={iconClass} />;
      default:
        return null;
    }
  }, [name]);

  return (
    <LinkWrapper isDisabled={isRouteDisabled} path={path}>
      <li
        className={twMerge(
          router.pathname === path ? 'font-bold text-black' : 'text-[#BEBEBE]',
          isHeader ? 'text-base' : 'text-xs',
          'group flex cursor-pointer flex-col items-center justify-center hover:text-black',
        )}
      >
        {isHeader ? '' : icon}
        {isRouteDisabled && icon}
        <span>{isRouteDisabled ? '' : name}</span>
      </li>
    </LinkWrapper>
  );
}

export default GNBItem;
