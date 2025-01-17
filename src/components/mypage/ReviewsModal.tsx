import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '@/components/shared/FileInput';
import HeartRating from '@/components/shared/HeartRating';
import Button from '@/components/shared/Button';
import { ReviewFormValues, ReviewModalProps } from '@/types/reviewType';
import { getPresignedUrls, uploadImagesToS3 } from '@/api/createReview';

export default function ReviewModal({
  mode, // 작성(create) 또는 수정(edit) 모드
  initialData, // 초기 리뷰 데이터 (수정 모드에서 사용)
  onSubmit, // 리뷰 제출 콜백
  onClose, // 모달 닫기 콜백
}: ReviewModalProps) {
  const { croppedImages, onCrop, removeCroppedImage } = useCropper();
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const [imageURL, setImageURL] = useState<string>(''); // 선택된 이미지 URL

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    resetField,
    setValue,
  } = useForm<ReviewFormValues>({
    mode: 'onChange', // 입력 값 변경 시마다 유효성 검사 수행
    defaultValues: {
      score: initialData?.score || 0,
      comment: initialData?.comment || '',
      images: [],
    },
  });

  const images = watch('images'); // 이미지 필드 상태 감시

  // 이미지 선택 후 처리
  useEffect(() => {
    if (images && images.length > 0) {
      const objectURL = URL.createObjectURL(images[0]);
      setImageURL(objectURL);
      handleOpen(); // 크로퍼 모달 열기

      // 이미지 필드 초기화 (다시 선택 가능하도록)
      resetField('images');
    }
  }, [images, resetField]);

  // 리뷰 제출 핸들러
  const onSubmitHandler: SubmitHandler<ReviewFormValues> = async (data) => {
    if (croppedImages.length === 0) {
      onSubmit({ ...data, fileUrls: [] });
      return;
    }
    try {
      // Presigned URL 요청
      const presignedUrls = await getPresignedUrls(croppedImages.length);

      // 이미지 업로드
      await uploadImagesToS3(croppedImages, presignedUrls);

      // Presigned URL에서 실제 S3 파일 경로 추출
      const fileUrls = presignedUrls;

      // 최종 데이터 작성
      const finalData = {
        ...data,
        fileUrls, // URL 배열 포함
      };

      // 데이터 제출
      onSubmit(finalData);
    } catch (error) {
      console.error(error);
    } finally {
      console.log(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      {/* 평점 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">오늘 모임 어떠셨나요?</span>
        <div className="mt-2 flex items-center gap-2">
          <HeartRating
            rating={watch('score')}
            onRate={(newScore) =>
              setValue('score', newScore, { shouldValidate: true })
            }
          />
        </div>
      </label>

      {/* 리뷰 작성 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">
          오늘의 경험에 대해 이야기 해주세요:
        </span>
        <textarea
          {...register('comment', {
            required: '리뷰 내용을 입력해주세요.',
            minLength: {
              value: 10,
              message: '리뷰는 최소 10자 이상 작성해주세요.',
            },
          })}
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
          className="h-32 w-full rounded-md border border-gray-300 p-3"
        />
      </label>

      {/* 이미지 첨부 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">이미지 첨부 (선택):</span>
        <FileInput
          handleDelete={removeCroppedImage}
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
      <div className="flex justify-between">
        <Button
          text="취소"
          type="reviewSubmit" // 취소 버튼 스타일
          onClick={onClose}
        />
        <Button
          text={mode === 'create' ? '등록하기' : '수정하기'}
          type="reviewSubmit"
          disable={!isValid} // 비활성화 여부
        />
      </div>
    </form>
  );
}
