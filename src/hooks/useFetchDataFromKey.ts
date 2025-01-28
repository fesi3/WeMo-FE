import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import fetchData from '@/api/fetchData';
import { RootState } from '@/redux/store';
import axios from 'axios';

// 로그인 상태를 확인하고
// 로그인 O -> api/fetchData 에서 데이터를 가져와
// 데이터를 특정 키를 기준으로 추출하여 반환하는 훅

const useFetchDataFromKey = <T>(param: string, key?: string) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //isLoggedIn 가 false 인 경우
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!');
      router.push('/login');
      return;
    }

    //isLoggedIn 가 true 인 경우- api 요청
    const fetchDataFromApi = async () => {
      setLoading(true);
      setError(null);

      try {
        //전체 응답 형태로 옴.(response.data)
        const response = await fetchData<{ data: T }>({ param });
        // console.log(`API응답 ===== ${param}`, response);

        // 응답 데이터에서 원하는 key 값을 추출해서 저장.
        // Record<key, value>
        // key가 들어온 경우 response.data[key]를 가져오고, 키가 없다면 전체 응답 데이터 가져오기
        const filteredData = key
          ? (response.data as Record<string, T>)[key]
          : response.data;
        // console.log('key로 가져온 데이터', filteredData);

        setData(filteredData);
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
          alert('[error] 오류가 발생했습니다. 다시 시도해주세요.');
        }
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [param, isLoggedIn]);

  return { data, loading, error };
};

export default useFetchDataFromKey;
