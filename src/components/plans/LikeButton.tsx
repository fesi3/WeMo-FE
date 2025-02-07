import React, { useState } from 'react';
import instance from '@/api/axiosInstance';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HeartIcon from '@/assets/icons/heart.svg';
import EmptyHeartIcon from '@/assets/icons/emptyHeart.svg';

type LikeButtonProps = {
  planId: string;
  initialIsLiked: boolean;
};

const LikeButton = ({ planId, initialIsLiked }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      if (isLiked) {
        await instance.delete(`/api/plans/like/${planId}`);
        alert('좋아요를 취소했습니다.');
      } else {
        await instance.post(`/api/plans/like/${planId}`, {});
        alert('일정에 좋아요를 눌렀습니다.');
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
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
      {isLiked ? <HeartIcon /> : <EmptyHeartIcon />}
    </div>
  );
};

export default LikeButton;
