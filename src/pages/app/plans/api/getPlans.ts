import { PlanListResponse } from '@/shared/types/plans';
import csrInstance from '@/shared/utils/axios';
import { ssrInstance } from '@/shared/utils/axiosSsr';
import { API_PATHS } from '@/shared/constants/apiPath';

export interface getPlansProps {
  cookie?: string;
  isLoggedIn?: boolean;
  sortParam?: string;
  categoryParam?: number;
  pageParam?: number;
}

async function getPlans({
  cookie = '',
  isLoggedIn = false,
  sortParam = '',
  categoryParam = 1,
  pageParam: cursorParam = 0,
}: getPlansProps) {
  const instance =
    typeof window === 'undefined' ? ssrInstance(cookie) : csrInstance;

  const res = await instance.get<PlanListResponse>(API_PATHS.PLAN.GET_ALL, {
    headers: isLoggedIn ? { Cookie: cookie } : {},
    withCredentials: isLoggedIn,
    params: {
      size: 10,
      ...(cursorParam && { cursor: cursorParam }),
      ...(categoryParam && { categoryId: categoryParam }),
      ...(sortParam && { sort: sortParam }),
    },
  });
  console.log(res, '--res---');

  const data = res.data;

  return data;
}

export default getPlans;
