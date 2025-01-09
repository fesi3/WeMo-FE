import getCroppedImg from '@/utils/getCroppedImage';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

interface CropperModalProps {
  imageSrc: string;
  onCrop: (croppedImage: CroppedImageType) => void;
  handleClose: () => void;
  round?: boolean;
}

interface CroppedImageType {
  objectURL: string;
  blobImg: Blob;
}

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * @param imageSrc createObjectURL을 사용해 string type으로 이미지를 넘겨주세요
 * @param onCrop useCropper 훅에서 연결해주세요
 * @param handleClose useToggle 훅에서 연결해주세요
 */
export default function CropperModal({
  imageSrc,
  onCrop,
  handleClose,
  round = false,
}: CropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 크롭 완료 시 호출되는 콜백 함수
  const onCropComplete = useCallback((_: Area, AreaPixels: Area) => {
    setCroppedAreaPixels(AreaPixels); // 크롭된 영역 픽셀 값을 저장
  }, []);

  const onClickComplete = async () => {
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels as Area);
    onCrop(cropped);
    handleClose();
  };

  return (
    <>
      <div className="relative h-[400px] w-full">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          cropShape={round ? 'round' : 'rect'}
          aspect={round ? 1 / 1 : 5 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          showGrid={false}
          onCropComplete={onCropComplete}
        />
      </div>

      <button onClick={onClickComplete}>완료버튼</button>
    </>
  );
}
