import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PlanData } from '@/components/types/plans';
import CardList from '@/components/findGatherings/card/CardList';

const LikedPlansPage = () => {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const loaderRef = useRef(null);
  //const navigate = useNavigate();

  // 토큰 저장 방식에 따라 변경
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      //     alert('로그인이 필요합니다.');
      //     navigate('/login');
      return;
    }

    const fetchLikedPlans = async () => {
      if (!hasMore || isLoading) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `/api/plans/like?page=${page}&size=10`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const newPlans: PlanData[] = response.data.content;
        console.log(newPlans);
        if (newPlans.length === 0) {
          setHasMore(false); // 새로운 데이터가 없으면 호출 중지
        } else {
          setPlans((prevPlans) => {
            const uniquePlans = newPlans.filter(
              (newPlan) =>
                !prevPlans.some(
                  (prevPlan) => prevPlan.planId === newPlan.planId,
                ),
            );
            return [...prevPlans, ...uniquePlans];
          });
        }
      } catch (err) {
        console.error('좋아요한 일정 목록을 불러오지 못함: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedPlans();
  }, [page, accessToken, hasMore, isLoading]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasMore, isLoading]);

  if (!accessToken) {
    return (
      <div>
        <p>로그인 후 이용할 수 있는 기능입니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>찜한 목록</h1>
      {plans.length === 0 && !isLoading && (
        <div>
          <p>찜한 모임이 없어요</p>
          <p>마음에 드는 모임을 찜해보세요</p>
        </div>
      )}
      {error && <p>{error}</p>}
      <CardList plans={plans} />
      {isLoading && <p>로딩 중...</p>}
      {/* 로딩 중 디자인도 필요 */}
      <div ref={loaderRef} />
    </div>
  );
};

export default LikedPlansPage;
