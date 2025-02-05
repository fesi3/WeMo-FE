import { addressToCoordinate } from '@/utils/addressToCoordinate';
import useKakaoLoader from '../hooks/useKakaoLoader';
import { useEffect, useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { coordinateToAddress } from '@/utils/coordinateToAddress';

// 서울 시청 좌표
const INITIAL_COORDINATE = {
  lat: 37.5664056,
  lng: 126.9778222,
};

//서울 시청 주소
const INITIAL_ADDRESS = '서울 중구 태평로1가 31';

export default function useKakaoMap() {
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    lng: number;
  }>(INITIAL_COORDINATE);
  const [Address, setAddress] = useState(INITIAL_ADDRESS);
  const [isMapLoading] = useKakaoLoader();

  //다음 주소검색 팝업 script 호출
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  //주소 검색 완료시 호출될 함수
  const handleComplete = async (data: Address) => {
    const fullAddress = data.address;

    setAddress(fullAddress);

    const updatedPosition = await addressToCoordinate(fullAddress);

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
    const updatedLocation = await coordinateToAddress(lat, lng);
    setAddress(updatedLocation);
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
        const updatedLocation = await coordinateToAddress(lat, lng);
        setAddress(updatedLocation);
      });
    }
  }, [isMapLoading]);

  return { coordinate, Address, handleClickOpenSearch, onClickMap };
}
