import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

export default function useMeetingFetcher(
  latitude: number,
  longitude: number,
  apiEndpoint: string,
) {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetups = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await axiosInstance(
        `${apiEndpoint}?latitude=${lat}&longitude=${lng}&radius=0.1&size=10`,
      );

      console.log('데이터 패칭 완료:', data);

      setMeetups(data.data.lightningList || []);
    } catch (err) {
      console.error('데이터 패칭 오류:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetups(latitude, longitude);
  }, [latitude, longitude]);

  return { meetups, fetchMeetups, isLoading, error };
}
