import Card from './Card';
import { Meeting } from './Card';

const CardList = ({ meetings }: { meetings: Meeting[] }) => {
  return (
    <div className="grid gap-4">
      {meetings.map((meeting) => (
        <Card key={meeting.meetingId} meeting={meeting} />
      ))}
    </div>
  );
};

export default CardList;
