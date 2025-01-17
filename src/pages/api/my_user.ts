import { NextApiRequest, NextApiResponse } from 'next';
import meetingImg from '@/assets/images/profile.png';
import { StaticImageData } from 'next/image';

interface UserData {
  email: string;
  nickname: string;
  profileImagePath: string | StaticImageData;
  companyName: string;
  loginType: string;
  createdAt: string;
  joinedPlanCount: number;
  likedPlanCount: number;
  writtenReviewCount: number;
}

interface ResponseData {
  success: boolean;
  message: string;
  data: UserData;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const responseData: ResponseData = {
    success: true,
    message: 'OK',
    data: {
      email: 'test@test.com',
      nickname: 'testUser',
      profileImagePath: meetingImg,
      companyName: '코드잇',
      loginType: '일반',
      createdAt: '2025-01-03 10:00:00',
      joinedPlanCount: 6,
      likedPlanCount: 3,
      writtenReviewCount: 4,
    },
  };

  res.status(200).json(responseData);
}
