import { PlanListResponse } from '@/shared/types/plans';

export interface PlanInfiniteQueryResponseType {
  pageParam: number[];
  pages: PlanListResponse[];
}
