import { useQueryClient } from '@tanstack/react-query';
import Input from '../shared/input';
import { PlanListResponse } from '@/types/plans';
import SearchResultCardList from './searchResultCardList';

interface SearchContentsProps {
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchKeyword: string | null;
  handleClose: () => void;
}

function SearchContents({
  handleSearchInputChange,
  searchKeyword,
  handleClose,
}: SearchContentsProps) {
  const queryClient = useQueryClient();
  const searchData = queryClient.getQueryData<PlanListResponse>([
    'searchKeyword',
  ]);

  const planList = searchData?.data ? searchData?.data.planList : [];
  const planCount = searchData?.data ? searchData?.data.planCount : 0;

  return (
    <div className="flex max-h-full w-full flex-col lg:items-center">
      {/* 서치 바  */}
      <Input
        id="search"
        placeholder={'찾고 싶은 모임을 검색해 보세요!'}
        className="h-12 max-w-[724px] flex-grow-0 rounded-[20px] lg:w-[724px]"
        onClick={(e) => e.stopPropagation()}
        onChange={handleSearchInputChange}
        autoFocus
      />
      {/* 안내 텍스트  */}
      <div className="mt-[38px] flex w-full flex-col items-center md:items-start lg:w-[724px]">
        <span className="text- h-6 font-semibold text-primary-100">
          {searchKeyword
            ? planCount
              ? `"${searchKeyword}"에 대한 검색 결과`
              : `"${searchKeyword}"에 대한 검색 결과가 없습니다.`
            : ''}
        </span>
        {/* 검색 결과 카드 리스트 */}
        {searchData && (
          <SearchResultCardList planList={planList} handleClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default SearchContents;
