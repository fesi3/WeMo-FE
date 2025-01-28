import { NextApiRequest, NextApiResponse } from 'next';
import { StaticImageData } from 'next/image';
import meetingImage from '@/assets/images/Rectangle 6188.png';
import meetingImage2 from '@/assets/images/profile.png';

interface PlanData {
  nickname: string;
  email: string;
  profileImagePath: string;
  planId: number;
  planName: string;
  category: string;
  meetingId: number;
  meetingName: string;
  province: string;
  district: string;
  planImagePath: string | StaticImageData;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participants: number;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  isOpened: boolean;
  isCanceled: boolean;
  isFulled: boolean;
  isLiked: boolean;
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
      planCount: 11,
      planList: [
        {
          nickname: '유저1',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 1,
          planName: '가나다',
          category: '워케이션',
          meetingId: 1,
          meetingName: '코딩딩',
          province: '서울',
          district: '중구',
          planImagePath: meetingImage2,
          dateTime: '2025-01-15T17:30:00',
          registrationEnd: '2025-01-14T12:00:00',
          capacity: 5,
          participants: 2,
          likeCount: 0,
          viewCount: 0,
          createdAt: '2025-01-04T07:38:35.097793',
          updatedAt: '2025-01-04T07:38:35.097793',
          isOpened: false,
          isCanceled: false,
          isFulled: false,
          isLiked: false,
        },
        {
          nickname: '유저2',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 2,
          planName: '디지털 노마드',
          category: '워케이션',
          meetingId: 2,
          meetingName: '기술 세미나',
          province: '부산',
          district: '해운대',
          planImagePath: meetingImage2,

          dateTime: '2025-02-01T18:25:00',
          registrationEnd: '2025-01-30T12:00:00',
          capacity: 10,
          participants: 5,
          likeCount: 5,
          viewCount: 12,
          createdAt: '2025-01-05T09:20:45.000000',
          updatedAt: '2025-01-05T09:20:45.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저3',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 3,
          planName: '여행 세미나',
          category: '여행',
          meetingId: 3,
          meetingName: '트래블링',
          province: '경기도',
          district: '수원',
          planImagePath: meetingImage2,

          dateTime: '2025-03-10T14:00:00',
          registrationEnd: '2025-03-05T12:00:00',
          capacity: 15,
          participants: 8,
          likeCount: 3,
          viewCount: 10,
          createdAt: '2025-01-06T10:30:20.000000',
          updatedAt: '2025-01-06T10:30:20.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: false,
        },
        {
          nickname: '유저4',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 4,
          planName: '디지털 마케팅',
          category: '교육',
          meetingId: 4,
          meetingName: '마케팅 전략',
          province: '서울',
          district: '강남',
          planImagePath: meetingImage2,

          dateTime: '2025-02-20T19:00:00',
          registrationEnd: '2025-02-15T12:00:00',
          capacity: 8,
          participants: 6,
          likeCount: 2,
          viewCount: 15,
          createdAt: '2025-01-07T11:40:05.000000',
          updatedAt: '2025-01-07T11:40:05.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저5',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 5,
          planName: '인공지능 세미나',
          category: 'IT',
          meetingId: 5,
          meetingName: 'AI와 미래',
          province: '서울',
          district: '강남',
          planImagePath: meetingImage2,

          dateTime: '2025-04-12T13:00:00',
          registrationEnd: '2025-04-10T12:00:00',
          capacity: 20,
          participants: 10,
          likeCount: 5,
          viewCount: 30,
          createdAt: '2025-01-08T12:50:25.000000',
          updatedAt: '2025-01-08T12:50:25.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저6',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 6,
          planName: '요가와 명상',
          category: '건강',
          meetingId: 6,
          meetingName: '명상 모임',
          province: '인천',
          district: '송도',
          planImagePath: meetingImage2,

          dateTime: '2025-05-10T10:00:00',
          registrationEnd: '2025-05-08T12:00:00',
          capacity: 10,
          participants: 4,
          likeCount: 1,
          viewCount: 8,
          createdAt: '2025-01-09T14:00:15.000000',
          updatedAt: '2025-01-09T14:00:15.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: false,
        },
        {
          nickname: '유저7',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 7,
          planName: '사진 동호회',
          category: '취미',
          meetingId: 7,
          meetingName: '사진 촬영',
          province: '서울',
          district: '홍대',
          planImagePath: meetingImage,

          dateTime: '2025-06-22T14:00:00',
          registrationEnd: '2025-06-18T12:00:00',
          capacity: 15,
          participants: 10,
          likeCount: 4,
          viewCount: 20,
          createdAt: '2025-01-10T15:10:35.000000',
          updatedAt: '2025-01-10T15:10:35.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저8',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 8,
          planName: '미술 전시회',
          category: '문화',
          meetingId: 8,
          meetingName: '전시 관람',
          province: '서울',
          district: '종로',
          planImagePath: meetingImage,

          dateTime: '2025-07-10T10:00:00',
          registrationEnd: '2025-07-08T12:00:00',
          capacity: 20,
          participants: 5,
          likeCount: 3,
          viewCount: 18,
          createdAt: '2025-01-11T16:20:50.000000',
          updatedAt: '2025-01-11T16:20:50.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: false,
        },
        {
          nickname: '유저9',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 9,
          planName: '독서 모임',
          category: '여가',
          meetingId: 9,
          meetingName: '북 토크',
          province: '서울',
          district: '강북',
          planImagePath: meetingImage,

          dateTime: '2025-08-15T19:00:00',
          registrationEnd: '2025-08-13T12:00:00',
          capacity: 10,
          participants: 5,
          likeCount: 7,
          viewCount: 25,
          createdAt: '2025-01-12T17:30:25.000000',
          updatedAt: '2025-01-12T17:30:25.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저10',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 10,
          planName: '요리 클래스',
          category: '여가',
          meetingId: 10,
          meetingName: '요리 배우기',
          province: '대전',
          district: '유성',
          planImagePath: meetingImage,

          dateTime: '2025-09-10T11:00:00',
          registrationEnd: '2025-09-08T12:00:00',
          capacity: 12,
          participants: 4,
          likeCount: 3,
          viewCount: 15,
          createdAt: '2025-01-13T18:20:45.000000',
          updatedAt: '2025-01-13T18:20:45.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: false,
        },
        {
          nickname: '유저11',
          email: 'test123@test.com',
          profileImagePath: '',
          planId: 11,
          planName: '게임 대회',
          category: '게임',
          meetingId: 11,
          meetingName: '게임 챌린지',
          province: '서울',
          district: '동대문',
          planImagePath: meetingImage,

          dateTime: '2025-10-05T20:00:00',
          registrationEnd: '2025-10-03T12:00:00',
          capacity: 25,
          participants: 12,
          likeCount: 10,
          viewCount: 35,
          createdAt: '2025-01-14T19:00:55.000000',
          updatedAt: '2025-01-14T19:00:55.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
        {
          nickname: '유저12',
          email: 'test@test.com',
          profileImagePath: '',
          planId: 11,
          planName: '깍두기',
          category: '게임',
          meetingId: 11,
          meetingName: '게임 챌린지',
          province: '서울',
          district: '동대문',
          planImagePath: meetingImage,

          dateTime: '2025-10-05T20:00:00',
          registrationEnd: '2025-10-03T12:00:00',
          capacity: 25,
          participants: 12,
          likeCount: 10,
          viewCount: 35,
          createdAt: '2025-01-14T19:00:55.000000',
          updatedAt: '2025-01-14T19:00:55.000000',
          isOpened: true,
          isCanceled: false,
          isFulled: false,
          isLiked: true,
        },
      ],
      pageSize: 11,
      page: 1,
      totalPage: 2,
    },
  };
  // 응답 코드 200으로 데이터를 전송
  res.status(200).json(responseData);
}
