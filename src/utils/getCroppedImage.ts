// 이미지 데이터를 생성하는 유틸리티 함수
const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // 크로스 도메인 문제 방지
    image.src = url;
  });
};

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

//함수가 리턴하는 type
interface CroppedImageType {
  objectURL: string;
  blobImg: Blob;
}

// 크롭된 이미지를 추출하는 함수
const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
): Promise<CroppedImageType> => {
  const image = await createImage(imageSrc); // 이미지 생성
  const canvas = document.createElement('canvas'); // 캔버스 생성
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D context');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX, // 크롭된 영역의 X 좌표
    crop.y * scaleY, // 크롭된 영역의 Y 좌표
    crop.width * scaleX, // 크롭된 영역의 너비
    crop.height * scaleY, // 크롭된 영역의 높이
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        const objectURL = URL.createObjectURL(file);
        resolve({ objectURL, blobImg: file });
      } else {
        reject(new Error('Failed to create blob'));
      }
    }, 'image/jpeg');
  });
};

export default getCroppedImg;
