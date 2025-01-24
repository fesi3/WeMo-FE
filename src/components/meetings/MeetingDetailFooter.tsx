import EditPlanButton from './editPlan/EditPlanButton';

export default function MeetingDetailFooter() {
  const admin = true;
  return (
    <>
      <div className="flex-center h-[60px] w-full border-t bg-white px-3 md:border-t-0">
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
