// import SearchResultCard from './searchResultCard';
// import { PlanListResponse } from '@/types/plans';
// import { useQueryClient } from '@tanstack/react-query';

function SearchResultCardList() {
  //   const queryClient = useQueryClient();
  //   // [수정 필요] select한 data가 취득이 되지 않는 이유는???
  //   const data = queryClient.getQueryData<PlanListResponse>(['searchKeyword']);
  //   const { planList } = data.data;
  //   console.log(planList, '---planList---');
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mt-[10px] flex h-[58vh] w-full flex-col items-center gap-3 overflow-y-scroll rounded-lg md:mt-[41px] md:h-[58vh] md:w-[446px] [&::-webkit-scrollbar]:hidden"
    >
      {/* {planList.map((plan) => (
        <SearchResultCard props={plan} />
      ))} */}
    </div>
  );
}

export default SearchResultCardList;
