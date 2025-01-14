import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';
//카카오 API호출에 필요한 appkey등 설정
export default function useKakaoLoader() {
  const [loading, error] = useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY as string,
    libraries: ['services'],
  });
  return [loading, error];
}
