import Input from '../shared/input';

function SearchForm() {
  return (
    <div className="flex max-h-full w-full flex-col lg:items-center">
      {/* 서치 바  */}
      <Input
        id="search"
        placeholder="찾고 싶은 모임을 입력해주세요."
        className="h-12 flex-grow-0 rounded-[20px] lg:w-[724px]"
        onClick={(e) => e.stopPropagation()}
        autoFocus
      />
      {/* 안내 텍스트  */}
      <div className="mt-[38px] flex w-full flex-col items-center md:items-start lg:w-[724px]">
        <span className="text- font-semibold text-primary-100">
          {'모임에 대한 검색 결과'}
        </span>
        {/* 검색 결과 카드 리스트 */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-[10px] flex h-[58vh] w-full flex-col items-center gap-3 overflow-y-scroll rounded-b-sm rounded-t-lg md:mt-[41px] md:h-[58vh] md:w-[446px] [&::-webkit-scrollbar]:hidden"
        >
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4">
            <div className="h-[100px] bg-gray-200">이미지</div>
            <div className="text-lg font-semibold">달랭핏 오피스 운동모임</div>
            <div className="text-sm text-gray-500">
              오피스에서 운동하는 사람들
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
