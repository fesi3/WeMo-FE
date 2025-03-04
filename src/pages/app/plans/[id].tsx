import PlanDetailMain from '@/entities/plan/planDetail/PlanDetailMain';
import Header from '@/widgets/Header';
import { useRouter } from 'next/router';

interface PlanDetailProps {
  idNum: number;
}

export function PlanDetail({ idNum }: PlanDetailProps) {
  const router = useRouter();
  return (
    <>
      <Header
        title="일정 상세"
        onClickBack={() => {
          router.push('/app/plans');
        }}
      />
      <div className="mx-auto min-h-screen max-w-screen-md">
        <PlanDetailMain id={idNum} />
      </div>
    </>
  );
}
