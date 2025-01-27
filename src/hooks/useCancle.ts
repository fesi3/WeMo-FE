import fetchData from '@/api/fetchData';
import axios from 'axios';
import { useRouter } from 'next/router';

interface CancelBtnApiProps {
  url: string; // api 요청 url
  successMessage: string; // 200 응답 왔을 경우
  router: ReturnType<typeof useRouter>;
}

export const useCancle = async ({
  url,
  successMessage,
  router,
}: CancelBtnApiProps) => {
  try {
    const response = await fetchData({
      param: url,
      method: 'delete',
    });
    if (response) {
      alert(successMessage);
      window.location.reload(); //새로고침
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.log('서버로부터 받은 에러 데이터', error.response.data);
      if (error.response.status === 400) {
        alert('400.로그인이 필요합니다!');
        router.push('/login');
        return;
      } else {
        alert('[error] 서버와 통신 오류 발생.');
      }
    } else {
      //axios 에러가 아닌 다른 예외가 발생한 경우
      alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }
};
