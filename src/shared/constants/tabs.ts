import { PlanTabTypes, PlanSubTabTypes } from '../types/tabs';

export const tabs: PlanTabTypes[] = ['달램핏', '워케이션'];
export const subTabs: PlanSubTabTypes[] = [
  '전체',
  '마인드풀니스',
  '오피스 스트레칭',
];

export const UNDERLINE_OFFSET = 120;

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
