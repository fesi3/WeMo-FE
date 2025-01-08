import React from 'react';
import Card from './Card';

type PlanData = {
  planId: string;
  planName: string;
  dateTime: string;
  registrationEnd: string;
  content: string;
};

interface CardListProps {
  plans: PlanData[];
}

const CardList: React.FC<CardListProps> = ({ plans }) => {
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

export default CardList;
