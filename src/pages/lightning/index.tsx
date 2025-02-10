import { useState } from 'react';
import LightningMap from '@/components/lightning/LightningMap';
import LightningList from '@/components/lightning/LightningList';
import LightningFilter from '@/components/lightning/LightningFilter';
import { GetServerSideProps } from 'next';
import axiosInstance from '@/api/axiosInstance';
import { LightningMeetup } from '@/types/lightningType';

interface LightningPageProps {
  initialMeetups: LightningMeetup[];
}

const LightningPage = ({ initialMeetups }: LightningPageProps) => {
  const [meetups, setMeetups] = useState<LightningMeetup[]>(initialMeetups);
  return (
    <div>
      <LightningFilter />
      <LightningMap
        initialMeetups={initialMeetups}
        onUpdateMeetups={setMeetups}
      />
      <LightningList meetups={meetups} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialCoordinate = { lat: 37.5664056, lng: 126.9778222 };

  try {
    const { data } = await axiosInstance.get(
      `/api/lightnings?latitude=${initialCoordinate.lat}&longitude=${initialCoordinate.lng}&radius=0.5`,
    );

    console.log('SSR에서 받은 데이터:', data);

    return {
      props: {
        initialMeetups: data.data.lightningList || [],
      },
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { props: { initialMeetups: [] } };
  }
};

export default LightningPage;
