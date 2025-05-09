import { PlanDataWithCategory } from '@/shared/types/plans';
import SearchResultCard from './searchResultCard';

interface SearchResultCardListProps {
  handleClose: () => void;
  planList?: PlanDataWithCategory[];
}

function SearchResultCardList({
  handleClose,
  planList,
}: SearchResultCardListProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-[10px] flex h-[36vh] w-full flex-col items-center gap-3 overflow-y-scroll rounded-lg md:w-[446px] [&::-webkit-scrollbar]:hidden"
    >
      {planList
        ? planList.map((plan) => (
            <SearchResultCard props={plan} handleClose={handleClose} />
          ))
        : ''}
    </div>
  );
}

export default SearchResultCardList;
