import { fetchPlanDetail } from '@/features/update-plan/api/plan';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function usePlanDetailQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEY.planDetail(id),
    queryFn: () => fetchPlanDetail(id),
    enabled: typeof id === 'number',
  });
}
