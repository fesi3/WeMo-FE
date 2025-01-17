import React from 'react';
import Card from './Card';
import { PlanData } from '../../types/plans';

interface CardListProps {
  plans: PlanData[];
}

const CardList: React.FC<CardListProps> = ({ plans }) => {
  if (plans.length === 0) {
    return (
      <div className="flex w-full max-w-md flex-col items-center justify-center p-4 text-center text-gray-500">
        {/* 원하는 문구나 이미지를 넣으면 됩니다 */}
        일정이 없습니다.
      </div>
    );
  } else {
    return (
      <div className="flex w-full max-w-md flex-col space-y-4 p-4 md:space-y-4 lg:space-y-8">
        {plans.map((plan) => (
          <Card key={plan.planId} {...plan} />
        ))}
      </div>
    );
  }
};

export default CardList;
