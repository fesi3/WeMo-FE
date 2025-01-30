import { fetchPlanDetail } from '@/api/plan';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function usePlanDetailQuery(id: number | null) {
  const router = useRouter();
  const queryKey = 'planDetail';

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => fetchPlanDetail(id as number),
    enabled: id !== null,
  });
}
