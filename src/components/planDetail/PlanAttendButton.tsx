import { useMemo } from 'react';
import Button from '../shared/Button';

interface PlanAttendButtonProps {
  isOpened: boolean;
  isFulled: boolean;
  isJoined: boolean;
  isHost: boolean;
  onClick: () => void;
}

export default function PlanAttendButton({
  isOpened,
  isFulled,
  isJoined,
  isHost,
  onClick,
}: PlanAttendButtonProps) {
  const buttonText = useMemo(() => {
    if (isFulled || isOpened) {
      return '일정이 마감되었습니다.';
    }
    if (!isJoined) {
      return '일정 참여하기';
    }
    return '일정 참여 취소하기';
  }, [isFulled, isOpened, isJoined]);
  return (
    <>
      {!isHost && (
        <Button
          text={buttonText}
          size={'large'}
          disabled={isFulled || isOpened}
          onClick={onClick}
          height={42}
        />
      )}
    </>
  );
}
