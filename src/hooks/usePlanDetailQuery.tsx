import { fetchPlanDetail } from '@/api/plan';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function usePlanDetailQuery() {
  const router = useRouter();
  const queryKey = 'planDetail';
  const { id } = router.query;
  const idNum = parseInt(id as string);
  return useQuery({
    queryKey: [queryKey, idNum],
    queryFn: () => fetchPlanDetail(idNum),
    enabled: !!idNum,
  });
}
