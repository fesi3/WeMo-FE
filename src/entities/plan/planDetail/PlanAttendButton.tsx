import { useMemo } from 'react';
import Button from '../shared/Button';

interface PlanAttendButtonProps {
  isFulled: boolean;
  isJoined: boolean;
  isHost: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export default function PlanAttendButton({
  isFulled,
  isJoined,
  isHost,
  isLoading,
  onClick,
}: PlanAttendButtonProps) {
  const buttonText = useMemo(() => {
    if (isFulled) {
      return '일정이 마감되었습니다.';
    }
    if (!isJoined) {
      return '일정 참여하기';
    }
    return '일정 참여 취소하기';
  }, [isFulled, isJoined]);
  return (
    <>
      {!isHost && (
        <Button
          text={buttonText}
          size={'large'}
          disabled={isFulled || isLoading}
          onClick={onClick}
          height={42}
        />
      )}
    </>
  );
}
