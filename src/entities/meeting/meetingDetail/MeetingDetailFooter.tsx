import Button from '../shared/Button';
import EditPlanButton from './editPlan/EditPlanButton';
interface MeetingDetailFooterProps {
  isHost: boolean;
  isJoined: boolean;
  onClickJoinOrLeave: () => void;
  isLoading: boolean;
}
export default function MeetingDetailFooter({
  isHost,
  isJoined,
  onClickJoinOrLeave,
  isLoading,
}: MeetingDetailFooterProps) {
  return (
    <>
      <div className="flex-center h-[60px] w-full border-t bg-white px-3 md:border-t-0">
        {isHost ? (
          <EditPlanButton />
        ) : !isJoined ? (
          <Button
            disabled={isLoading}
            text={'모임 가입하기'}
            size={'large'}
            height={42}
            className="flex-center z-[9] w-full"
            onClick={onClickJoinOrLeave}
          />
        ) : (
          <Button
            disabled={isLoading}
            text={'모임 탈퇴하기'}
            size={'large'}
            height={42}
            className="flex-center z-[9] w-full"
            onClick={onClickJoinOrLeave}
          />
        )}
      </div>
    </>
  );
}
