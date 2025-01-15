import useKakaoLoader from '../hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

// 서울 시청 좌표
const INITIAL_POSITION = {
  lat: 37.5664056,
  lng: 126.9778222,
};

//서울 시청 주소
const INITIAL_LOCATION = '서울 중구 태평로1가 31';

export default function useKakaoMap() {
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    lng: number;
  }>(INITIAL_POSITION);
  const [location, setLocation] = useState(INITIAL_LOCATION);
  const [isMapLoading] = useKakaoLoader();

  const locationToPosition = (
    location: string,
  ): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(location, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = result[0];
          resolve({
            lat: parseFloat(coords.y), // ✅ 위도와 경도 순서 수정
            lng: parseFloat(coords.x),
          });
        } else {
          reject(new Error('주소를 좌표로 변환할 수 없습니다.'));
        }
      });
    });
  };

  const positionToLocation = (lat: number, lng: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0].address.address_name);
        } else {
          reject(new Error('주소를 표시할 수 없습니다.'));
        }
      });
    });
  };

  //다음 주소검색 팝업 script 호출
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  //주소 검색 완료시 호출될 함수
  const handleComplete = async (data: Address) => {
    const fullAddress = data.address;

    setLocation(fullAddress);

    const updatedPosition = await locationToPosition(fullAddress);

    setCoordinate({
      lat: updatedPosition.lat, // 위도
      lng: updatedPosition.lng, // 경도
    });
  };

  const handleClickOpenSearch = () => {
    open({ onComplete: handleComplete });
  };

  const onClickMap = async (
    _: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent,
  ) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    const updatedLocation = await positionToLocation(lat, lng);
    setLocation(updatedLocation);
    setCoordinate({
      lat,
      lng,
    });
  };

  //마운트시 내위치 불러오기
  useEffect(() => {
    if (navigator.geolocation && !isMapLoading) {
      navigator.geolocation.getCurrentPosition(async (data) => {
        const lat = data.coords.latitude;
        const lng = data.coords.longitude;
        setCoordinate({
          lat,
          lng,
        });
        const updatedLocation = await positionToLocation(lat, lng);
        setLocation(updatedLocation);
      });
    }
  }, [isMapLoading]);

  return { position: coordinate, location, handleClickOpenSearch, onClickMap };
}
