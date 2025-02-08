import { LightningMeetup } from '@/types/lightningType';

interface LightningListProps {
  meetups: LightningMeetup[];
}

const LightningList = ({ meetups }: LightningListProps) => {
  return (
    <div>
      <h2>모임 리스트</h2>
      <ul>
        {meetups.map((meetup) => (
          <li key={meetup.lightningId}>
            <strong>{meetup.lightningName}</strong> - {meetup.lightningType} (
            {meetup.lightningTime})<p>장소: {meetup.address}</p>
            <p>시간: {meetup.lightningDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LightningList;
