import React, { useState, useEffect } from 'react';
import PlanFilter from './PlanFilter';
import EditMeetingButton from './editMeeting/EditMeetingButton';
import PlanList from './PlanList';
import { PlanDataWithCategory } from '@/types/plans';
import { RegionOption, SubRegionOption } from '@/types/reviewType';

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
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div>
      {/* PlanFilter 컴포넌트 */}
      <div
        className={`sticky ${
          selectedCategory === '워케이션' ? 'top-0' : 'top-[50px]'
        } z-10 bg-white`}
      >
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
      </div>
      {isAuthenticated && (
        <div className="mb-6 flex justify-end">
          <EditMeetingButton />
        </div>
      )}
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
