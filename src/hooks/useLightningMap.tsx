import { useEffect, useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { coordinateToAddress } from '@/utils/coordinateToAddress';
import useMeetupFetcher from '@/hooks/useMeetingFetcher';

// 초기 로딩 시 서울 시청 기준 번개팟 리스트 가져오기
// 내 위치 가져오기 버튼 클릭 시 현재 위치 받아와 업데이트
// 현재 위치 기준으로 백엔드 API에 요청하여 모임 데이터 가져오기
// 반환값으로 coordinate, address, meetups 제공 → 컴포넌트에서 쉽게 활용 가능

// 초기 좌표 (서울 시청)
const INITIAL_COORDINATE = { lat: 37.6, lng: 127.06 };

export default function useLightningMap() {
  // 현재 지도 중심 좌표
  const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE);
  // 현재 선택된 위치의 주소
  const [address, setAddress] = useState('');
  // 카카오맵 API 로딩 여부
  const [isMapLoading] = useKakaoLoader();
  // API에서 가져올 번개팟 모임 리스트
  const { meetups, fetchMeetups, isLoading, error } = useMeetupFetcher(
    coordinate.lat,
    coordinate.lng,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  //좌표를 받아 주소로 변환하는 함수
  const updateAddress = async (lat: number, lng: number) => {
    try {
      const updatedLocation = await coordinateToAddress(lat, lng);
      setAddress(updatedLocation);
    } catch (error) {
      console.error('주소 변환 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!isMapLoading) {
      console.log('맵 로딩 완료! 초기 데이터 패칭 시작...');
      fetchMeetups(coordinate.lat, coordinate.lng);
      setIsInitialLoading(false); // 초기 로딩 종료
    }
  }, [isMapLoading]);

  return {
    coordinate,
    setCoordinate,
    address,
    meetups,
    fetchMeetups,
    updateAddress,
    isLoading,
    isInitialLoading,
    error,
  };
}
