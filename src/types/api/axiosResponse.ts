export interface AxiosResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
