import { GET_PLAN_DETAIL_RESPONSE } from '@/types/api/plan';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PlanDetailMain from '@/components/plans/PlanDetailMain';
import Header from '@/components/shared/layout/Header';

export default function PlanDetailPage() {
  const [mock, setMock] = useState<GET_PLAN_DETAIL_RESPONSE | null>(null);
  const router = useRouter();
  const planId = router.query.id;
  const getPlanDetail = async () => {
    try {
      const { data } = await axios.get<GET_PLAN_DETAIL_RESPONSE>(
        `https://677e23a294bde1c1252a8cc0.mockapi.io/plans/${planId}`,
      );
      setMock(data);
    } catch {
      console.log('패치에러');
      setMock(null);
    }
  };

  useEffect(() => {
    if (planId) getPlanDetail();
  }, [planId]);

  //추후에 일정찾기로 갈지, 부모 모임으로 갈지 고민
  const onClickBack = () => {
    router.push('/meetings');
  };
  return (
    <>
      <Header title="일정 상세" onClickBack={onClickBack} />
      <div className="min-h-screen">
        <PlanDetailMain planData={mock?.data} />
      </div>
    </>
  );
}
