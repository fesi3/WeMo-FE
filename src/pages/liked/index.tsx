import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlanData } from '@/types/plans';
import { usePageInfiniteScroll } from '@/hooks/usePageInfiniteScroll';
import CardList from '@/components/findGatherings/card/CardList';
import Button from '@/components/shared/Button';
import Header from '@/components/shared/layout/Header';

const LikedPlansPage = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 토큰 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  // 데이터 로드
  const fetchLikedPlans = async (page: number): Promise<boolean> => {
    if (!accessToken) return false;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/plans/like?page=${page}&size=10`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const newPlans: PlanData[] = response.data.content;

      if (newPlans.length > 0) {
        setPlans((prevPlans) => [
          ...prevPlans,
          ...newPlans.filter(
            (newPlan) =>
              !prevPlans.some((prevPlan) => prevPlan.planId === newPlan.planId),
          ),
        ]);
      }

      return newPlans.length > 0;
    } catch (err) {
      console.error('찜한록을 불러오지 못함: ', err);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
    return false; // 데이터가 없으면 false 반환
  };

  // 페이지 기반 무한 스크롤
  const { loaderRef } = usePageInfiniteScroll({
    fetchMore: fetchLikedPlans, // 데이터를 가져오는 로직 전달
    initialPage: 1, // 초기 페이지
    onPageLoadComplete: (dataAvailable) => {
      if (!dataAvailable) {
        console.log('더 이상 불러올 데이터가 없습니다.');
      }
    },
  });

  //토큰 없을 때 -> 윤성님이 처리해주시면 됩니다!
  //   if (!accessToken) {
  //     return (
  //       <div>
  //         <p> 로그인 후 이용 가능합니다.</p>
  //       </div>
  //     );
  //   }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      {/* 헤더 */}
      <Header title="찜한 일정" onClickBack={handleBack} />
      {plans.length === 0 && !isLoading && (
        <div className="mt-20 flex flex-col items-center justify-center">
          {/* 하트 이미지 */}
          <img
            src="/assets/like-page-heart.svg"
            alt="찜한 모임 없음"
            className="mb-6 h-20 w-20"
          />
          {/* 텍스트 */}
          <p className="mb-2 text-lg font-extrabold text-gray-800">
            찜한 모임이 없어요
          </p>
          <p className="mb-6 text-sm text-gray-500">
            마음에 드는 모임을 찜해보세요.
          </p>
          {/* 버튼 */}
          <Button
            type="no_meeting"
            text="모임 보러가기"
            onClick={() => {
              window.location.href = '/meetings'; // 모임 페이지로 이동
            }}
            //   isActive
            //   disable
          />
        </div>
      )}
      {error && <p>{error}</p>}
      <CardList plans={plans} />
      {/* {isLoading && <p>로딩 중...</p>} 로딩 중 디자인 페이지도 필요 */}
      <div ref={loaderRef} /> {/* 무한 스크롤 관찰 대상 */}
    </div>
  );
};

export default LikedPlansPage;
