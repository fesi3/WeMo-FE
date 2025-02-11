import { useEffect, useRef, useState } from 'react';
import { useLightningMeetups } from '@/hooks/useLightningMeetups';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { LightningMeetup } from '@/types/lightningType';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import useKakaoLoader from '@/hooks/useKakaoLoader';

interface LightningMapProps {
  initialMeetups: LightningMeetup[];
  filters: { type: number | null; time: number | null };
  mapCenter: { lat: number; lng: number };
  setMapCenter: (center: { lat: number; lng: number }) => void;
  refetchMeetups: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<LightningMeetup[], Error>>;
}

const LightningMap = ({
  initialMeetups,
  filters,
  mapCenter,
  setMapCenter,
}: LightningMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const [, setSelectedMeetup] = useState<string | null>(null);

  // ✅ 카카오맵 API 로딩 상태 체크
  const [loading, error] = useKakaoLoader();

  // ✅ React Query를 사용한 모임 데이터 관리
  const { data: meetups, refetch } = useLightningMeetups(
    mapCenter.lat,
    mapCenter.lng,
    10,
    initialMeetups, // SSR에서 받은 초기 데이터
    filters, // 필터 추가
  );

  useEffect(() => {
    if (loading) return; // 🔹 카카오맵 로딩 중이면 실행 안함
    if (error) {
      console.error('❌ 카카오맵 로드 실패:', error);
      return;
    }

    if (!window.kakao || !window.kakao.maps || !mapRef.current) {
      console.error('❌ 카카오맵 API가 로드되지 않았습니다.');
      return;
    }

    console.log('✅ 지도 초기화 시작');

    // ✅ 지도 객체 생성 (최초 1회만 실행)
    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
      level: 5,
    });

    // 지도 이동 시 중심 좌표 업데이트
    window.kakao.maps.event.addListener(mapInstance.current, 'dragend', () => {
      const center = mapInstance.current!.getCenter();
      setMapCenter({ lat: center.getLat(), lng: center.getLng() });
    });
  }, [loading, error]);

  // ✅ 마커 업데이트 (지도 변경될 때마다 실행)
  useEffect(() => {
    if (!mapInstance.current || !meetups) return;

    console.log('🟢 마커 업데이트', meetups);

    // 기존 마커 초기화
    const currentMarkers: kakao.maps.Marker[] = [];

    meetups.forEach((meetup) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          meetup.latitude,
          meetup.longitude,
        ),
        map: mapInstance.current!,
      });

      // 마커 클릭 이벤트 추가
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedMeetup(meetup.lightningName);
        console.log(`📌 선택된 모임: ${meetup.lightningName}`);
      });

      currentMarkers.push(marker);
    });

    // 컴포넌트가 언마운트될 때 마커 제거
    return () => {
      currentMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [meetups]);

  // ✅ 현재 위치 가져오기
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('❌ 위치 정보를 가져올 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (data) => {
      const lat = data.coords.latitude;
      const lng = data.coords.longitude;

      setMapCenter({ lat, lng });

      if (mapInstance.current) {
        mapInstance.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
      }

      refetch(); // 🔄 데이터 다시 가져오기
    });
  };

  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* ✅ 카카오맵 로드 중일 때 로딩 메시지 표시 */}
      {loading ? (
        <div className="flex h-[450px] w-full max-w-[1200px] items-center justify-center text-gray-500">
          🚀 지도 로딩 중...
        </div>
      ) : (
        <div className="relative h-[450px] w-full max-w-[1200px] overflow-hidden rounded-xl shadow-md">
          <div ref={mapRef} className="h-full w-full" />

          {/* 📌 버튼 컨테이너 (지도 위에 오버레이) */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <div className="group relative">
              <button
                onClick={getCurrentLocation}
                className="rounded-full bg-[#00B6AD] px-4 py-2 shadow-md"
              >
                <PaperAirplaneIcon
                  className="h-6 w-6 text-white hover:text-gray-800"
                  aria-hidden="true"
                />
              </button>
              <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md group-hover:block">
                현위치로
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="rounded-full bg-[#00B6AD] px-4 py-2 text-white shadow-md hover:text-gray-800"
            >
              현 지도에서 검색
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightningMap;
