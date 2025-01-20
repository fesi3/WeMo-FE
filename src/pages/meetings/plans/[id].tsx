import PlanDetailMain from '@/components/plans/PlanDetailMain';
import Header from '@/components/shared/layout/Header';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';

export default function PlanDetailPage() {
  const { data, isLoading } = usePlanDetailQuery();

  if (isLoading) return <div>로딩중</div>;
  if (!data) return <div>데이터 없음</div>;
  return (
    <>
      <Header title="일정 상세" />
      <div className="min-h-screen">
        <PlanDetailMain planData={data.data} />
      </div>
    </>
  );
}
