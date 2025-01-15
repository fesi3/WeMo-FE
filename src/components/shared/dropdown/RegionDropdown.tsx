import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Dropdown from '@/components/shared/dropdown/DropDown';
import { RegionOption, SubRegionOption } from '@/components/types/reviewType';

interface RegionDropdownProps {
  selectedRegion: RegionOption | null;
  selectedSubRegion: SubRegionOption | null;
  onRegionChange: (region: RegionOption | null) => void;
  onSubRegionChange: (subRegion: SubRegionOption | null) => void;
}

// API에서 내려오는 raw 데이터 타입 지정
interface RawProvince {
  provinceId: number;
  name: string;
  subRegions?: SubRegionOption[];
}

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
    const fetchProvinceList = async () => {
      try {
        const res = await axios.get<{ data: { provinceList: RawProvince[] } }>(
          `${baseUrl}/api/regions/province`,
        );
        const rawProvinceList = res.data.data.provinceList;
        const provinceList: RegionOption[] = rawProvinceList.map(
          (item: RawProvince) => ({
            id: item.provinceId,
            name: item.name,
            subRegions: item.subRegions || [],
          }),
        );
        setProvinces(provinceList);
      } catch (error) {
        console.error('시, 도 데이터 가져오지 못함: ', error);
      }
    };
    fetchProvinceList();
  }, [baseUrl]);

  // 선택된 selectedRegion이 변경되면 해당 id를 이용하여 districts fetch
  useEffect(() => {
    if (selectedRegion && selectedRegion.id !== 0) {
      const fetchDistrictList = async () => {
        try {
          const res = await axios.get(
            `${baseUrl}/api/regions/district?provinceId=${selectedRegion.id}`,
          );
          const { provinceList } = res.data.data;
          setDistricts(Array.isArray(provinceList) ? provinceList : []);
          //setDistricts(provinceList);
        } catch (error) {
          console.error('구, 도 데이터 가져오지 못함', error);
        }
      };
      fetchDistrictList();
    } else {
      setDistricts([]);
    }
  }, [selectedRegion, baseUrl]);

  // 드롭다운에서 직접 선택했을 때 처리
  const handleProvinceSelect = (province: RegionOption) => {
    console.log('handleProvinceSelect 내부 province:', province);
    // "전체" 옵션 (id===0) 처리
    if (province.id === 0) {
      onRegionChange(province); // 또는 onRegionChange(null) 등 원하는 로직 적용
      onSubRegionChange(null);
      setDistricts([]);
      return;
    }
    onRegionChange(province);
    onSubRegionChange(null);
    // district fetching은 useEffect에서 처리됨
  };

  const handleDistrictSelect = (district: SubRegionOption) => {
    if (district.id === 0) {
      onSubRegionChange(null);
      return;
    }
    onSubRegionChange(district);
  };

  // "전체" 옵션을 항상 포함시킴 (데이터가 있든 없든)
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

      {/* 하위 지역 드롭다운 */}
      <Dropdown
        options={extendedDistricts}
        selectedOption={selectedSubRegion}
        onSelect={handleDistrictSelect}
        placeholder={selectedRegion ? '하위 선택' : '지역 먼저 선택'}
        className={!selectedRegion ? 'pointer-events-none opacity-50' : ''}
      />
    </div>
  );
};

export default RegionDropdown;
