import { useState } from 'react';

const LightningFilter = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const applyFilter = () => {
    console.log('필터 적용:', { category, time });
    // 필터 적용 후에 api 호출
  };

  return (
    <div>
      <h2>필터</h2>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">카테고리 선택</option>
        <option value="운동">운동</option>
        <option value="취미">취미</option>
        <option value="카풀">카풀</option>
      </select>

      <select onChange={(e) => setTime(e.target.value)}>
        <option value="">시간 선택</option>
        <option value="출근 전">출근 전</option>
        <option value="점심">점심</option>
        <option value="퇴근 후">퇴근 후</option>
      </select>

      <button onClick={applyFilter}>필터 적용</button>
    </div>
  );
};

export default LightningFilter;
