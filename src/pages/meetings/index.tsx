import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import instance from '@/api/axiosInstance';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { InfiniteData } from '@tanstack/react-query';
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
import { useInfiniteScroll } from '@/hooks/useScrollObserver';

interface MeetingsPageProps {
  initialMeetings: Meeting[];
  nextCursor: number | null;
}

const MeetingsPage = ({ initialMeetings, nextCursor }: MeetingsPageProps) => {
  const queryClient = useQueryClient();
  const [selectedSort, setSelectedSort] = useState(meetingsortOptions[0].value);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categories[0].id,
  );

  // React Query의 무한 스크롤 API
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      FetchMeetingsResponse,
      Error,
      FetchMeetingsResponse,
      [string, string | undefined, number | undefined],
      number | null
    >({
      queryKey: ['meetings', selectedSort, selectedCategory], // 최신 상태 반영
      queryFn: fetchMeetings,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      enabled: selectedCategory !== undefined,
      initialData: {
        pages: [{ meetingList: initialMeetings, nextCursor }], // initialMeetings 적용
        pageParams: [null],
      },
    });

  const meetings =
    (
      data as unknown as InfiniteData<FetchMeetingsResponse, number | null>
    )?.pages.flatMap((page) => page.meetingList) || [];

  // 정렬, 카테고리 변경 시 즉시 반영되도록 useEffect 추가
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['meetings'] }); // 쿼리 무효화 후 최신 상태 반영
    //refetch();
  }, [selectedSort, selectedCategory, queryClient]);

  // 정렬 변경 핸들러
  const handleSortChange = (
    option: { id: number; name: string; value: string } | null,
  ) => {
    setSelectedSort(option?.value || meetingsortOptions[0].value);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (
    option: { id: number; name: string } | null,
  ) => {
    setSelectedCategory(option?.id === 0 ? undefined : option?.id);
  };

  // 무한 스크롤 훅 사용
  const { loaderRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Header title="모임 목록" />
      <div className="mb-4 flex space-x-4">
        <CategoryDropdown
          selectedCategory={
            categories.find((c) => c.id === selectedCategory) || categories[0]
          }
          onChange={handleCategoryChange}
        />
        <MeetingsSortDropdown
          selectedSort={
            meetingsortOptions.find((s) => s.value === selectedSort) ||
            meetingsortOptions[0]
          }
          onChange={handleSortChange}
        />
      </div>
      <CardList meetings={meetings} />

      {/* 로딩 요소 */}
      <div ref={loaderRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage && <span>Loading...</span>}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await instance.get('/api/meetings', {
      params: {
        size: 10,
      },
      withCredentials: false,
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
