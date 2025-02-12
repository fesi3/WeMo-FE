import { useState } from 'react';
import LightningMap from '@/components/lightning/LightningMap';
import LightningList from '@/components/lightning/LightningList';
import LightningFilter from '@/components/lightning/LightningFilter';
import LightningCreateContainer from '@/components/lightning/LightningCreateContainer';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
// import { LightningMeetup } from '@/types/lightningType';
import { useLightningMeetups } from '@/hooks/useLightningMeetups';
import axiosInstance from '@/utils/axios';
import { GetServerSideProps } from 'next';

const INITIAL_COORDINATE = { lat: 37.5664056, lng: 126.9778222 };

const LightningPage = () => {
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

  const { data: meetups, refetch } = useLightningMeetups(
    mapCenter.lat,
    mapCenter.lng,
    10,
    filters,
  );

  return (
    <HydrationBoundary>
      <div>
        <LightningFilter onUpdateFilters={handleUpdateFilters} />
        <LightningMap
          filters={filters}
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          refetchMeetups={refetch}
        />
        <LightningList meetups={meetups || []} />
        <LightningCreateContainer />
      </div>
    </HydrationBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  const initialCoordinate = { lat: 37.5664056, lng: 126.9778222 };

  try {
    const { data } = await axiosInstance.get(
      `/api/lightnings?latitude=${initialCoordinate.lat}&longitude=${initialCoordinate.lng}&radius=1&size=10`,
    );

    console.log('SSR에서 받은 데이터:', data);

    await queryClient.prefetchQuery({
      queryKey: [
        'lightningMeetups',
        initialCoordinate.lat,
        initialCoordinate.lng,
        10,
        {},
      ],
      queryFn: () => Promise.resolve(data.data.lightningList || []),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    return { props: { dehydratedState: dehydrate(queryClient) } };
  }
};

export default LightningPage;
