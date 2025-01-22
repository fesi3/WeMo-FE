import Button from '@/components/shared/Button';
import Modal from '@/components/shared/modals/Modal';
import { Coordinate } from '@/types/mapType';
import { addressToCoordinate } from '@/utils/addressToCoordinate';
import Image from 'next/image';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface AddressSearchModalProps {
  closeMap: () => void;
  isOpenMap: boolean;
  coordinate: Coordinate;
  handleClickMap: ({ lat, lng }: Coordinate) => Promise<void>;
  address: string;
}

export default function AddressSearchModal({
  closeMap,
  isOpenMap,
  coordinate,
  handleClickMap,
  address,
}: AddressSearchModalProps) {
  const onClickMap = (
    _: kakao.maps.Map,
    mouseEvent: kakao.maps.event.MouseEvent,
  ) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    handleClickMap({ lat: lat, lng: lng });
  };

  //다음 주소검색 팝업 script 호출
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  //주소 검색 완료시 호출될 함수 (주소 -> 좌표 -> 주소 저장 리팩토링 필요)
  const handleComplete = async (data: Address) => {
    const fullAddress = data.address;
    const updatedCoordinate = await addressToCoordinate(fullAddress);
    handleClickMap({ lat: updatedCoordinate.lat, lng: updatedCoordinate.lng });
  };
  const handleClickOpenSearch = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Modal title="일정 장소 검색" handleClose={closeMap} isOpen={isOpenMap}>
      <div className="flex flex-col">
        <span>입력 주소</span>
        <div className="flex items-center justify-between pb-3">
          <div className="flex h-8 items-end justify-center gap-1 rounded-md text-gray-700">
            <Image
              src="/assets/icons/location_marker.svg"
              alt="주소"
              width={15}
              height={15}
            />
            <span>{address}</span>
          </div>
          <button
            onClick={handleClickOpenSearch}
            className="flex-center h-8 rounded-md bg-primary-10 px-3 text-white"
          >
            주소 검색
          </button>
        </div>

        <Map
          onClick={onClickMap}
          className="aspect-video w-full rounded-t-md"
          center={{ lat: coordinate.lat, lng: coordinate.lng }}
          isPanto
        >
          <MapMarker position={coordinate} />
        </Map>
        <Button
          onClick={closeMap}
          text="확인"
          backColor="rounded bg-primary-10 w-full text-white  font-bold"
        />
      </div>
    </Modal>
  );
}
