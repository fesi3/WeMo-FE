import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';
import Dropdown from '@/components/shared/dropdown/DropDown';

const categories = [
  { id: 1, name: '밥친구' },
  { id: 2, name: '운동' },
  { id: 3, name: '카풀' },
];

const times = [
  { id: 1, name: '출근 전' },
  { id: 2, name: '점심' },
  { id: 3, name: '퇴근 후' },
];

interface LightningFilterProps {
  onUpdateFilters: (filters: {
    type: number | null;
    time: number | null;
  }) => void;
}

const LightningFilter = ({ onUpdateFilters }: LightningFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleApplyFilter = () => {
    onUpdateFilters({
      type: selectedCategory,
      time: selectedTime ? selectedTime.id : null,
    });
  };

  return (
    <div className="flex w-full flex-col px-4 py-2">
      {/* 필터 제목 */}

      <div className="flex w-full">
        <h2 className="mb-4 mt-2 text-lg font-semibold">
          내 주변 번개팟 <span className="text-yellow-500">⚡</span>
        </h2>
      </div>

      {/* 필터 버튼 */}
      <div className="flex items-start gap-3">
        {/* 카테고리 선택 버튼 */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category.id
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}

        {/* 시간 선택 드롭다운 */}
        <Dropdown
          options={times}
          selectedOption={selectedTime}
          onSelect={setSelectedTime}
          placeholder="시간 선택"
          customTrigger={
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-md">
              {selectedTime ? selectedTime.name : '시간 선택'}
              <FunnelIcon className="h-5 w-5 text-gray-500" />
            </button>
          }
        />

        {/* 필터 적용 버튼 */}
        <button
          onClick={handleApplyFilter}
          className="flex items-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default LightningFilter;
