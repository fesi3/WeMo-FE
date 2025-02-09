import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/20/solid';

const categories = ['밥친구', '운동', '카풀'];
const times = ['출근 전', '점심', '퇴근 후'];

const LightningFilter = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const applyFilter = () => {
    console.log('필터 적용:', { category, time });
    // 필터 적용 후에 api 호출
  };

  return (
    <div className="flex w-full flex-col items-center px-4 py-2">
      {/* 필터 제목 */}
      <h2 className="mb-4 mt-2 text-lg font-semibold">
        내 주변 번개팟 <span className="text-yellow-500">⚡</span>
      </h2>

      {/* 필터 버튼 */}
      <div className="flex items-center gap-3">
        {/* 카테고리 선택 버튼 */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategory(category)}
            className={`rounded-full px-4 py-2 text-sm ${
              category === category
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}

        {/* 시간 선택 드롭다운 */}
        <select
          onChange={(e) => setTime(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm text-gray-700"
        >
          <option value="">시간 선택</option>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* 필터 아이콘 버튼 */}
        <button onClick={applyFilter} className="text-gray-600">
          <FunnelIcon
            className="h-6 w-6 text-white hover:text-gray-800"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default LightningFilter;
