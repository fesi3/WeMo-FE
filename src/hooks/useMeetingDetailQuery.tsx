import { fetchMeetingDetail } from '@/api/meeting';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingDetailQuery(id: number | null) {
  const queryKey = 'meetingDetail';

  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => fetchMeetingDetail(id as number),
    enabled: id !== null,
  });
}
