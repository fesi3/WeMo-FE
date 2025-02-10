import { useState, useEffect } from 'react';
import { LightningMeetup } from '@/types/lightningType';
import { fetchLightningMeetups } from '@/api/fetchLightningMeetups';

export default function useMeetingFetcher(latitude: number, longitude: number) {
  const [meetups, setMeetups] = useState<LightningMeetup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetups = async (lat: number, lng: number) => {
    setIsLoading(true);
    setError(null);

    const meetupsData = await fetchLightningMeetups(lat, lng);
    setMeetups(meetupsData);

    setIsLoading(false);
    return meetupsData;
  };

  useEffect(() => {
    fetchMeetups(latitude, longitude);
  }, [latitude, longitude]);

  return { meetups, fetchMeetups, isLoading, error };
}
