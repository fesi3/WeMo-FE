import { useEffect, useRef, useState } from 'react';
import useLightningMap from '@/hooks/useLightningMap';

interface LightningMapProps {
  initialMeetups: {
    lightningId: number;
    lightningName: string;
    latitude: number;
    longitude: number;
  }[];
}

const INITIAL_COORDINATE = { lat: 37.5664056, lng: 126.9778222 };

const LightningMap = ({ initialMeetups }: LightningMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { address, fetchMeetups } = useLightningMap();
  const [mapCenter, setMapCenter] = useState(INITIAL_COORDINATE);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  //   const [meetups, setMeetups] = useState(initialMeetups);
  const [, setSelectedMeetup] = useState<string | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const newMap = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
      level: 5,
    });

    setMap(newMap);

    window.kakao.maps.event.addListener(newMap, 'dragend', () => {
      const center = newMap.getCenter();
      setMapCenter({ lat: center.getLat(), lng: center.getLng() });
    });

    // 초기 마커 표시
    initialMeetups.forEach((meetup) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          meetup.latitude,
          meetup.longitude,
        ),
        map: newMap,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedMeetup(meetup.lightningName);
      });
    });
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (data) => {
        const lat = data.coords.latitude;
        const lng = data.coords.longitude;
        setMapCenter({ lat, lng });
        map?.setCenter(new window.kakao.maps.LatLng(lat, lng));
        fetchMeetups(lat, lng);
      });
    } else {
      alert('위치 정보를 가져올 수 없습니다.');
    }
  };

  return (
    <div>
      <p>현재 선택된 위치: {address}</p>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={getCurrentLocation}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          내 위치 가져오기
        </button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />

      <p>{/* 내 위치 센터 위치: {coordinate.lat} {coordinate.lng} */}</p>
      <p>
        <button
          onClick={() => fetchMeetups(mapCenter.lat, mapCenter.lng)}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          여기에서 모임 찾기
        </button>
      </p>
    </div>
  );
};

export default LightningMap;
