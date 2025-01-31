import { fetchPlanDetail } from '@/api/plan';
import { queryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function usePlanDetailQuery(id: number) {
  return useQuery({
    queryKey: queryKey.planDetail(id),
    queryFn: () => fetchPlanDetail(id),
    enabled: typeof id === 'number',
  });
}
