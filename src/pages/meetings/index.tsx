import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import instance from '@/api/axiosInstance';
import Header from '@/components/shared/layout/Header';
import CardList from '@/components/meetings/card/CardList';
import MeetingsSortDropdown, {
  meetingsortOptions,
} from '@/components/meetings/MeetingsSortDropdown';
import CategoryDropdown, {
  categories,
} from '@/components/meetings/dropdown/CategoryDropdown';
import { fetchMeetings } from '@/api/fetchMeetings';
import { FetchMeetingsResponse, Meeting } from '@/types/api/meetingList';

interface MeetingsPageProps {
  initialMeetings: Meeting[];
  nextCursor: number | null;
}

const MeetingsPage = ({ initialMeetings, nextCursor }: MeetingsPageProps) => {
  const queryClient = useQueryClient();
  const [selectedSort, setSelectedSort] = useState(meetingsortOptions[0]);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  } | null>(categories[0]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    //refetch,
  } = useInfiniteQuery<
    FetchMeetingsResponse,
    Error,
    InfiniteData<FetchMeetingsResponse>,
    [string, string | undefined, number | undefined],
    number | null
  >({
    queryKey: [
      'meetings',
      selectedSort?.value,
      selectedCategory?.id === 0 ? undefined : selectedCategory?.id,
    ],
    queryFn: fetchMeetings,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    initialData: {
      pages: [{ meetingList: initialMeetings, nextCursor }],
      pageParams: [null],
    },
  });

  const meetings = data?.pages.flatMap((page) => page.meetingList) || [];

  // 상태 변경 직후 refetch 실행 (최신 상태 반영 보장)
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['meetings'] }); // 객체 형태로 수정하여 타입 오류 해결
  }, [selectedSort, selectedCategory, queryClient]);

  // 정렬 변경 시 상태 업데이트 후 useEffect에서 자동 반영
  const handleSortChange = (
    option: { id: number; name: string; value: string } | null,
  ) => {
    setSelectedSort(option || meetingsortOptions[0]);
  };

  // 카테고리 변경 시 상태 업데이트 후 useEffect에서 자동 반영
  const handleCategoryChange = (
    option: { id: number; name: string } | null,
  ) => {
    setSelectedCategory(option);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Header title="모임 목록" />
      <div className="mb-4 flex space-x-4">
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
        <MeetingsSortDropdown
          selectedSort={selectedSort}
          onChange={handleSortChange}
        />
      </div>
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
