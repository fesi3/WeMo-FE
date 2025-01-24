import GNBHomeIcon from '@/assets/icons/GNB_home.svg';
import GNBReviewIcon from '@/assets/icons/GNB_review.svg';
import GNBProfileIcon from '@/assets/icons/GNB_profile.svg';

export const menuItems = [
  { name: '홈', path: '/plans', icon: GNBHomeIcon },
  {
    name: '모든 리뷰',
    path: '/all-reviews',
    icon: GNBReviewIcon,
  },
  {
    name: '모임 찾기',
    path: '/search-meetings',
    icon: GNBProfileIcon,
  },
];
