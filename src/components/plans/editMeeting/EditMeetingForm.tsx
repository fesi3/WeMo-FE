import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '../../shared/FileInput';
import CategoryRadioInput from '@/components/plans/editMeeting/CategoryRadioInput';
import { getImageUrls } from '@/api/images';
import { CreateMeetingRequestBody } from '@/types/api/meeting';
import { createMeeting } from '@/api/meeting';
import ErrorWrapper from '@/components/shared/ErrorWrapper';
import { useRouter } from 'next/router';
import Button from '@/components/shared/Button';

interface FormValues {
  meetingName: string;
  description: string;
  categoryId: string;
  imageFiles: File[];
}

interface EditMeetingFormProps {
  handleCloseThisModal: () => void;
}

export default function EditMeetingForm({
  handleCloseThisModal,
}: EditMeetingFormProps) {
  const { croppedImages, onCrop, removeCroppedImage } = useCropper();
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const [imageURL, setImageURL] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { categoryId: '3' },
  });
  const imageFieldValue = watch('imageFiles');
  const categoryValue = watch('categoryId');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!croppedImages.length) {
      setError('imageFiles', {
        type: 'required',
        message: '대표 이미지를 등록해 주세요.',
      });
      return;
    }

    const imageFiles = croppedImages.map((image) => image.blobImg);
    try {
      setIsSubmitting(true);
      const fileUrls = await getImageUrls(imageFiles);
      if (!fileUrls) return;
      const requestData: CreateMeetingRequestBody = {
        meetingName: data.meetingName,
        description: data.description,
        categoryId: parseInt(data.categoryId),
        fileUrls,
      };

      const response = await createMeeting(requestData);
      if (!response) {
        return;
      }
      const newMeetingId = response.data.meetingId;
      await router.push(`/meetings/${newMeetingId}`);
      handleCloseThisModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (imageFieldValue && imageFieldValue.length > 0) {
      const objectURL = URL.createObjectURL(imageFieldValue[0]);
      setImageURL(objectURL);
      handleOpen();

      //필드를 리셋하지 않았더니 이미지를 선택하고 다시 선택할 때 이미지가 업로드 되지 않는 문제가 있었습니다.
      resetField('imageFiles');
    }
  }, [imageFieldValue]);

  return (
    <>
      <div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <ErrorWrapper errorMessage={errors.meetingName?.message}>
            <label className="form-label">
              모임 이름
              <input
                className="h-9 items-center rounded-md border border-black border-opacity-10 px-3 placeholder-opacity-50 outline-none"
                placeholder="모임 이름을 입력해 주세요."
                {...register('meetingName', {
                  required: '모임 이름을 입력해 주세요',
                })}
              />
            </label>
          </ErrorWrapper>
          <ErrorWrapper errorMessage={errors.imageFiles?.message}>
            <FileInput
              handleDelete={removeCroppedImage}
              croppedImages={croppedImages}
              register={register}
              name="imageFiles"
              toggleValue={toggleValue}
              handleClose={handleClose}
              imageURL={imageURL}
              onCrop={onCrop}
            />
          </ErrorWrapper>
          <label className="form-label">
            선택 서비스
            <CategoryRadioInput
              register={register}
              name="categoryId"
              categoryValue={categoryValue}
            />
          </label>

          <ErrorWrapper errorMessage={errors.description?.message}>
            <label className="form-label">
              모임 설명
              <textarea
                placeholder="최소 8자 이상, 최대 500자 이하로 작성해주세요."
                className="h-[100px] resize-none items-center rounded-md border border-black border-opacity-10 px-3 py-2 placeholder-opacity-50 outline-none"
                {...register('description', {
                  required: {
                    value: true,
                    message: '모임 설명을 입력해주세요.',
                  },
                  minLength: {
                    value: 8,
                    message: '최소 8자 이상으로 입력해주세요.',
                  },
                  maxLength: {
                    value: 500,
                    message: '최대 500자 이하로 입력해주세요',
                  },
                })}
              />
            </label>
          </ErrorWrapper>
          <div className="flex gap-4 pt-5">
            <Button
              text="취소"
              type="button"
              size={'large'}
              variant={'outline'}
              onClick={handleCloseThisModal}
              height={40}
              className="w-full rounded-md"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              size={'large'}
              height={40}
              className="w-full rounded-md"
            >
              {isSubmitting ? '만드는 중' : '만들기'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
