import Button from '../shared/Button';
import EditPlanButton from './editPlan/EditPlanButton';
interface MeetingDetailFooterProps {
  isHost: boolean;
}
export default function MeetingDetailFooter({
  isHost,
}: MeetingDetailFooterProps) {
  return (
    <>
      <div className="flex-center h-[60px] w-full border-t bg-white px-3 md:border-t-0">
        {isHost ? (
          <EditPlanButton />
        ) : (
          // <button className="flex-center z-[9] h-[42px] w-full rounded-md bg-primary-10 font-bold text-white">
          //   모임 가입하기
          // </button>
          <Button
            text={'모임 가입하기'}
            size={'large'}
            height={42}
            className="flex-center z-[9] w-full"
          />
        )}
      </div>
      <div className="h-[50px] md:hidden"></div>
    </>
  );
}
