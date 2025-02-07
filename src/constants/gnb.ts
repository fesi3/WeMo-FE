import GNBHomeIcon from '@/assets/icons/GNB_home.svg';
import GNBReviewIcon from '@/assets/icons/GNB_review.svg';
import GNBThunderIcon from '@/assets/icons/GNB_thunder.svg';
import GNBProfileIcon from '@/assets/icons/GNB_profile.svg';

export const menuItems = [
  { name: '홈', key: 1, path: '/plans', icon: GNBHomeIcon },
  {
    name: '모든 리뷰',
    key: 2,
    path: '/all-reviews',
    icon: GNBReviewIcon,
  },
  {
    name: '번개팟',
    key: 3,
    path: '/bungae-pot',
    icon: GNBThunderIcon,
  },
  {
    name: '모임 찾기',
    key: 4,
    path: '/meetings',
    icon: GNBProfileIcon,
  },
];

export const hideGnbFooterRoutes = [
  '/signup',
  '/login',
  '/start',
  '/login/oauth2/callback/kakao',
  '/login/oauth2/callback/google',
  '/login/oauth2/callback/naver',
];

export const hideGnbHeaderRoutes = [
  '/login',
  '/start',
  '/login/oauth2/callback/kakao',
  '/login/oauth2/callback/google',
  '/login/oauth2/callback/naver',
];
