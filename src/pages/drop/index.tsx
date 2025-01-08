import React, { useState } from 'react';
import Dropdown from '@/components/shared/DropDown';

interface Option {
  id: number;
  name: string;
  subOptions?: Option[];
}

export default function Reviews() {
  const options1 = [
    { id: 1, name: '김민규' },
    { id: 2, name: '김세환' },
    { id: 3, name: '김선화' },
  ];
  const options: Option[] = [
    {
      id: 1,
      name: '서울시',
      subOptions: [
        { id: 101, name: '양천구' },
        { id: 102, name: '동대문구' },
        { id: 103, name: '구로구' },
      ],
    },
    {
      id: 2,
      name: '강릉시',
      subOptions: [
        { id: 201, name: '옥계면' },
        { id: 202, name: '사천면' },
      ],
    },
    {
      id: 3,
      name: '울산시',
      subOptions: [
        { id: 301, name: '남구' },
        { id: 302, name: '중구' },
      ],
    },
  ];

  const [selectedCity1, setSelectedCity1] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">Headless UI 드롭다운</h1>
      <div className="mb-4">
        <Dropdown
          options={options1}
          selectedOption={selectedCity1}
          onSelect={(option1) => {
            setSelectedCity1(option1);
          }}
          placeholder="이름 선택"
        />
      </div>

      {/* 첫 번째 드롭다운 */}
      <div className="flex">
        <Dropdown
          options={options}
          selectedOption={selectedCity}
          onSelect={(option) => {
            setSelectedCity(option);
            setSelectedDistrict(null); // 새로운 도시 선택 시 하위 옵션 초기화
          }}
          placeholder="도시 선택"
        />

        {/* 두 번째 드롭다운 */}
        {selectedCity?.subOptions && (
          <div className="ml-4 w-[8rem]">
            <Dropdown
              options={selectedCity.subOptions}
              selectedOption={selectedDistrict}
              onSelect={setSelectedDistrict}
              placeholder="구/군 선택"
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">선택 결과:</h2>
        <p>도시: {selectedCity?.name || '없음'}</p>
        <p>구/군: {selectedDistrict?.name || '없음'}</p>
      </div>
    </div>
  );
}
