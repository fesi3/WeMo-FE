export interface PlanListData {
  planCount: number;
  planList: PlanDataWithCategory[];
  nextCursor: number | null;
}

export interface PlanListResponse {
  success: boolean;
  message: string;
  data: PlanListData;
}

export interface PlanData {
  planId: string;
  meetingId?: string;
  planName: string;
  registrationEnd: string;
  dateTime: string;
  meetingName: string;
  province: string;
  district: string;
  participants: number;
  capacity: string;
  isOpened: boolean;
  isLiked: boolean;
  isFulled: boolean;
  planImagePath: string;
  sort?: string;
}

// category를 포함한 확장 타입
export interface PlanDataWithCategory extends PlanData {
  category: string;
}
