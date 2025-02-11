import { useEffect, useState, useRef } from 'react';

/**
 * GNBHeader(헤더)의 높이를 동적으로 가져오는 커스텀 훅
 * 헤더 높이를 계산하여 sticky 요소의 top 값을 자동으로 조정
 *
 * @returns {Object} headerRef - 헤더 요소의 ref
 * @returns {number} headerHeight - 동적으로 계산된 헤더 높이 (기본값: 56px)
 */

const useHeaderHeight = () => {
  const headerRef = useRef<HTMLDivElement>(null); // 헤더 요소를 참조하기 위한 ref
  const [headerHeight, setHeaderHeight] = useState(56); // 기본값 (헤더 기본 높이 56px)

  useEffect(() => {
    // 헤더 요소가 존재하면 높이를 계산하여 state에 저장
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  return { headerRef, headerHeight };
};

export default useHeaderHeight;
