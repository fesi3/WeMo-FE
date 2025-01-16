import Button from '@/components/shared/Button';
import meetingImg from '@/assets/images/Rectangle 6188.png';
import ReviewCard from '@/components/mypage/ReviewCard';
import { useState } from 'react';
import ReviewableCard from '@/components/mypage/ReviewableCard';

export default function MyReview() {
  const [activeTab, setActiveTab] = useState<'tabLeft' | 'tabRight' | null>(
    'tabLeft',
  );

  // 탭 클릭 시 상태 변경
  const handleButtonClick = (newTab: 'tabLeft' | 'tabRight') => {
    if (activeTab === newTab) {
      return; // 이미 활성화된 탭을 다시 클릭하면 아무 일도 일어나지 않음
    }
    setActiveTab(newTab);
  };
  console.log('클릭', activeTab);

  const reviewableData = [
    {
      planId: 2,
      planName: '이니미니마이니모',
      dateTime: '2025-01-06 12:00:00',
      category: '오피스 스트레칭',
      address: '서울 중구 을지로 2가 6',
      planImagePath: meetingImg,
      capacity: 3,
      participants: 2,
    },
    {
      planId: 3,
      planName: '노래방팟',
      dateTime: '2025-03-06 12:00:00',
      category: '워케이션',
      address: '강남구',
      planImagePath: meetingImg,
      capacity: 6,
      participants: 2,
    },
  ];

  const reviewData = [
    {
      planId: 1,
      planName: '배드민턴 치기',
      dateTime: '2019-03-02 10:00',
      category: '달램핏',
      address: '강남구',
      reivewImagePath: meetingImg,
      reviewId: 3,
      score: 4,
      comment: '너무너무 재밌었어요',
    },
    {
      planId: 4,
      planName: '노래방 가기',
      dateTime: '2019-03-02 10:00',
      category: '워케이션',
      address: '아산시',
      reivewImagePath: meetingImg,
      reviewId: 2,
      score: 1,
      comment: '노래방 기기가 별로였어요ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ 다음부터 안갈랭',
    },
  ];
  // 데이터 상태
  // const [reviewData, setReviewData] = useState<ReviewProps[]>([]);

  // useEffect(() => {
  //   setReviewData([]); // 탭 이동때문에 넣음
  //   const fetchData = async () => {
  //     if (!setActiveTab) return;

  //     const apiUrl =
  //       activeTab === 'tabLeft'
  //         ? 'https://677e23a294bde1c1252a8cc0.mockapi.io/users/1/review'
  //         : 'https://677e23a294bde1c1252a8cc0.mockapi.io/users/1/review/1/available';

  //     try {
  //       const response = await axios.get(apiUrl);
  //       setReviewData(response.data.data.planList);
  //       console.log(reviewData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);

  return (
    <>
      <header className="bg-antiquewhite flex h-12 items-center justify-center bg-gray-100">
        나의 리뷰
      </header>

      <main className="flex flex-col px-4">
        <section className="flex h-[64px] w-full items-center justify-center">
          {' '}
          <Button
            type="tabLeft"
            text="작성한 리뷰"
            isActive={activeTab === 'tabLeft'}
            onClick={() => handleButtonClick('tabLeft')}
          />
          <Button
            type="tabRight"
            text="작성할 리뷰"
            isActive={activeTab === 'tabRight'}
            onClick={() => handleButtonClick('tabRight')}
          />{' '}
        </section>

        {/* activeTab에 따라 다른 컴포넌트 렌더링 */}
        {activeTab === 'tabLeft' ? (
          <section className="flex flex-col">
            <ul>
              {reviewData.map((plan) => (
                <li key={plan.planId}>
                  <ReviewCard reviewed={plan} />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="flex flex-col">
            <ul>
              {reviewableData.map((plan) => (
                <li key={plan.planId}>
                  <ReviewableCard reviewable={plan} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center border-t border-gray-300 bg-gray-100">
        nav 자리
      </footer>
    </>
  );
}

// MyReview.getLayout = (page: ReactNode) => {
//   return <MypageLayout headerProps="나의 리뷰">{page}</MypageLayout>;
// };
