import React from 'react';
import Card from './Card';
import { PlanData } from '@/types/plans';

interface CardListProps {
  plans: PlanData[];
}

const CardList: React.FC<CardListProps> = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center p-4 text-center text-gray-500">
        일정이 없습니다.
      </div>
    );
  } else {
    return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.planId} {...plan} />
        ))}
      </div>
    );
  }
};

export default CardList;
