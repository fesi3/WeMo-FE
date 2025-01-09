import { useState } from 'react';

interface CroppedImageType {
  objectURL: string;
  blobImg: Blob;
}

/**
 *
 * @returns croppedImages : objectURL은 미리보기용 string이고 blobImg는 AWS업로드용 입니다
 */
export default function useCropper() {
  const [croppedImages, setCroppedImages] = useState<CroppedImageType[]>([]);
  const onCrop = (croppedImage: CroppedImageType) => {
    setCroppedImages((prev) => [...prev, croppedImage]);
  };

  return { croppedImages, onCrop };
}
