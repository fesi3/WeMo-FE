import instance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { PATHS } from '@/constants/apiPath';

function useAuth() {
  const {
    AUTH: { USER_INFO },
  } = PATHS;

  const fetchUserInfo = async () => {
    const response = await instance.get(USER_INFO);
    return response.data;
  };

  const {
    isError,
    error,
    data: response,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
  });

  return { response, error, isError };
}

export default useAuth;
