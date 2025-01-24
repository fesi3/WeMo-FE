import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

// const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const useFetchData = <T>(url: string, key?: string) => {
  // Redux에서 로그인 상태 가져오기
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  console.log('로그인 상태 ======= ', isLoggedIn);
  const router = useRouter();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //로그인 상태가 아니면 API 호출 막음.
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!');
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}${url}`, {
          withCredentials: true,
        });

        console.log(`(API 응답) ${url}`, response.data);

        // 데이터의 응답 구조에 맞게 반환, 없으면 기본 데이터 사용
        const extractedData = key
          ? response.data.data[key]
          : response.data.data;

        setData(extractedData);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          console.log('서버로부터 받은 에러 데이터', err.response.data);

          if (err.response.status === 400) {
            alert('로그인이 필요합니다!');
            router.push('/login');
            return;
          } else {
            alert('[error] 서버와 통신 오류 발생.');
          }
        } else {
          alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
        }
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, isLoggedIn]);

  return { data, loading, error };
};

export default useFetchData;
