import Button from '../shared/Button';
import EditPlanButton from './editPlan/EditPlanButton';
interface MeetingDetailFooterProps {
  isLogined: boolean;
  isHost: boolean;
  isJoined: boolean;
  handleLoginRedirection: () => void;
  onClickJoinOrLeave: () => void;
}
export default function MeetingDetailFooter({
  isLogined,
  isHost,
  isJoined,
  handleLoginRedirection,
  onClickJoinOrLeave,
}: MeetingDetailFooterProps) {
  return (
    <>
      <div className="flex-center h-[60px] w-full border-t bg-white px-3 md:border-t-0">
        {isHost ? (
          <EditPlanButton />
        ) : !isJoined ? (
          <Button
            text={'모임 가입하기'}
            size={'large'}
            height={42}
            className="flex-center z-[9] w-full"
            onClick={isLogined ? onClickJoinOrLeave : handleLoginRedirection}
          />
        ) : (
          <Button
            text={'모임 탈퇴하기'}
            size={'large'}
            height={42}
            className="flex-center z-[9] w-full"
            onClick={onClickJoinOrLeave}
          />
        )}
      </div>
      <div className="h-[50px] md:hidden"></div>
    </>
  );
}
