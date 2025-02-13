import React, { useState } from 'react';
import instance from '@/utils/axios'; // ✅ axios instance 사용
import { PlanData } from '@/types/plans';
import { usePageInfiniteScroll } from '@/hooks/usePageInfiniteScroll';
import CardList from '@/components/plans/card/CardList';
import Button from '@/components/shared/Button';
import Header from '@/components/shared/layout/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import image from '@/assets/images/like-page-heart.png';

const SavedGatheringPage = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Redux에서 로그인 상태 가져오기
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // useEffect(() => {
  //   console.log('현재 로그인 상태:', isLoggedIn);
  // }, [isLoggedIn]); // 로그인 상태 변경될 때마다 확인

  // 데이터 로드
  const fetchLikedPlans = async (page: number): Promise<boolean> => {
    if (!isLoggedIn) {
      //console.log('Redux에서 로그인 상태 false. API 요청을 보내지 않음.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      //console.log(`[API 요청] 찜한 일정 불러오기 (페이지: ${page})`);

      const response = await instance.get(
        `/api/plans/like?page=${page}&size=10`,
      );

      //console.log('[API 응답] 데이터:', response.data);

      const newPlans: PlanData[] = response.data.data.planList ?? [];

      //console.log('[처리된 데이터] newPlans:', newPlans);

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
      console.error('[API 요청 실패]:', err);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  // 페이지 기반 무한 스크롤
  const { loaderRef } = usePageInfiniteScroll({
    fetchMore: fetchLikedPlans,
    initialPage: 1,
    // onPageLoadComplete: (dataAvailable) => {
    //   if (!dataAvailable) {
    //     console.log('더 이상 불러올 데이터가 없습니다.');
    //   }
    // },
  });

  // 로그인하지 않았을 경우 UI 처리
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="mb-4 text-lg font-bold text-gray-800">
          로그인이 필요합니다.
        </p>
        <Button
          text="로그인하기"
          onClick={() => {
            window.location.href = '/login'; // 로그인 페이지로 이동
          }}
          width={160}
          height={42}
        />
      </div>
    );
  }

  return (
    <div>
      <Header title="찜한 일정" />
      <div className="mx-auto max-w-7xl px-4 py-4">
        {plans.length === 0 && !isLoading ? (
          <div className="mt-20 flex flex-col items-center justify-center">
            <Image src={image} alt="찜한 모임 없음" className="mb-6" />
            <p className="mb-2 text-lg font-extrabold text-gray-800">
              찜한 모임이 없어요
            </p>
            <p className="mb-6 text-sm text-gray-500">
              마음에 드는 모임을 찜해보세요.
            </p>
            <Button
              text="모임 보러가기"
              onClick={() => (window.location.href = '/meetings')}
              width={160}
              height={42}
            />
          </div>
        ) : (
          <div className="my-6">
            <CardList plans={plans} />
          </div>
        )}
      </div>
      {error && <p>{error}</p>}
      <div ref={loaderRef} />
    </div>
  );
};

export default SavedGatheringPage;
