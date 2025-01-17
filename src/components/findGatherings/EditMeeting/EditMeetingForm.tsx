import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '../../shared/FileInput';
import Button from '@/components/shared/Button';

interface FormValues {
  meetingName: string;
  description: string;
  categoryId: number;
  imageFiles: File[];
}

export default function EditMeetingForm() {
  const { croppedImages, onCrop } = useCropper();
  const { toggleValue, handleOpen, handleClose } = useToggle();
  const [imageURL, setImageURL] = useState<string>('');

  const { register, handleSubmit, watch, resetField } = useForm<FormValues>();
  const imageFieldValue = watch('imageFiles');

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
              className="h-9 items-center rounded-md border border-black border-opacity-10 px-3 opacity-50 outline-none"
              placeholder="모임 이름을 입력해 주세요."
              {...register('meetingName')}
            />
          </label>
          <label className="form-label">
            이미지 등록
            <FileInput
              croppedImages={croppedImages}
              register={register}
              name="imageFiles"
              toggleValue={toggleValue}
              handleClose={handleClose}
              imageURL={imageURL}
              onCrop={onCrop}
            />
          </label>
          <label className="form-label">
            모임 설명
            <textarea
              className="border border-black"
              {...register('description')}
            />
          </label>
          <label className="form-label">
            선택 서비스
            <input value={1} type="radio" {...register('categoryId')} />
            <input value={2} type="radio" {...register('categoryId')} />
          </label>

          <div className="flex gap-4">
            <Button
              text="취소"
              border="border-primary-10 border bg-white w-full text-primary-10 font-bold"
            />
            <Button
              text="만들기"
              backColor="bg-primary-10 w-full text-white font-bold"
            />
          </div>
        </form>
      </div>
    </>
  );
}
