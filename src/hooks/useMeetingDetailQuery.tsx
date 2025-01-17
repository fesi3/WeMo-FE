import { fetchMeetingDetail } from '@/api/meeting';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function useMeetingDetailQuery() {
  const router = useRouter();
  const queryKey = 'meetingDetail';
  const { id } = router.query;
  const idNum = parseInt(id as string);
  return useQuery({
    queryKey: [queryKey, idNum],
    queryFn: () => fetchMeetingDetail(idNum),
    enabled: !!idNum,
  });
}
