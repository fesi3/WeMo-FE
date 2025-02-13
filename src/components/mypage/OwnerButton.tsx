import React from 'react';
import Button from '@/components/shared/Button';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface OwnerButtonProps {
  email: string;
  id: number; // `planId`와 `meetingId`를 모두 처리할 수 있도록 `id`로 통합
  onDelete: (id: number) => void; // 공통 삭제 함수
  onLeave: (id: number) => void; // 공통 탈퇴 함수
  type: 'plan' | 'meeting'; // 구분용 prop, 어떤 종류인지 구분
}

const OwnerButton = ({
  email,
  id, // planId와 meetingId를 id로 통합
  onDelete,
  onLeave,
  type, // 'plan' 또는 'meeting'으로 구분
}: OwnerButtonProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isOwner = user?.email === email;

  return (
    <div>
      {/* 모바일에서만 아이콘 보이기 */}
      <Button
        variant={'text'}
        onClick={() => (isOwner ? onDelete(id) : onLeave(id))}
        className="block hover:bg-gray-200 md:hidden"
      >
        {isOwner
          ? type === 'plan'
            ? '🗑️'
            : '🗑️'
          : type === 'plan'
            ? '🗑️'
            : '🗑️'}
      </Button>
      {/* 데스크탑에서만 텍스트 보이도록 */}

      <Button
        onClick={() => (isOwner ? onDelete(id) : onLeave(id))}
        className="hidden md:block"
      >
        <span>
          {
            isOwner
              ? type === 'plan'
                ? '삭제하기' // 'plan'에서 onDelete는 "삭제하기"
                : '모임 삭제' // 'meeting'에서 onDelete는 "모임 삭제"
              : type === 'plan'
                ? '일정 취소하기' // 'plan'에서 onLeave는 "일정 취소하기"
                : '모임 탈퇴하기' // 'meeting'에서 onLeave는 "모임 탈퇴하기"
          }{' '}
        </span>
      </Button>
    </div>
  );
};

export default OwnerButton;
