/**
 * 카드 컴포넌트 확인하기 위해 메인페이지에 불러옴.
 * 실제로는 card-list 컴포넌트 만들어서 가져올 예정.
 */
import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Card from '../../components/findGatherings/card/Card';

type PlanData = {
  planId: number;
  planName: string;
  dateTime: string;
  registrationEnd: string;
  content: string;
};

const Home: NextPage = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);

  useEffect(() => {
    // 예시 데이터, 실제로는 API 호출하여 데이터를 받아옴.
    const sample = [
      {
        planId: 1,
        planName: '달램핏 오피스 스트레칭',
        dateTime: '2025-01-07T17:50:00',
        registrationEnd: '2025-01-07T21:00:00',
        content: '오피스에서 간단 스트레칭 모임',
      },
      {
        planId: 2,
        planName: '코딩딩 오프라인 모임',
        dateTime: '2025-01-15T17:00:00',
        registrationEnd: '2025-01-15T21:00:00',
        content: '코딩 및 네트워킹',
      },
    ];
    setPlans(sample);
  }, []);

  return (
    <div className="flex min-h-screen flex-wrap justify-center bg-gray-100 p-4">
      {plans.map((plan) => (
        <Card
          key={plan.planId}
          title={plan.planName}
          dateTime={plan.dateTime}
          registrationEnd={plan.registrationEnd}
          content={plan.content}
        />
      ))}
    </div>
  );
};

export default Home;
