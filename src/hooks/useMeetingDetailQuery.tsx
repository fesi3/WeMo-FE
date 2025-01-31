import { fetchMeetingDetail } from '@/api/meeting';
import { queryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingDetailQuery(id: number) {
  return useQuery({
    queryKey: queryKey.meetingDetail(id),
    queryFn: () => fetchMeetingDetail(id),
    enabled: typeof id === 'number',
  });
}
