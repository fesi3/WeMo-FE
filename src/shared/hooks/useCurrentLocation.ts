import { useState } from 'react';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 가져올 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition((data) => {
      setLocation({
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      });
    });
  };

  return { location, getCurrentLocation };
};
