import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '../../shared/FileInput';
import Button from '@/components/shared/Button';
import CategoryRadioInput from '@/components/findGatherings/editMeeting/CategoryRadioInput';

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

  const { register, handleSubmit, watch, resetField } = useForm<FormValues>({
    defaultValues: { categoryId: '3' },
  });
  const imageFieldValue = watch('imageFiles');
  const categoryValue = watch('categoryId');
  const onSubmit: SubmitHandler<FormValues> = () => {};

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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label">
            모임 이름
            <input
              className="h-9 items-center rounded-md border border-black border-opacity-10 px-3 placeholder-opacity-50 outline-none"
              placeholder="모임 이름을 입력해 주세요."
              {...register('meetingName')}
            />
          </label>

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

          <span className="form-label">선택 서비스</span>
          <CategoryRadioInput
            register={register}
            name="categoryId"
            categoryValue={categoryValue}
          />
          <div className="flex gap-5"></div>
          <label className="form-label">
            모임 설명
            <textarea
              placeholder="최소 8자 이상, 최대 500자 이하로 작성해주세요"
              className="h-[100px] resize-none items-center rounded-md border border-black border-opacity-10 px-3 py-2 placeholder-opacity-50 outline-none"
              {...register('description')}
            />
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleCloseThisModal}
              text="취소"
              border="border-primary-10 border bg-white w-full text-primary-10 font-bold"
            />
            <Button
              type="submit"
              text="만들기"
              backColor="bg-primary-10 w-full text-white font-bold"
            />
          </div>
        </form>
      </div>
    </>
  );
}
