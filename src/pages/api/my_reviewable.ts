import { NextApiRequest, NextApiResponse } from 'next';
import meetingImg from '@/assets/images/Rectangle 6188.png';
import meetingImg2 from '@/assets/images/profile.png';
import { StaticImageData } from 'next/image';

interface PlanData {
  planId: number;
  planName: string;
  dateTime: string;
  category: string;
  address: string;
  planImagePath: string | StaticImageData;
  capacity: number;
  participants: number;
  createdAt: string;
  updatedAt: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: {
    planCount: number;
    planList: PlanData[];
    pageSize: number;
    page: number;
    totalPage: number;
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const responseData: ResponseData = {
    success: true,
    message: 'OK',
    data: {
      planCount: 14,
      planList: [
        {
          planId: 1,
          planName: '일정1',
          dateTime: '2025-01-06 12:00:00',
          category: '오피스 스트레칭',
          address: '서울 중구 을지로 2가 6',
          planImagePath: meetingImg2,
          capacity: 3,
          participants: 2,
          createdAt: '2025-01-07 14:00:00',
          updatedAt: '2025-01-07 14:00:00',
        },
        {
          planId: 2,
          planName: '일정2',
          dateTime: '2025-01-07 12:00:00',
          category: '워케이션',
          address: '서울 중구 을지로 2가 6',
          planImagePath: meetingImg,
          capacity: 3,
          participants: 2,
          createdAt: '2025-01-08 14:00:00',
          updatedAt: '2025-01-08 14:00:00',
        },
        {
          planId: 3,
          planName: '일정3',
          dateTime: '2025-01-08 12:00:00',
          category: '팀 빌딩',
          address: '서울 중구 명동 1가 7',
          planImagePath: meetingImg,
          capacity: 4,
          participants: 3,
          createdAt: '2025-01-09 14:00:00',
          updatedAt: '2025-01-09 14:00:00',
        },
        {
          planId: 4,
          planName: '일정4',
          dateTime: '2025-01-09 12:00:00',
          category: '컨퍼런스',
          address: '서울 강남구 테헤란로 2',
          planImagePath: meetingImg,
          capacity: 5,
          participants: 4,
          createdAt: '2025-01-10 14:00:00',
          updatedAt: '2025-01-10 14:00:00',
        },
        {
          planId: 5,
          planName: '일정5',
          dateTime: '2025-01-10 12:00:00',
          category: '워크숍',
          address: '서울 송파구 가락동 13',
          planImagePath: meetingImg,
          capacity: 10,
          participants: 6,
          createdAt: '2025-01-11 14:00:00',
          updatedAt: '2025-01-11 14:00:00',
        },
        {
          planId: 6,
          planName: '일정6',
          dateTime: '2025-01-11 12:00:00',
          category: '스터디 그룹',
          address: '서울 서초구 반포대로 8',
          planImagePath: meetingImg,
          capacity: 6,
          participants: 4,
          createdAt: '2025-01-12 14:00:00',
          updatedAt: '2025-01-12 14:00:00',
        },
        {
          planId: 7,
          planName: '일정7',
          dateTime: '2025-01-12 12:00:00',
          category: '디자인 워크숍',
          address: '서울 강북구 미아동 5',
          planImagePath: meetingImg2,
          capacity: 8,
          participants: 5,
          createdAt: '2025-01-13 14:00:00',
          updatedAt: '2025-01-13 14:00:00',
        },
        {
          planId: 8,
          planName: '일정8',
          dateTime: '2025-01-13 12:00:00',
          category: '제품 발표회',
          address: '서울 중랑구 중화동 3',
          planImagePath: meetingImg2,
          capacity: 7,
          participants: 6,
          createdAt: '2025-01-14 14:00:00',
          updatedAt: '2025-01-14 14:00:00',
        },
        {
          planId: 9,
          planName: '일정9',
          dateTime: '2025-01-14 12:00:00',
          category: '디지털 마케팅 세미나',
          address: '서울 종로구 종로1가 2',
          planImagePath: meetingImg2,
          capacity: 9,
          participants: 7,
          createdAt: '2025-01-15 14:00:00',
          updatedAt: '2025-01-15 14:00:00',
        },
        {
          planId: 10,
          planName: '일정10',
          dateTime: '2025-01-15 12:00:00',
          category: 'AI 컨퍼런스',
          address: '서울 마포구 상암동 9',
          planImagePath: meetingImg2,
          capacity: 10,
          participants: 8,
          createdAt: '2025-01-16 14:00:00',
          updatedAt: '2025-01-16 14:00:00',
        },
        {
          planId: 11,
          planName: '일정11',
          dateTime: '2025-01-16 12:00:00',
          category: '비즈니스 네트워킹',
          address: '서울 강동구 천호동 11',
          planImagePath: meetingImg2,
          capacity: 15,
          participants: 10,
          createdAt: '2025-01-17 14:00:00',
          updatedAt: '2025-01-17 14:00:00',
        },
        {
          planId: 12,
          planName: '일정12',
          dateTime: '2025-01-17 12:00:00',
          category: '창업 세미나',
          address: '서울 금천구 가산동 14',
          planImagePath: meetingImg2,
          capacity: 20,
          participants: 15,
          createdAt: '2025-01-18 14:00:00',
          updatedAt: '2025-01-18 14:00:00',
        },
        {
          planId: 13,
          planName: '일정13',
          dateTime: '2025-01-18 12:00:00',
          category: '기술 세미나',
          address: '서울 영등포구 여의도동 15',
          planImagePath: meetingImg2,
          capacity: 30,
          participants: 25,
          createdAt: '2025-01-19 14:00:00',
          updatedAt: '2025-01-19 14:00:00',
        },
        {
          planId: 14,
          planName: '일정14',
          dateTime: '2025-01-19 12:00:00',
          category: '디지털 트랜스포메이션 컨퍼런스',
          address: '서울 서초구 서초동 16',
          planImagePath: meetingImg2,
          capacity: 50,
          participants: 40,
          createdAt: '2025-01-20 14:00:00',
          updatedAt: '2025-01-20 14:00:00',
        },
      ],

      pageSize: 10, // 한 페이지에 표시할 데이터 수
      page: 1, // 현재 페이지 번호
      totalPage: 2, // 총 페이지 수
    },
  };

  // 응답 코드 200으로 데이터를 전송
  res.status(200).json(responseData);
}
