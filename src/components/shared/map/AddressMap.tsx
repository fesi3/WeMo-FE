import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface AddressMapProps {
  latitude: number;
  longitude: number;
}

export default function AddressMap({ latitude, longitude }: AddressMapProps) {
  useKakaoLoader();
  return (
    <div className="overflow-hidden rounded-lg border">
      <Map
        id="map"
        center={{ lat: latitude, lng: longitude }}
        className="z-0 w-full pt-[40%]"
        level={3} // 지도의 확대 레벨
        draggable={false}
        zoomable={false}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}
