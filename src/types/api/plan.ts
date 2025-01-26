export interface User {
  nickname: string;
  profileImagePath: string;
  createdAt: string;
}

interface MeetingInfo {
  meetingId: number;
  meetingName: string;
  description: string;
  meetingImagePath: string;
  memberCount: number;
  reviewAverage: number;
}

export interface PlanDetail {
  planId: number;
  nickname: string;
  email: string;
  profileImagePath: string;
  planName: string;
  category: string;
  address: string;
  longitude: number;
  latitude: number;
  planImagePath: string[];
  content: string;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participants: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userList: User[];
  meetingInfo: MeetingInfo;
  isJoined: boolean;
  isCanceled: boolean;
  isLiked: boolean;
  isOpened: boolean;
  isFulled: boolean;
  likeCount: number;
  viewCount: number;
}

export interface PlanDetailResponse {
  success: boolean;
  message: string;
  data: PlanDetail;
}

export interface CreatePlanRequestBody {
  planName: string;
  dateTime: string;
  address: string;
  addressDetail: string;
  longitude: number;
  latitude: number;
  capacity: number;
  content: string;
  registrationEnd: string;
  fileUrls: string[];
}
