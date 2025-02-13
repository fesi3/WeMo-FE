import { useState } from 'react';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { addressToCoordinate } from '@/utils/addressToCoordinate';

// 초기 좌표 (서울 시청)
const INITIAL_COORDINATE = { lat: 37.5664056, lng: 126.9778222 };
// 초기 주소 (서울 시청)
const INITIAL_ADDRESS = '서울 중구 태평로1가 31';

export default function useAddressSearch() {
  const [coordinate, setCoordinate] = useState(INITIAL_COORDINATE);
  const [address, setAddress] = useState(INITIAL_ADDRESS);

  // 다음 주소 검색 팝업 script 호출
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  //주소 검색 완료 시 실행되는 함수
  const handleComplete = async (data: Address) => {
    const fullAddress = data.address;
    setAddress(fullAddress);

    // 입력된 주소를 위·경도로 변환
    const updatedPosition = await addressToCoordinate(fullAddress);
    setCoordinate({
      lat: updatedPosition.lat,
      lng: updatedPosition.lng,
    });
  };

  // 주소 검색 팝업 실행 함수
  const handleClickOpenSearch = () => {
    open({ onComplete: handleComplete });
  };

  return { coordinate, address, handleClickOpenSearch };
}
