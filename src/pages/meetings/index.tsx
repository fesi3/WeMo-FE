import { useEffect, useState } from 'react';
import instance from '@/api/axiosInstance';
import Header from '@/components/shared/layout/Header';
import CardList from '@/components/meetings/card/CardList';
import { Meeting } from '@/components/meetings/card/Card';

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const cookie = document.cookie || ''; // 브라우저 환경에서 쿠키 가져오기
        const isLoggedIn = cookie.includes('accessToken'); // 로그인 여부 판단

        const response = await instance.get('/api/meetings', {
          withCredentials: isLoggedIn,
        });
        setMeetings(response.data.data.meetingList);
      } catch (error) {
        console.error('모임 목록 불러오기 실패', error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Header title="모임 목록" />
      <CardList meetings={meetings} />
    </div>
  );
};

export default MeetingPage;
