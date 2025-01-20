import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Dropdown from '@/components/shared/dropdown/DropDown';
import { RegionOption, SubRegionOption } from '@/types/reviewType';
//추후 데이터 형식 응답데이터와 동일하게 리펙토링 필요

interface RawProvince {
  id: number;
  name: string;
  districtList: { id: number; name: string }[];
}

interface RegionDropdownProps {
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption | null) => void;
  onSubRegionChange: (subRegion: SubRegionOption | null) => void;
}

// "전체" 상수 정의
const ALL_OPTION: RegionOption = { id: 0, name: '전체', subRegions: [] };

const RegionDropdown: React.FC<RegionDropdownProps> = ({
  selectedRegion,
  selectedSubRegion,
  onRegionChange,
  onSubRegionChange,
}) => {
  const [provinces, setProvinces] = useState<RegionOption[]>([]);
  const [districts, setDistricts] = useState<SubRegionOption[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    // API 요청으로 모든 지역 데이터 가져오기
    const fetchRegions = async () => {
      try {
        const res = await axios.get<{ data: { provinceList: RawProvince[] } }>(
          `${baseUrl}/api/regions`,
        );
        // 데이터 매핑
        const provinceList: RegionOption[] = res.data.data.provinceList.map(
          (province) => ({
            id: province.id,
            name: province.name,
            subRegions: province.districtList.map((district) => ({
              id: district.id,
              name: district.name,
            })),
          }),
        );

        setProvinces(provinceList);
      } catch (error) {
        console.error('지역 데이터 가져오기 실패: ', error);
      }
    };

    fetchRegions();
  }, [baseUrl]);

  // selectedRegion 변경 시 districts 업데이트
  useEffect(() => {
    if (selectedRegion?.id === 0) {
      onSubRegionChange(ALL_OPTION);
      setDistricts([]);
    } else {
      const province = provinces.find((p) => p.id === selectedRegion?.id);
      setDistricts(province?.subRegions || []);
    }
  }, [selectedRegion, provinces]);

  const handleProvinceSelect = (province: RegionOption) => {
    onRegionChange(province);
    if (province.id === 0) {
      onSubRegionChange(ALL_OPTION);
    } else {
      onSubRegionChange(null);
    }
  };

  const handleDistrictSelect = (district: SubRegionOption) => {
    onSubRegionChange(district.id === 0 ? ALL_OPTION : district);
  };

  // "전체" 옵션을 포함한 데이터 생성
  const extendedProvinces: RegionOption[] = [ALL_OPTION, ...provinces];
  const extendedDistricts: SubRegionOption[] = [ALL_OPTION, ...districts];

  return (
    <div className="flex gap-2 lg:gap-4">
      {/* 상위 지역 드롭다운 */}
      <Dropdown
        options={extendedProvinces}
        selectedOption={selectedRegion}
        onSelect={handleProvinceSelect}
        placeholder="상위 지역"
      />

      {/* 하위 지역 드롭다운 */}
      <Dropdown
        options={extendedDistricts}
        selectedOption={selectedSubRegion}
        onSelect={handleDistrictSelect}
        placeholder={selectedRegion ? '하위 지역' : '전체'}
        className={
          !selectedRegion || selectedRegion.id === 0
            ? 'pointer-events-none opacity-50'
            : ''
        }
      />
    </div>
  );
};

export default RegionDropdown;
