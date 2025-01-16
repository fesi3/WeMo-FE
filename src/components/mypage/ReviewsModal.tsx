import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '@/components/shared/FileInput';
import HeartRating from '@/components/shared/HeartRating';
import Button from '@/components/shared/Button';
import axios, { AxiosError } from 'axios';

export interface CroppedImageType {
  objectURL: string;
  blobImg: Blob;
}

interface ReviewFormValues {
  score: number;
  comment: string;
  images: File[]; // 첨부된 이미지 파일 배열
  fileUrls?: string[];
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

  const images = watch('images'); // 이미지 필드 상태 감시
  const score = watch('score'); // 별점 감시
  const comment = watch('comment'); // 리뷰 텍스트 감시
  const isButtonDisabled = !score || !comment.trim(); // 별점과 댓글이 모두 있어야 버튼 활성화

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

  const getPresignedUrls = async (count: number): Promise<string[]> => {
    try {
      const response = await axios.get(
        `https://we-mo.shop/api/images?count=${count}`,
      );
      // 서버 응답에서 presignedUrl 배열 추출
      return response.data.data.presignedUrl;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        'Presigned URL 요청 실패:',
        axiosError.response?.data || axiosError.message,
      );
      throw new Error('Presigned URL 요청 중 오류 발생');
    }
  };

  const uploadImagesToS3 = async (
    files: CroppedImageType[],
    urls: string[],
  ) => {
    const uploadPromises = files.map((file, index) =>
      axios.put(urls[index], file.blobImg, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }),
    );
    await Promise.all(uploadPromises);
  };

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
      const fileUrls = presignedUrls.map((url) => url.split('?')[0]);

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
            onRate={(newScore) => setValue('score', newScore)}
          />
        </div>
      </label>

      {/* 리뷰 작성 */}
      <label className="flex flex-col gap-2">
        <span className="font-semibold">
          오늘의 경험에 대해 이야기 해주세요:
        </span>
        <textarea
          {...register('comment', { required: '리뷰 내용을 입력해주세요.' })}
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됍니다."
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
      <div className="flex justify-between">
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
