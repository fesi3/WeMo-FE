import React, { useState } from 'react';
import axios from 'axios';
import HeartIcon from '@/assets/icons/heart.svg';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';

type LikeButtonProps = {
  planId: string;
  initialIsLiked: boolean;
};

const getAccessTokenFromCookies = (): string | null => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('accessToken='),
  );
  return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const LikeButton = ({ planId, initialIsLiked }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLikeToggle = async () => {
    const accessToken = getAccessTokenFromCookies();

    if (!accessToken) {
      alert('로그인이 필요합니다');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (isLiked) {
        // 좋아요 취소 요청
        await axios.delete(`${baseUrl}/api/plans/like/${planId}`, config);
      } else {
        // 좋아요 요청
        await axios.post(`${baseUrl}/api/plans/like/${planId}`, {}, config);
      }
      // 성공 시 상태 업데이트
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div
      className="h-8 w-8 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleLikeToggle();
      }}
    >
      {isLiked ? (
        <HeartIcon className="fill-red-500" />
      ) : (
        <EmptyHeartIcon className="fill-gray-500" />
      )}
    </div>
  );
};

export default LikeButton;
