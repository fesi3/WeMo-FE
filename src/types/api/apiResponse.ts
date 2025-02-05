export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  httpStatus: string;
}
