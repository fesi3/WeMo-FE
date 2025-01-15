import { PATHS } from '@/constants/apiPath';
import fetchData from './fetchData';

//코드 이동 예정
export interface POST_PLAN_DETAIL_REQUEST {
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
interface PostPlanParams {
  meetingId: string;
  requestData: POST_PLAN_DETAIL_REQUEST;
}

export const postPlan = async ({ meetingId, requestData }: PostPlanParams) => {
  const response = await fetchData<POST_PLAN_DETAIL_REQUEST>({
    param: PATHS.PLAN.CREATE(meetingId),
    method: 'post',
    requestData,
  });
  console.log(response);
};
