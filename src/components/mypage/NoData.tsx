import Image from 'next/image';
import image from '@/assets/images/no_review.png';
import Button from '@/components/shared/Button';
import { useRouter } from 'next/router';

type NoDataProps = {
  comment: string;
  toPage?: string;
  text?: string;
};

const NoData = ({ comment, toPage, text }: NoDataProps) => {
  const router = useRouter();

  const onClickButton = () => {
    if (toPage) {
      router.push(toPage); // `toPage`가 있으면 해당 경로로 이동
    } else {
      router.push('/');
    }
  };

  return (
    <div className="m-auto mt-7 flex flex-col items-center justify-center gap-3">
      <Image src={image} alt="No review" />
      <p>{comment} 없어요!</p>
      {toPage ? (
        <div className="mt-10">
          <Button text={text} onClick={onClickButton} />
        </div>
      ) : null}
    </div>
  );
};

export default NoData;
