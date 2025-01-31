export const PATHS = {
  AUTH: {
    SIGNUP: '/api/auths/signup',
    CHECK_EMAIL: '/api/auths/check-email',
    SIGNIN: '/api/auths/signin',
    SIGNOUT: '/api/auths/signout',
    USER_INFO: '/api/auths/users',
    PROFILE_IMAGE: '/api/auths/profile',
    REFRESH_TOKEN: '/api/auths/reissue',
  },
  MEETING: {
    CREATE: '/api/meetings',
    JOIN: (meetingId: string) => `/api/meetings/${meetingId}`,
    GET_ALL: '/api/meetings',
    GET_DETAIL: (meetingId: string) => `/api/meetings/${meetingId}`,
    GET_MEMBERS: (meetingId: string, pageNumber: number, size: number) =>
      `/api/meetings/${meetingId}/members?page=${pageNumber}&size=${size}`,
    GET_PLANS: (meetingId: string, pageNumber: number, size: number) =>
      `/api/meetings/${meetingId}/plans?page=${pageNumber}&size=${size}`,
    GET_REVIEWS: (meetingId: string, pageNumber: number, size: number) =>
      `/api/meetings/${meetingId}/reviews?page=${pageNumber}&size=${size}`,
    UPDATE: (meetingId: string) => `/api/meetings/${meetingId}`,
    DELETE: (meetingId: string) => `/api/meetings/${meetingId}`,
  },
  PLAN: {
    CREATE: (meetingId: string) => `/api/plans/${meetingId}`,
    GET_ALL: (params: string) => `/api/plans?${params}`,
    GET_DETAIL: (planId: string) => `/api/plans/${planId}`,
    CANCEL: (planId: string) => `/api/plans/${planId}/cancel`,
    ATTEND: (planId: string) => `/api/plans/${planId}/attendance`,
    LIKE: (planId: string) => `/api/plans/like/${planId}`,
    UNLIKE: (planId: string) => `/api/plans/like/${planId}`,
    GET_LIKED: (params: string) => `/api/plans/like?${params}`,
  },
  REVIEW: {
    CREATE: (planId: string) => `/api/reviews/${planId}`,
    UPDATE: (reviewId: string) => `/api/reviews/${reviewId}`,
    DELETE: (reviewId: string) => `/api/reviews/${reviewId}`,
    GET_ALL: (params: string) => `/api/reviews?${params}`,
  },
  REGION: {
    GET_PROVINCES: '/api/region/province',
    GET_DISTRICTS: (provinceId: string) =>
      `/api/region/district?provinceId=${provinceId}`,
  },
  MYPAGE: {
    GET_MY_MEETINGS: (pageNumber: number, size: number) =>
      `/api/users/meetings?page=${pageNumber}&size=${size}`,
    GET_MY_PLANS: (pageNumber: number, size: number) =>
      `/api/users/plans?page=${pageNumber}&size=${size}`,
    GET_MY_REVIEWS: (pageNumber: number, size: number) =>
      `/api/users/reviews?page=${pageNumber}&size=${size}`,
    GET_AVAILABLE_REVIEWS: (pageNumber: number, size: number) =>
      `/api/users/reviews/available?page=${pageNumber}&size=${size}`,
  },
  IMAGE: {
    UPLOAD: (count: number) => `/api/images?count=${count}`,
  },
} as const;
