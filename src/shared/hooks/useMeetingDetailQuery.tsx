import { fetchMeetingDetail } from '@/shared/api/meeting';
import { QUERY_KEY } from '@/shared/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingDetailQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEY.meetingDetail(id),
    queryFn: () => fetchMeetingDetail(id),
    enabled: typeof id === 'number',
  });
}
