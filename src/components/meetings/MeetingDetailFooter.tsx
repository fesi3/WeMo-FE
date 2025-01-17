import EditPlanButton from './editPlan/EditPlanButton';

export default function MeetingDetailFooter() {
  const admin = true;
  return (
    <>
      <div className="h-[60px] w-full"></div>
      <div className="flex-center fixed bottom-0 h-[60px] w-full border-t bg-white px-3 shadow-inner">
        {admin ? (
          <EditPlanButton />
        ) : (
          <button className="flex-center z-[9] h-[42px] w-full rounded-md bg-primary-10 font-bold text-white">
            모임 가입하기
          </button>
        )}
      </div>
    </>
  );
}
