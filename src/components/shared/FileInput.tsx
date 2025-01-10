import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import CropperModal from '../plan/CropperModal';
import Modal from './modals/Modal';
import { CroppedImageType } from '../types/cropperType';

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
}

export default function FileInput<T extends FieldValues>({
  croppedImages,
  register,
  name,
  toggleValue,
  handleClose,
  imageURL,
  onCrop,
}: FileInputProps<T>) {
  return (
    <>
      <input type="file" {...register(name)} />
      <div className="flex gap-10">
        {croppedImages.length > 0 &&
          croppedImages.map((img) => (
            <img
              className="w-[100px]"
              src={img.objectURL}
              key={img.objectURL}
            />
          ))}
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
