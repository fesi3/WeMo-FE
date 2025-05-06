import { ssrInstance } from '@/shared/utils/axiosSsr';
import { PlanListResponse } from '@/shared/types/plans';

export interface getPlansSSRProps {
  cookie?: string;
  isLoggedIn: boolean;
  sortParam?: string;
  categoryParam?: number;
  cursorParam?: string;
}

async function getPlansSSR({
  cookie = '',
  isLoggedIn = false,
  sortParam = '',
  categoryParam = 1,
  cursorParam = '',
}: getPlansSSRProps) {
  const res = await ssrInstance(cookie).get<PlanListResponse>(
    `/api/plans?size=10&sort=${sortParam}&categoryId=${categoryParam}&cursor=${cursorParam}`,
    {
      headers: isLoggedIn ? { Cookie: cookie } : {},
      withCredentials: isLoggedIn,
    },
  );

  const data = res.data;

  return data;
}

export default getPlansSSR;
