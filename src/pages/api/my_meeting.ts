import { NextApiRequest, NextApiResponse } from 'next';
import { StaticImageData } from 'next/image';
import meetingImage from '@/assets/images/Rectangle 6188.png';
import meetingImage2 from '@/assets/images/profile.png';

interface MeetingData {
  email: string;
  meetingId: number;
  meetingName: string;
  category: string;
  meetingImagePath: string | StaticImageData;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: {
    meetingCount: number;
    meetingList: MeetingData[];
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
      meetingCount: 14,
      meetingList: [
        {
          email: 'aa@naver.com',
          meetingId: 1,
          meetingName: '이너피스 1',
          category: '운동',
          meetingImagePath: meetingImage,
          memberCount: 2,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 2,
          meetingName: '힐링타임',
          category: '취미',
          meetingImagePath: meetingImage2,
          memberCount: 4,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 3,
          meetingName: '명상모임',
          category: '자기계발',
          meetingImagePath: meetingImage,
          memberCount: 6,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'test@test.com',
          meetingId: 4,
          meetingName: '러닝클럽',
          category: '문화',
          meetingImagePath: meetingImage,
          memberCount: 8,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'test@test.com',
          meetingId: 5,
          meetingName: '독서토론',
          category: '여가',
          meetingImagePath: meetingImage2,
          memberCount: 10,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'test@test.com',
          meetingId: 6,
          meetingName: '음악감상회',
          category: '건강',
          meetingImagePath: meetingImage,
          memberCount: 12,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 7,
          meetingName: '사진동호회',
          category: '사진',
          meetingImagePath: meetingImage,
          memberCount: 14,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 8,
          meetingName: '게임모임',
          category: '게임',
          meetingImagePath: meetingImage2,
          memberCount: 5,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 9,
          meetingName: '댄스클럽',
          category: '문화',
          meetingImagePath: meetingImage2,
          memberCount: 3,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 10,
          meetingName: '요가모임',
          category: '운동',
          meetingImagePath: meetingImage,
          memberCount: 7,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 11,
          meetingName: '영화감상회',
          category: '여가',
          meetingImagePath: meetingImage,
          memberCount: 9,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 12,
          meetingName: '수학스터디',
          category: '학습',
          meetingImagePath: meetingImage,
          memberCount: 15,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 13,
          meetingName: '여행모임',
          category: '여가',
          meetingImagePath: meetingImage2,
          memberCount: 4,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
        {
          email: 'aa@naver.com',
          meetingId: 14,
          meetingName: '전시회',
          category: '문화',
          meetingImagePath: meetingImage2,
          memberCount: 6,
          createdAt: '2025-01-05 14:36:31',
          updatedAt: '2025-01-05 14:36:31',
        },
      ],

      pageSize: 14, // 한 페이지에 표시할 데이터 수
      page: 1, // 현재 페이지 번호
      totalPage: 2, // 총 페이지 수
    },
  };

  // 응답 코드 200으로 데이터를 전송
  res.status(200).json(responseData);
}
