import { fetchMeetingDetail } from '@/api/meeting';
import { queryKey } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export default function useMeetingDetailQuery(id: number | null) {
  return useQuery({
    queryKey: [queryKey.meetingDetail, id],
    queryFn: () => {
      return fetchMeetingDetail(id as number);
    },
    enabled: id !== null,
  });
}
