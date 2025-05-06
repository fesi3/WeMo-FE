import { PlanListResponse } from '@/shared/types/plans';

export interface planInfiniteQueryResponseType {
  pageParam: number[];
  pages: PlanListResponse[];
}
