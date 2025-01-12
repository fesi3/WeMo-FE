import React from 'react';
import Card from './Card';

//타입 파일 따로 생성하면, 불러오도록 수정
interface PlanData {
  planId: string;
  planName: string;
  registrationEnd: string;
  dateTime: string;
  meetingName: string;
  province: string;
  district: string;
  participants: string;
  capacity: string;
  isOpened: boolean;
  isLiked: boolean;
}

interface CardListProps {
  plans: PlanData[];
}

const CardList: React.FC<CardListProps> = ({ plans }) => {
  return (
    <div className="flex w-full max-w-md flex-col space-y-4 bg-gray-100 p-4 md:space-y-4 lg:space-y-8">
      {plans.map((plan) => (
        <Card key={plan.planId} {...plan} />
      ))}
    </div>
  );
};

export default CardList;
