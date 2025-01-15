import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import CropperModal from '../plan/CropperModal';
import Modal from './modals/Modal';
import { CroppedImageType } from '../types/cropperType';
import Image from 'next/image';

/**
 * @param croppedImages : 이미지를 자른 후 저장하는 배열 (useCropper)
 * @param onCrop : 이미지를 자르는 함수 (useCropper)
 * @param register : useForm의 register (useForm)
 * @param name : file input의 field value
 * @param imageURL : 이미지 파일의 objectURL
 * @param toggleValue : cropper modal의 toggle value (useToggle)
 * @param handleClose : cropper modal을 닫는 함수 (useToggle)
 */
interface FileInputProps<T extends FieldValues> {
  croppedImages: CroppedImageType[];
  onCrop: (croppedImage: CroppedImageType) => void;
  register: UseFormRegister<T>;
  name: Path<T>;
  toggleValue: boolean;
  imageURL: string;
  handleClose: () => void;
  handleDelete: (index: number) => void;
}

export default function FileInput<T extends FieldValues>({
  croppedImages,
  register,
  name,
  toggleValue,
  handleClose,
  imageURL,
  onCrop,
  handleDelete,
}: FileInputProps<T>) {
  return (
    <>
      <div className="form-label">
        <div className="flex gap-4">
          <span>이미지 등록</span>
          <span className="text-sm text-black-sub">
            {`(${croppedImages.length} / 5)`}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {croppedImages.length > 0 &&
          croppedImages.map((img, index) => (
            <div
              key={img.objectURL}
              className="relative flex aspect-[5/3] w-[30%] items-center justify-center rounded-md border border-black-sub"
            >
              <img className="w-full rounded-md" src={img.objectURL} />
              <button
                onClick={() => handleDelete(index)}
                className="flex-center absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-gray-100"
              >
                <Image
                  src="/assets/icons/x.svg"
                  width={10}
                  height={10}
                  alt="이미지 삭제"
                />
              </button>
            </div>
          ))}
        {croppedImages.length < 5 && (
          <div className="flex aspect-[5/3] w-[30%] shrink-0 cursor-pointer items-center justify-center rounded-md bg-gray-200 opacity-40">
            <label className="">
              <Image
                src="/assets/icons/camera.svg"
                alt="사진 업로드"
                width={30}
                height={30}
                priority
              />
              <input className="hidden" type="file" {...register(name)} />
            </label>
          </div>
        )}
      </div>
      <Modal
        isOpen={toggleValue}
        handleClose={handleClose}
        title="이미지 영역을 선택해주세요."
      >
        <CropperModal
          imageSrc={imageURL}
          onCrop={onCrop}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
}
