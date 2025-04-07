import instance from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { API_PATHS } from '@/shared/constants/apiPath';
import { useDispatch } from 'react-redux';
import {
  clearUser,
  login,
  logout,
  setUser,
} from '@/shared/lib/redux/authReducers';
import { useEffect } from 'react';
const {
  AUTH: { USER_INFO },
} = API_PATHS;

function useAuth() {
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    const response = await instance.get(USER_INFO);
    return response.data;
  };

  const {
    isSuccess,
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchUserInfo,
    retry: false,
    gcTime: 0,
    staleTime: 0,
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

  return { response, isLoading, error };
}

export default useAuth;
