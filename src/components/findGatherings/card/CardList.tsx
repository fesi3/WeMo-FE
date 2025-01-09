import React from 'react';
import Card from './Card';

type PlanData = {
  planId: string;
  planName: string;
  dateTime: string;
  registrationEnd: string;
};

interface CardListProps {
  plans: PlanData[];
}

const CardList: React.FC<CardListProps> = ({ plans }) => {
  return (
    <div className="flex w-full max-w-md flex-col space-y-4 bg-gray-100 p-4 md:space-y-4 lg:space-y-8">
      {plans.map((plan) => (
        <Card
          key={plan.planId}
          title={plan.planName}
          dateTime={plan.dateTime}
          registrationEnd={plan.registrationEnd}
        />
      ))}
    </div>
  );
};

export default CardList;
