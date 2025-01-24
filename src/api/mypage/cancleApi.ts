import axios from 'axios';
import { useRouter } from 'next/router';

interface CancleBtnApiProps {
  url: string; // api 요청 url
  successMessage: string; // 200 응답 왔을 경우
  router: ReturnType<typeof useRouter>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

export const cancleBtnApi = async ({
  url,
  successMessage,
  router,
}: CancleBtnApiProps) => {
  try {
    const response = await axios.delete(`${BASE_URL}${url}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      alert(successMessage);
      window.location.reload(); //새로고침
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log('서버로부터 받은 에러 데이터', error.response.data);
      if (error.response.status === 400) {
        alert('로그인이 필요합니다!');
        router.push('/login');
      } else {
        alert('[error] 서버와 통신 오류 발생.');
      }
    } else {
      //axios 에러가 아닌 다른 예외가 발생한 경우
      alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
};
