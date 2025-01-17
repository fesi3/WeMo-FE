export interface CREATE_MEETING_REQUEST_BODY {
  meetingName: string;
  description: string;
  categoryId: number;
  fileUrl: string;
}

interface User {
  nickname: string;
  profileImagePath: string;
  createdAt: string;
}

interface Plan {
  planId: number;
  planName: string;
  dateTime: string;
  currentUsers: number;
  capacity: number;
  planImagePath: string;
  isOpened: boolean;
  isFulled: boolean;
}

interface Review {
  reviewId: number;
  nickname: string;
  profileImagePath: string;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface MeetingData {
  meetingId: number;
  meetingName: string;
  meetingImagePath: string;
  memberCount: number;
  description: string;
  category: string;
  nickname: string;
  profileImagePath: string;
  createdAt: string;
  updatedAt: string;
  memberList: User[];
  planCount: number;
  planList: Plan[];
  reviewCount: number;
  reviewList: Review[];
}

export interface GET_MEETING_DETAIL_RESPONSE {
  success: boolean;
  message: string;
  data: MeetingData;
}

export interface POST_MEETING_REQUEST_BODY {
  meetingName: string;
  description: string;
  categoryId: number;
  fileUrls: string[];
}
