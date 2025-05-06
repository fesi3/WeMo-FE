import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/shared/utils/axios';
import { API_PATHS } from '@/shared/constants/apiPath';
import {
  clearUser,
  login,
  logout,
  setUser,
} from '@/shared/lib/redux/authReducers';

import { UserDataResponse } from '../types/mypageType';
import { ErrorResponse } from '../api/axiosError';

const {
  AUTH: { USER_INFO },
} = API_PATHS;

function useAuth() {
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    const response = await axiosInstance.get(USER_INFO);
    return response.data;
  };

  const {
    isSuccess,
    isLoading,
    error,
    data: response,
  } = useQuery<UserDataResponse, AxiosError<ErrorResponse, unknown>>({
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
