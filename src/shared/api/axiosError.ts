type HttpStatus =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR' /* 등등 추가 */;

export type ErrorResponse = {
  success: false;
  message: string;
  httpStatus: HttpStatus;
};
