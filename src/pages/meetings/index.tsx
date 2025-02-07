import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '@/api/axiosInstance';
import Header from '@/components/shared/layout/Header';
import CardList from '@/components/meetings/card/CardList';
import { Meeting } from '@/components/meetings/card/Card';
import MeetingsSortDropdown from '@/components/meetings/MeetingsSortDropdown';

interface MeetingsPageProps {
  initialMeetings: Meeting[];
  nextCursor: number | null;
}

const fetchMeetings = async ({ pageParam = null }) => {
  const response = await instance.get('/api/meetings', {
    params: {
      cursor: pageParam,
      size: 10,
    },
    withCredentials: true,
  });
  return response.data.data;
};

const MeetingsPage = ({ initialMeetings, nextCursor }: MeetingsPageProps) => {
  const [selectedSort, setSelectedSort] = useState<{
    id: number;
    name: string;
    value: string;
  } | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['meetings', selectedSort?.value],
    queryFn: fetchMeetings,
    initialPageParam: null,
    initialData: {
      pages: [{ meetingList: initialMeetings, nextCursor }],
      pageParams: [null],
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const meetings = data?.pages.flatMap((page) => page.meetingList) || [];

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Header title="모임 목록" />
      <MeetingsSortDropdown
        selectedSort={selectedSort}
        onChange={setSelectedSort}
      />
      <CardList meetings={meetings} />
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 rounded bg-blue-500 p-2 text-white"
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await instance.get('/api/meetings', {
      params: {
        size: 10,
      },
      withCredentials: true,
    });
    return {
      props: {
        initialMeetings: response.data.data.meetingList,
        nextCursor: response.data.data.nextCursor || null,
      },
    };
  } catch (error) {
    console.error('모임 목록 불러오기 실패', error);
    return { props: { initialMeetings: [], nextCursor: null } };
  }
};

export default MeetingsPage;
