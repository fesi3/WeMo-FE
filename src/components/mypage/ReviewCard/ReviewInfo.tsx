import fetchData from '@/api/fetchData';
import Button from '@/components/shared/Button';
import Image from 'next/image';
import { scoreRender } from '@/utils/scoreRender';

interface ReviewInfoProps {
  score: number;
  reviewId: number;
  comment: string;
  reviewImagePath: string | string[];
}

// 테스트용(API 수정 필요 - 이미지가 1개만 들어오고 있음.)
// const testImages = [
//   'https://we-mo.s3.ap-northeast-2.amazonaws.com/b317d007-5ec7-4ad5-917e-51df8ec04faa-1738447857644',
//   'https://we-mo.s3.ap-northeast-2.amazonaws.com/893055b0-e585-4ed7-8d5d-0a369deffb09-1738447857645',
//   'https://we-mo.s3.ap-northeast-2.amazonaws.com/4e339f54-6448-4988-b03c-1cf183261a2b-1738447857645',
// ];
// const reviewImages = Array.isArray(reviewImagePath)
//   ? reviewImagePath
//   : testImages;

const deleteReview = async (reviewId: number) => {
  console.log(reviewId, '번 리뷰 삭제');
  await fetchData({
    param: `/api/reviews/${reviewId}`,
    method: 'delete',
  });
  alert('삭제되었습니다!');
  window.location.reload(); // 페이지 새로고침
};

const ReviewInfo = ({
  score,
  reviewId,
  comment,
  reviewImagePath,
}: ReviewInfoProps) => {
  // reviewImagePath가 string 또는 string[]일 때
  const reviewImages = Array.isArray(reviewImagePath)
    ? reviewImagePath
    : [reviewImagePath]; // 배열로 변환

  return (
    <div className="flex flex-col gap-4">
      {/* 별점 */}
      <div className="flex justify-between">
        <div>
          {scoreRender(score)} {score}
        </div>
        <Button
          text="삭제"
          variant={'outline'}
          onClick={() => {
            deleteReview(reviewId);
          }}
          className="px-6 hover:border-none hover:bg-red-400"
        />
      </div>
      {/* 코멘트 */}
      <div>{comment}</div>

      {/* 이미지 여러 개인 경우까지 포함*/}
      <div className="flex h-[140px] w-full gap-3">
        {/* 최대 2개 이미지까지만 출력 */}
        {reviewImages.slice(0, 2).map((image, index) => (
          <div
            key={index}
            className={`relative flex ${Array.isArray(reviewImages) && reviewImages.length === 1 ? 'w-full' : ''} h-[180px] rounded-lg`}
          >
            <Image
              src={image}
              alt={`리뷰 이미지 ${index + 1}`}
              height={400}
              width={300}
              // layout='fill'
              // objectFit='cover'
              className="rounded-lg"
            />
            {/* 3개 이상 들어오면 두 번째 이미지 위에 "+더보기" 표시 */}
            {index === 1 &&
              (Array.isArray(reviewImages) ? reviewImages.length : 1) > 2 && (
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black bg-opacity-50 text-xl font-semibold text-white">
                  +더보기
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewInfo;
