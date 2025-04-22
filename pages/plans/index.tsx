import { Home } from '@/pages/app/plans';
import type { GetServerSideProps } from 'next';
import { ssrInstance } from '@/shared/utils/axiosSsr';
import { PlanDataWithCategory, PlanListResponse } from '@/shared/types/plans';

interface HomeProps {
  initialPlans: PlanDataWithCategory[];
  initialCursor: number | null;
}

export default function HomePage(props: HomeProps) {
  return (
    <Home
      initialPlans={props.initialPlans}
      initialCursor={props.initialCursor}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookie = req.headers.cookie || '';
    const isLoggedIn = !!cookie.includes('accessToken');

    const res = await ssrInstance(cookie).get<PlanListResponse>(
      `/api/plans?size=10&sort=default`,
      {
        headers: isLoggedIn ? { Cookie: cookie } : {},
        withCredentials: isLoggedIn,
      },
    );

    const data = res.data;
    const initialPlans: PlanDataWithCategory[] = data.data.planList.map(
      (item) => ({ ...item }),
    );
    const nextCursor = data.data.nextCursor;
    return {
      props: {
        initialPlans,
        initialCursor: nextCursor !== undefined ? nextCursor : null,
      },
    };
  } catch (error) {
    console.error('초기 데이터 로딩 실패:', error);
    return {
      props: {
        initialPlans: [],
      },
    };
  }
};
