import { useQuery } from '@tanstack/react-query';
import { fetchLightningMeetups } from '@/api/fetchMeetups';
import { LightningMeetup } from '@/types/lightningType';

interface Filters {
  type: number | null; // 모임 유형 (1: 밥약, 2: 운동, 3: 카풀)
  time: number | null; // 모임 시간 (1: 출근 전, 2: 점심, 3: 퇴근 후)
}

// 번개팟 목록을 가져오는 React Query Hook
export const useLightningMeetups = (
  lat: number,
  lng: number,
  size: number,
  initialData: LightningMeetup[], // SSR 초기 데이터
  filters?: Filters, // 필터 적용 가능
) => {
  return useQuery<LightningMeetup[]>({
    queryKey: ['lightningMeetups', lat, lng, size, filters],
    queryFn: () =>
      fetchLightningMeetups(lat, lng, size, filters?.type, filters?.time),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
    initialData, // SSR에서 받은 초기 데이터 활용
  });
};
