import { useEffect, useState } from 'react';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { coordinateToAddress } from '@/utils/coordinateToAddress';

// 초기 로딩 시 서울 시청 기준 번개팟 리스트 가져오기
// 내 위치 가져오기 버튼 클릭 시 현재 위치 받아와 업데이트
// 현재 위치 기준으로 백엔드 API에 요청하여 모임 데이터 가져오기
// 반환값으로 coordinate, address, meetups 제공 → 컴포넌트에서 쉽게 활용 가능

// 초기 좌표 (서울 시청)
const INITIAL_COORDINATE = { lat: 37.5664056, lng: 126.9778222 };

export default function useLightningMap() {
  // 현재 지도 중심 좌표
  const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE);
  // 현재 선택된 위치의 주소
  const [address, setAddress] = useState('');
  // 카카오맵 API 로딩 여부
  const [isMapLoading] = useKakaoLoader();
  // API에서 가져올 번개팟 모임 리스트
  const [meetups, setMeetups] = useState<
    { id: number; lat: number; lng: number; name: string }[]
  >([]);

  // 내 위치 가져오기
  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (data) => {
        //사용자의 현재 (위도, 경도)를 가져오는 브라우저 내장 API
        const lat = data.coords.latitude;
        const lng = data.coords.longitude;
        setCoordinate({ lat, lng });

        // 좌표를 주소로 변환
        const updatedLocation = await coordinateToAddress(lat, lng);
        setAddress(updatedLocation);

        // 내 위치 기준으로 번개팟 모임 가져오기
        fetchMeetups(lat, lng);
      });
    }
  };

  // 현재 위치 기반으로 번개팟 모임 가져오기
  const fetchMeetups = async (lat: number, lng: number) => {
    try {
      //   const response = await fetch(
      //     `/api/light?lat=${lat}&lng=${lng}`,
      //   );
      //   const data = await response.json();
      //   setMeetups(data);
      const dummyMeetups = [
        { id: 1, lat: lat + 0.001, lng: lng + 0.001, name: '번개팟 1' },
        { id: 2, lat: lat - 0.002, lng: lng - 0.002, name: '번개팟 2' },
        { id: 3, lat: lat + 0.003, lng: lng - 0.003, name: '번개팟 3' },
      ];

      setMeetups(dummyMeetups); // 상태 업데이트
    } catch (error) {
      console.error('모임 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // 초기 로딩 시 기본 좌표(서울 시청) 기준으로 번개팟 가져오기
    if (!isMapLoading) {
      fetchMeetups(INITIAL_COORDINATE.lat, INITIAL_COORDINATE.lng);
    }
  }, [isMapLoading]);

  return { coordinate, address, getCurrentLocation, meetups };
}
