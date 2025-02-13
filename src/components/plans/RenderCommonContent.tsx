import React from 'react';
//import { useSelector } from 'react-redux';
//import { RootState } from '@/redux/store';
import PlanFilter from './PlanFilter';
//import CreateMeetingButton from './editMeeting/CreateMeetingButton';
import PlanList from './PlanList';
import SortDropdown from '../shared/dropdown/SortDropdown';
import { SortOption } from '@/types/reviewType';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
import useHeaderHeight from '@/hooks/useHeaderHeight';

interface RenderCommonContentProps {
  plans: PlanDataWithCategory[];
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRegion: RegionOption | null;
  setSelectedRegion: React.Dispatch<React.SetStateAction<RegionOption | null>>;
  selectedSubRegion: SubRegionOption | null;
  setSelectedSubRegion: React.Dispatch<
    React.SetStateAction<SubRegionOption | null>
  >;
  selectedCategory: string;
  selectedSubCategory: string | null;
  selectedSort: SortOption | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<SortOption | null>>;
}

// Main 페이지 컴포넌트에서 달램핏/워케이션 탭에 공통으로 들어가는 컴포넌트
// 서브카테고리 필터, 모임 만들기 버튼 (인증필요), 일정카드 목록
const RenderCommonContent: React.FC<RenderCommonContentProps> = ({
  plans,
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  selectedSubRegion,
  setSelectedSubRegion,
  selectedCategory,
  selectedSubCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const sortOptions: SortOption[] = [
    { id: 1, name: '최신순', value: 'default' },
    { id: 2, name: '마감임박순', value: 'closeDate' },
  ];

  const { headerHeight } = useHeaderHeight();
  const computedTop =
    selectedCategory === '워케이션' ? headerHeight : headerHeight + 50;

  return (
    <div>
      {/* PlanFilter 컴포넌트 */}
      <div className="sticky z-10 bg-white" style={{ top: `${computedTop}px` }}>
        <div className="flex items-center gap-2 pt-2 lg:gap-4">
          <PlanFilter
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            onRegionChange={(region) => {
              setSelectedRegion(region);
              setSelectedSubRegion(null);
            }}
            onSubRegionChange={(sub) => setSelectedSubRegion(sub)}
          />
          <div className="mb-4">
            <SortDropdown
              sortOptions={sortOptions}
              selectedSort={selectedSort || null}
              onChange={(newSort) => {
                setSelectedSort(newSort);
              }}
            />
          </div>
        </div>
      </div>
      {/* 일정 카드 목록 */}
      <PlanList
        plans={plans || []}
        selectedDate={selectedDate}
        selectedRegion={selectedRegion}
        selectedSubRegion={selectedSubRegion}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  );
};

export default RenderCommonContent;
