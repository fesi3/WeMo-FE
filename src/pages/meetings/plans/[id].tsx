import { useRouter } from 'next/router';

import PlanDetailMain from '@/components/plans/PlanDetailMain';
import Header from '@/components/shared/layout/Header';
import usePlanDetailQuery from '@/hooks/usePlanDetailQuery';

export default function PlanDetailPage() {
  const { data, isLoading } = usePlanDetailQuery();

  //추후에 일정찾기로 갈지, 부모 모임으로 갈지 고민
  const router = useRouter();
  const onClickBack = () => {
    router.push('/meetings');
  };

  if (isLoading) return <div>로딩중</div>;
  if (!data) return <div>데이터 없음</div>;
  return (
    <>
      <Header title="일정 상세" onClickBack={onClickBack} />
      <div className="min-h-screen">
        <PlanDetailMain planData={data.data} />
      </div>
    </>
  );
}
