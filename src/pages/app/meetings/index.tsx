import { useState } from 'react';
import { GetServerSideProps } from 'next';
//import instance from '@/utils/axios';
import ssrInstance from '@/utils/axios';
//import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
//import { InfiniteData } from '@tanstack/react-query';
import Header from '@/components/shared/layout/Header';
import CardList from '@/components/meetings/card/CardList';
import MeetingsSortDropdown, {
  meetingsortOptions,
} from '@/components/meetings/MeetingsSortDropdown';
import CategoryDropdown, {
  categories,
} from '@/components/meetings/dropdown/CategoryDropdown';
//import { fetchMeetings } from '@/api/fetchMeetings';
//import { FetchMeetingsResponse, Meeting } from '@/types/api/meetingList';
import { useInfiniteScroll } from '@/hooks/useScrollObserver';
import { useMeetings } from '@/hooks/useMeetingsQuery';
import { InfiniteData } from '@tanstack/react-query';
import { FetchMeetingsResponse, Meeting } from '@/types/api/meetingList';

interface MeetingsPageProps {
  initialMeetings: Meeting[];
  nextCursor: number | null;
}

const MeetingsPage = ({ initialMeetings, nextCursor }: MeetingsPageProps) => {
  // 정렬 및 카테고리 상태
  const [selectedSort, setSelectedSort] = useState(meetingsortOptions[0].value);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categories[0].id,
  );

  // 기본 정렬 및 카테고리 값
  const defaultSort = meetingsortOptions[0].value;
  const defaultCategory = categories[0].id;

  // SSR로 전달받은 초기 데이터를 React Query에 전달
  const initialData: InfiniteData<FetchMeetingsResponse, null> = {
    pages: [{ meetingList: initialMeetings, nextCursor }],
    pageParams: [null],
  };

  // 기본 정렬/카테고리인 경우에만 initialData 사용
  const queryInitialData =
    selectedSort === defaultSort && selectedCategory === defaultCategory
      ? initialData
      : undefined;

  // 커스텀 훅을 통해 무한 스크롤 관련 데이터 및 메서드 획득
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMeetings({
    sort: selectedSort,
    category: selectedCategory,
    initialData: queryInitialData,
  });

  // 모임 데이터를 하나의 배열로 병합합
  const meetings =
    (
      data as unknown as InfiniteData<FetchMeetingsResponse, null>
    )?.pages.flatMap((page) => page.meetingList) || [];

  //const meetings = data?.pages.flatMap((page) => page.meetingList) || [];
  // 타입 오류로 강제 캐스팅, 추후 타입 정의 검토 리팩토링 예정

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
    <div className="mx-auto max-w-7xl px-4 py-4">
      <Header title="모임 목록" />
      <div className="mb-4 inline-flex gap-4">
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
      <div ref={loaderRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage && <span>Loading...</span>}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await ssrInstance.get('/api/meetings', {
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
