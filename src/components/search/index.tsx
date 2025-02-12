import GNBItem from '../gnb/item';
import Input from '../shared/input';

interface SearchProps {
  handleSearchBarClick: () => void;
}

function Search({ handleSearchBarClick }: SearchProps) {
  return (
    <div
      className="relative mx-6 flex flex-1 cursor-pointer items-center"
      onClick={handleSearchBarClick}
    >
      <Input
        id="search"
        type="text"
        placeholder={'어떤 모임 찾으세요?'}
        className="pointer-events-none h-1 rounded-3xl bg-[#F4F4F4] text-sm md:h-1"
        disabled
      />
      <div className="absolute right-3">
        <GNBItem name={'검색'} isHeader isRouteDisabled />
      </div>
    </div>
  );
}

export default Search;
