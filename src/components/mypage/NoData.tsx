import Image from 'next/image';
import image from '@/assets/images/no_review.png';
import Button from '../shared/Button';
import { useRouter } from 'next/router';

type NoDataProps = {
  comment: string;
  toPage?: string;
};

const NoData = ({ comment, toPage }: NoDataProps) => {
  const router = useRouter();

  const onClickButton = () => {
    router.push('/meetings');
  };

  return (
    <div className="m-auto mt-7 flex flex-col items-center justify-center gap-3">
      <Image src={image} alt="No review" />
      <p>{comment} 없어요!</p>
      {toPage ? (
        <div className="mt-10">
          <Button type="review_create" text={toPage} onClick={onClickButton} />
        </div>
      ) : null}
    </div>
  );
};

export default NoData;
