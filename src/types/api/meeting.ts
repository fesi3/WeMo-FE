export interface User {
  nickname: string;
  profileImagePath: string;
  createdAt: string;
}

export interface PlanInMeeting {
  planId: number;
  planName: string;
  dateTime: string;
  participants: number;
  capacity: number;
  planImagePath: string;
  isOpened: boolean;
  isFulled: boolean;
}

export interface ReviewInMeeting {
  reviewId: number;
  nickname: string;
  profileImagePath: string;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingDetail {
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
  planCounts: number;
  planList: PlanInMeeting[];
  reviewCounts: number;
  reviewList: ReviewInMeeting[];
}

export interface MeetingDetailResponse {
  success: boolean;
  message: string;
  data: MeetingDetail;
}

export interface CreateMeetingRequest {
  meetingName: string;
  description: string;
  categoryId: number;
  fileUrls: string[];
}
