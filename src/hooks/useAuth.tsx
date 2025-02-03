import instance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { PATHS } from '@/constants/apiPath';
import { useDispatch } from 'react-redux';
import { clearUser, login, logout, setUser } from '@/redux/authReducers';
import { useEffect } from 'react';
const {
  AUTH: { USER_INFO },
} = PATHS;

function useAuth() {
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    const response = await instance.get(USER_INFO);
    return response.data;
  };

  const {
    isSuccess,
    isLoading,
    data: response,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (isLoading) return;

    if (isSuccess && response) {
      dispatch(login());
      dispatch(setUser(response.data));
    } else {
      dispatch(logout());
      dispatch(clearUser());
    }
  }, [response, isLoading, isSuccess]);

  return { response, isLoading };
}

export default useAuth;
