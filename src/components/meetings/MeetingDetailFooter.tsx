import EditPlanButton from './editPlan/EditPlanButton';

export default function MeetingDetailFooter() {
  const admin = true;
  return (
    <div className="flex-center fixed bottom-3 h-10 w-full px-3">
      {admin ? (
        <EditPlanButton />
      ) : (
        <button className="flex-center h-full w-full rounded-md bg-primary-10 text-white">
          모임 가입하기
        </button>
      )}
    </div>
  );
}
