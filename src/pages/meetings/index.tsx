import { useEffect, useState } from 'react';
import axios from '@/api/axiosInstance';
import CardList from '@/components/meetings/card/CardList';
import { Meeting } from '@/components/meetings/card/Card';

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('/api/meetings', {
          withCredentials: false, //추후 수정(회원/비회원)
        });
        setMeetings(response.data.data.meetingList);
      } catch (error) {
        console.error('모임 목록 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-4">
      {loading ? <p>Loading...</p> : <CardList meetings={meetings} />}
    </div>
  );
};

export default MeetingPage;
