import { useState } from 'react';
import { CroppedImageType } from '@/components/types/cropperType';

/**
 *
 * @returns croppedImages : objectURL은 미리보기용 string이고 blobImg는 AWS업로드용 입니다
 * @returns onCrop : CropperModal 컴포넌트에 연결해주세요
 * @returns removeCroppedImage : index위치의 이미지를 삭제합니다.
 *
 */
export default function useCropper() {
  const [croppedImages, setCroppedImages] = useState<CroppedImageType[]>([]);
  const onCrop = (croppedImage: CroppedImageType) => {
    setCroppedImages((prev) => [...prev, croppedImage]);
  };

  const removeCroppedImage = (index: number) => {
    setCroppedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].objectURL);
      return newImages.filter((_, i) => i !== index);
    });
  };

  return { croppedImages, onCrop, removeCroppedImage, setCroppedImages };
}
