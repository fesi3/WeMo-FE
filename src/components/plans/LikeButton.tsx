import React, { useState } from 'react';
import instance from '@/utils/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { showToast } from '@/utils/handleToast';
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
      showToast('error', '로그인이 필요합니다');
      return;
    }

    try {
      if (isLiked) {
        await instance.delete(`/api/plans/like/${planId}`);
        showToast('info', '좋아요를 취소했습니다.');
      } else {
        await instance.post(`/api/plans/like/${planId}`, {});
        showToast('success', '일정에 좋아요를 눌렀습니다.');
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
      showToast('error', '좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      className="h-5 w-5 cursor-pointer"
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
