import { useState } from 'react';
import LightningMap from '@/components/lightning/LightningMap';
import LightningList from '@/components/lightning/LightningList';
import LightningFilter from '@/components/lightning/LightningFilter';
import { GetServerSideProps } from 'next';
import axiosInstance from '@/api/axiosInstance';
import { LightningMeetup } from '@/types/lightningType';
import { useLightningMeetups } from '@/hooks/useLightningMeetups';

const INITIAL_COORDINATE = { lat: 37.5664056, lng: 126.9778222 };

interface LightningPageProps {
  initialMeetups: LightningMeetup[];
}

const LightningPage = ({ initialMeetups }: LightningPageProps) => {
  const [filters, setFilters] = useState<{
    type: number | null;
    time: number | null;
  }>({
    type: null,
    time: null,
  });
  const handleUpdateFilters = (
    newFilters: Partial<{ type: number | null; time: number | null }>,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  const [mapCenter, setMapCenter] = useState(INITIAL_COORDINATE);

  // React Query를 이용
  const { data: meetups, refetch } = useLightningMeetups(
    37.5664056, // 초기 위도
    126.9778222, // 초기 경도
    10, // size (최대 불러올 개수)
    initialMeetups, // 초기 SSR 데이터
    filters, // 필터 적용
  );
  return (
    <div>
      <LightningFilter onUpdateFilters={handleUpdateFilters} />
      <LightningMap
        initialMeetups={initialMeetups}
        filters={filters}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        refetchMeetups={refetch}
      />
      <LightningList meetups={meetups || []} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialCoordinate = { lat: 37.5664056, lng: 126.9778222 };

  try {
    const { data } = await axiosInstance.get(
      `/api/lightnings?latitude=${initialCoordinate.lat}&longitude=${initialCoordinate.lng}&radius=1&size=10`,
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
