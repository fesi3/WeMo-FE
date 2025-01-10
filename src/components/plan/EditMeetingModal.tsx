import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToggle from '@/hooks/useToggle';
import useCropper from '@/hooks/useCropper';
import FileInput from '../shared/FileInput';

interface FormValues {
  meetingName: string;
  description: string;
  categoryId: number;
  imageFiles: File[];
}

export default function EditMeetingModal() {
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
          <input className="border border-black" {...register('meetingName')} />
          <textarea
            className="border border-black"
            {...register('description')}
          />
          <label>
            <input value={1} type="radio" {...register('categoryId')} />
            <input value={2} type="radio" {...register('categoryId')} />
          </label>
          <FileInput
            croppedImages={croppedImages}
            register={register}
            name="imageFiles"
            toggleValue={toggleValue}
            handleClose={handleClose}
            imageURL={imageURL}
            onCrop={onCrop}
          />

          <button>섭밋버튼</button>
        </form>
      </div>
    </>
  );
}
