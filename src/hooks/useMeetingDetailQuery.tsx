import { fetchMeetingDetail } from '@/api/meeting';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingDetailQuery(id: number | null) {
  const queryKey = 'meetingDetail';

  return useQuery({
    queryKey: queryKey.meetingDetail(id),
    queryFn: () => fetchMeetingDetail(id),
    enabled: typeof id === 'number',
  });
}
