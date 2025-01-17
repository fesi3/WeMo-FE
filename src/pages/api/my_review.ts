import { NextApiRequest, NextApiResponse } from 'next';
import meetingImg from '@/assets/images/Rectangle 6188.png';
import meetingImg2 from '@/assets/images/profile.png';
import { StaticImageData } from 'next/image';

interface ReviewData {
  reviewId: number;
  planName: string;
  dateTime: string;
  category: string;
  address: string;
  score: number;
  comment: string;
  reivewImagePath: string | StaticImageData;
  createdAt: string;
  updatedAt: string;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: {
    reviewCount: number;
    reviewList: ReviewData[];
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
      reviewCount: 13,
      reviewList: [
        {
          reviewId: 2,
          planName: '산책팟',
          dateTime: '2025-01-01 12:00:00',
          category: '오피스 스트레칭',
          address: '서울 중구',
          score: 2,
          comment: '너무 추웠어요ㅠㅠ 그래도 재밌었습니다.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-07 14:00:00',
          updatedAt: '2025-01-07 14:00:00',
        },
        {
          reviewId: 1,
          planName: '노래방팟',
          dateTime: '2025-01-07 12:00:00',
          category: '워케이션',
          address: '강남역',
          score: 5,
          comment:
            '마이크 음질 짱짱!! 또 참여하고 싶어요 다들 노래 너무 잘하시네요',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-08 14:00:00',
          updatedAt: '2025-01-08 14:00:00',
        },
        {
          reviewId: 3,
          planName: '요가팟',
          dateTime: '2025-01-02 08:00:00',
          category: '웰빙',
          address: '서울 강남구',
          score: 4,
          comment:
            '매우 유익하고 건강한 시간이었어요. 다음에도 참여하고 싶습니다.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-05 10:00:00',
          updatedAt: '2025-01-05 10:00:00',
        },
        {
          reviewId: 4,
          planName: '운동팟',
          dateTime: '2025-01-03 09:00:00',
          category: '피트니스',
          address: '서울 송파구',
          score: 3,
          comment:
            '운동은 좋았는데 강사가 너무 빨랐어요. 조금 천천히 진행해주시면 좋겠어요.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-05 15:00:00',
          updatedAt: '2025-01-05 15:00:00',
        },
        {
          reviewId: 5,
          planName: '영화팟',
          dateTime: '2025-01-04 19:00:00',
          category: '취미',
          address: '서울 강서구',
          score: 5,
          comment: '영화가 너무 재밌었어요. 정말 좋은 시간이었다고 생각해요.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-06 14:00:00',
          updatedAt: '2025-01-06 14:00:00',
        },
        {
          reviewId: 6,
          planName: '여행팟',
          dateTime: '2025-01-05 10:00:00',
          category: '여행',
          address: '서울 시내',
          score: 4,
          comment:
            '여행 계획은 좋았는데 시간이 너무 촉박했어요. 조금 더 여유가 있었으면 좋았을 것 같아요.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-06 17:00:00',
          updatedAt: '2025-01-06 17:00:00',
        },
        {
          reviewId: 7,
          planName: '게임팟',
          dateTime: '2025-01-06 18:00:00',
          category: '게임',
          address: '서울 종로구',
          score: 5,
          comment: '재미있게 게임을 할 수 있어 너무 좋았어요. 또 하고 싶어요!',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-07 12:00:00',
          updatedAt: '2025-01-07 12:00:00',
        },
        {
          reviewId: 8,
          planName: '사진촬영팟',
          dateTime: '2025-01-07 14:00:00',
          category: '취미',
          address: '서울 신촌',
          score: 3,
          comment: '사진 촬영이 재미있었지만 더 많은 조명이 필요했어요.',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-08 11:00:00',
          updatedAt: '2025-01-08 11:00:00',
        },
        {
          reviewId: 9,
          planName: '독서팟',
          dateTime: '2025-01-08 16:00:00',
          category: '자기계발',
          address: '서울 마포구',
          score: 4,
          comment:
            '책을 읽는 것이 즐거웠어요. 다만, 토론 시간이 좀 부족했던 것 같아요.',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-09 13:00:00',
          updatedAt: '2025-01-09 13:00:00',
        },
        {
          reviewId: 10,
          planName: '캠핑팟',
          dateTime: '2025-01-09 10:00:00',
          category: '여행',
          address: '서울 근교',
          score: 5,
          comment: '캠핑이 너무 즐거웠고 자연을 만끽할 수 있어서 좋았습니다.',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-10 16:00:00',
          updatedAt: '2025-01-10 16:00:00',
        },
        {
          reviewId: 11,
          planName: '바다팟',
          dateTime: '2025-01-10 08:00:00',
          category: '여행',
          address: '부산 해운대',
          score: 5,
          comment:
            '멋진 바다를 보면서 여유롭게 시간을 보냈습니다. 너무 행복했어요.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-11 14:00:00',
          updatedAt: '2025-01-11 14:00:00',
        },
        {
          reviewId: 12,
          planName: '댄스팟',
          dateTime: '2025-01-11 12:00:00',
          category: '취미',
          address: '서울 동대문구',
          score: 4,
          comment:
            '댄스를 배우는 것이 재미있었어요. 하지만 더 쉬운 동작부터 시작하는 게 좋았을 것 같아요.',
          reivewImagePath: meetingImg2,
          createdAt: '2025-01-12 14:00:00',
          updatedAt: '2025-01-12 14:00:00',
        },
        {
          reviewId: 13,
          planName: '스포츠팟',
          dateTime: '2025-01-12 10:00:00',
          category: '운동',
          address: '서울 양재동',
          score: 3,
          comment:
            '운동은 좋았지만 기구가 부족해서 불편했어요. 개선이 필요할 것 같아요.',
          reivewImagePath: meetingImg,
          createdAt: '2025-01-13 11:00:00',
          updatedAt: '2025-01-13 11:00:00',
        },
      ],
      pageSize: 10,
      page: 1,
      totalPage: 2,
    },
  };

  // 응답 코드 200으로 데이터를 전송
  res.status(200).json(responseData);
}
