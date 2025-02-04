import { useEffect, useRef, useState } from 'react';
import useLightningMap from '@/hooks/useLightningMap';

export default function LightningMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { coordinate, address, getCurrentLocation, meetups } =
    useLightningMap();

  const [mapCenter, setMapCenter] = useState(coordinate);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng),
        level: 5,
      });

      // 번개팟 모임 데이터를 마커로 표시
      meetups.forEach((meetup) => {
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(meetup.lat, meetup.lng),
          map: map,
        });
      });

      //현위치 지도에 마커롶 표시
      // new window.kakao.maps.Marker({
      //   position: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng),
      //   map: map,
      // });

      // 지도 중심 좌표 업데이트
      window.kakao.maps.event.addListener(map, 'center_changed', function () {
        const center = map.getCenter();
        setMapCenter({ lat: center.getLat(), lng: center.getLng() });
      });
    }
  }, [coordinate, meetups]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />

      <p>현재 선택된 위치: {address}</p>
      <p>
        현재 센터 위치: {mapCenter.lat} {mapCenter.lng}
      </p>

      <button
        onClick={getCurrentLocation}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        내 위치 가져오기
      </button>
    </div>
  );
}
