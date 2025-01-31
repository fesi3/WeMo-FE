import Tabs from '@/components/plans/tab/Tabs';
import { GetStaticProps } from 'next';
import { Review } from '@/types/reviewType';
import axiosInstance from '@/api/axiosInstance';
import ReviewContainer from '@/components/all-reviews/ReviewContainer';

const CATEGORIES = [{ category: '달램핏' }, { category: '워케이션' }];
const DEFAULT_CATEGORY = CATEGORIES[0].category;

const ReviewPage = ({
  initialDalRamfitReviews,
  initialWorkationReviews,
}: {
  initialDalRamfitReviews: Review[];
  initialWorkationReviews: Review[];
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Tabs
        tabs={CATEGORIES}
        defaultTab={DEFAULT_CATEGORY}
        renderContent={(category) => (
          <ReviewContainer
            category={category}
            initialReviews={
              category === '달램핏'
                ? initialDalRamfitReviews
                : initialWorkationReviews
            }
          />
        )}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [dalRamfitRes, workationRes] = await Promise.all([
      axiosInstance.get(`/api/reviews`, {
        params: { page: 1, size: 5, categoryId: 1 },
      }),
      axiosInstance.get(`/api/reviews`, {
        params: { page: 1, size: 5, categoryId: 2 },
      }),
    ]);

    return {
      props: {
        initialDalRamfitReviews: dalRamfitRes.data.data.reviewList || [],
        initialWorkationReviews: workationRes.data.data.reviewList || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('초기 데이터 패칭 오류:', error);
    return {
      props: {
        initialDalRamfitReviews: [],
        initialWorkationReviews: [],
      },
    };
  }
};

export default ReviewPage;
