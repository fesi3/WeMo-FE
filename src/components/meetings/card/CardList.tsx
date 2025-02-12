import Card from './Card';
import { Meeting } from '@/types/api/meetingList';

const CardList = ({ meetings }: { meetings: Meeting[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {meetings.map((meeting) => (
        <Card key={meeting.meetingId} meeting={meeting} />
      ))}
    </div>
  );
};

export default CardList;
