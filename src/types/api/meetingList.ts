export interface Plan {
  planId: number;
  meetingId: number;
  dateTime: string;
  isFulled: boolean;
}

export interface Meeting {
  email: string;
  meetingId: number;
  meetingName: string;
  description: string;
  meetingImagePath: string;
  memberCount: number;
  category: string;
  planCount: number;
  planList: Plan[];
}

export interface FetchMeetingsResponse {
  meetingList: Meeting[];
  nextCursor: number | null;
}
