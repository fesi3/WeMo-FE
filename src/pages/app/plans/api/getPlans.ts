import { PlanListResponse } from '@/shared/types/plans';
import csrInstance from '@/shared/utils/axios';
import { ssrInstance } from '@/shared/utils/axiosSsr';

export interface getPlansProps {
  cookie?: string;
  isLoggedIn?: boolean;
  sortParam?: string;
  categoryParam?: number;
  cursorParam?: string;
}

async function getPlans({
  cookie = '',
  isLoggedIn = false,
  sortParam = '',
  categoryParam = 1,
  cursorParam = '',
}: getPlansProps) {
  const instance =
    typeof window === 'undefined' ? ssrInstance(cookie) : csrInstance;

  const res = await instance.get<PlanListResponse>(
    `/api/plans?size=10${sortParam ? `&sortParam=${sortParam}` : ''}${categoryParam ? `&categoryId=${categoryParam}` : ''}${cursorParam ? `&cursor=${cursorParam}` : ''}`,
    {
      headers: isLoggedIn ? { Cookie: cookie } : {},
      withCredentials: isLoggedIn,
    },
  );

  const data = res.data;

  return data;
}

export default getPlans;
