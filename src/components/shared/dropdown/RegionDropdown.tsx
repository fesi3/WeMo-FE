import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Dropdown from '@/components/shared/dropdown/DropDown';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

// const regionOptions: RegionOption[] = [
//   {
//     id: 1,
//     name: '서울',
//     subRegions: [
//       { id: 101, name: '양천구' },
//       { id: 102, name: '강동구' },
//       { id: 103, name: '구로구' },
//     ],
//   },
//   {
//     id: 2,
//     name: '경기',
//     subRegions: [
//       { id: 201, name: '수원시' },
//       { id: 202, name: '성남시' },
//       { id: 203, name: '용인시' },
//     ],
//   },
// ];

interface RegionDropdownProps {
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption | null) => void;
  onSubRegionChange: (subRegion: SubRegionOption | null) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange,
}: RegionDropdownProps) => {
  const [provinces, setProvinces] = useState<RegionOption[]>([]);
  const [districts, setDistricts] = useState<SubRegionOption[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchProvinceList = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/regions/province`);
        const { provinceList } = res.data.data;
        setProvinces(provinceList);
        //null일 때 처리 로직 추가 필요
      } catch (error) {
        console.error('시, 도 데이터 가져오지 못함: ', error);
      }
    };
    fetchProvinceList();
  }, []);

  const handleProvinceSelect = async (province: RegionOption) => {
    // "전체" 항목 체크 로직 (id=0이면 전체)
    if (province.id === 0) {
      onRegionChange(province); // or onRegionChange(null) → 필터 해제
      onSubRegionChange(null);
      setDistricts([]); // 서브 지역 초기화
      return;
    }
    // 일반 케이스
    onRegionChange(province);
    // onSubRegionChange(null); // 서브 지역 초기화

    //district 목록 가져오기
    try {
      const res = await axios.get(
        `${baseUrl}/api/regions/district?provinceId=${province.id}`,
      );
      const { provinceList } = res.data.data;
      setDistricts(provinceList);
      //null일 때 처리 로직 추가 필요
    } catch (error) {
      console.error('구,도 데이터 가져오지 못함', error);
    }
  };

  const handleDistrictSelect = (district: SubRegionOption) => {
    if (district.id === 0) {
      onSubRegionChange(null);
      return;
    }
    onSubRegionChange(district);
  };

  useEffect(() => {
    if (!selectedRegion) {
      setDistricts([]);
    }
  }, [selectedRegion]);

  const extendedProvinces: RegionOption[] = [
    { id: 0, name: '전체', subRegions: [] },
    ...provinces,
  ];

  const extendedDistricts: SubRegionOption[] = [
    { id: 0, name: '전체' },
    ...districts,
  ];

  return (
    <div className="flex gap-4">
      {/* 상위 지역 드롭다운 */}
      <Dropdown
        options={extendedProvinces}
        selectedOption={selectedRegion}
        onSelect={handleProvinceSelect}
        placeholder="지역 선택"
      />

      {/* 하위 카테고리 드롭다운 */}
      <Dropdown
        options={extendedDistricts} // 상위 지역에 따라 하위 카테고리 표시
        selectedOption={selectedSubRegion}
        onSelect={handleDistrictSelect}
        placeholder={selectedRegion ? '하위 지역' : '지역 먼저 선택'}
        className={!selectedRegion ? 'pointer-events-none opacity-50' : ''} // 지역 선택 안 했을 때 비활성화
      />
    </div>
  );
};

export default RegionDropdown;
