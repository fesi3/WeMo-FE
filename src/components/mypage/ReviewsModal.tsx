import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '@/components/shared/FileInput';
import HeartRating from '@/components/shared/HeartRating';
import Button from '@/components/shared/Button';

interface ReviewFormValues {
  score: number;
  comment: string;
  images: File[]; // 첨부된 이미지 파일 배열
}

interface ReviewModalProps {
  mode: 'create' | 'edit'; // 모드 추가
  initialData?: { score: number; comment: string; images?: File[] }; // 수정 모드에서 초기값
  onSubmit: (data: ReviewFormValues) => void; // 리뷰 제출 함수
  onClose: () => void; // 모달 닫기 함수
}

export default function ReviewModal({
  mode,
  initialData,
  onSubmit,
  onClose,
}: ReviewModalProps) {
  const { croppedImages, onCrop } = useCropper();
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const [imageURL, setImageURL] = useState<string>(''); // 선택된 이미지 URL

  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<ReviewFormValues>({
      defaultValues: {
        score: initialData?.score || 0,
        comment: initialData?.comment || '',
        images: initialData?.images || [],
      },
    });

  const imageFieldValue = watch('images'); // 이미지 필드 상태 감시
  const score = watch('score'); // 별점 감시
  const comment = watch('comment'); // 리뷰 텍스트 감시
  const isButtonDisabled = !score || !comment.trim(); // 별점과 댓글이 모두 있어야 버튼 활성화

  // 이미지 선택 후 처리
  useEffect(() => {
    if (imageFieldValue && imageFieldValue.length > 0) {
      const objectURL = URL.createObjectURL(imageFieldValue[0]);
      setImageURL(objectURL);
      handleOpen(); // 크로퍼 모달 열기

      // 이미지 필드 초기화 (다시 선택 가능하도록)
      resetField('images');
    }
  }, [imageFieldValue, resetField]);

  // 리뷰 제출 핸들러
  const onSubmitHandler: SubmitHandler<ReviewFormValues> = (data) => {
    console.log('제출 데이터:', data); // 제출 데이터 확인
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <h2 className="text-lg font-bold">
        {mode === 'create' ? '리뷰 작성하기' : '리뷰 수정하기'}
      </h2>

      {/* 평점 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">평점을 선택해주세요:</span>
        <HeartRating
          rating={watch('score')}
          onRate={(newScore) => setValue('score', newScore)}
        />
      </label>

      {/* 리뷰 작성 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">리뷰 내용:</span>
        <textarea
          {...register('comment', { required: '리뷰 내용을 입력해주세요.' })}
          placeholder="리뷰 내용을 작성해주세요."
          className="h-32 w-full rounded-md border border-gray-300 p-3"
        />
      </label>

      {/* 이미지 첨부 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">이미지 첨부 (선택):</span>
        <FileInput
          croppedImages={croppedImages}
          register={register}
          name="images"
          toggleValue={toggleValue}
          handleClose={handleClose}
          imageURL={imageURL}
          onCrop={onCrop}
        />
      </label>

      {/* 버튼 */}
      <div className="flex gap-4">
        <Button
          text="취소"
          type="reviewSubmit" // 취소 버튼 스타일
          onClick={onClose}
        />
        <Button
          text={mode === 'create' ? '등록하기' : '수정하기'}
          type="reviewSubmit" // 취소 버튼 스타일
          disable={isButtonDisabled} // 비활성화 여부
        />
      </div>
    </form>
  );
}
