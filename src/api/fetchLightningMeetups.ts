import axiosInstance from '@/api/axiosInstance';
import { LightningMeetup } from '@/types/lightningType';

// 🔹 번개팟 데이터를 가져오는 API 함수 (다른 곳에서도 재사용 가능)
export const fetchLightningMeetups = async (
  lat: number,
  lng: number,
): Promise<LightningMeetup[]> => {
  try {
    console.log(`번개팟 데이터 요청: lat=${lat}, lng=${lng}`);

    const { data } = await axiosInstance.get(
      `/api/lightnings?latitude=${lat}&longitude=${lng}&radius=0.5&size=10`,
    );

    console.log('번개팟 응답 데이터:', data);
    return data.data.lightningList || [];
  } catch (error) {
    console.error('번개팟 데이터 요청 실패:', error);
    return [];
  }
};
