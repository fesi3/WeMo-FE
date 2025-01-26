import FileInput from '@/components/shared/FileInput';
import useCropper from '@/hooks/useCropper';
import useToggle from '@/hooks/useToggle';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePickInput from './DatePickInput';
import dayjs from 'dayjs';
import AddressInput from './AddressInput';
import { coordinateToAddress } from '@/utils/coordinateToAddress';
import { INITIAL_POSITION } from '@/constants/address';
import { Coordinate } from '@/types/mapType';
import { createPlan } from '@/api/plan';
import { useRouter } from 'next/router';
import { getImageUrls } from '@/api/images';
import { CreatePlanRequestBody } from '@/types/api/plan';
import ErrorWrapper from '@/components/shared/ErrorWrapper';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
interface FormValues {
  planName: string;
  dateTime: string;
  address: string;
  addressDetail: string;
  coordinate: Coordinate;
  capacity: number;
  content: string;
  registrationEnd: string;
  imageFiles: File[];
}

interface EditPlanFormProps {
  handleCloseThisModal: () => void;
}

export default function EditPlanForm({
  handleCloseThisModal,
}: EditPlanFormProps) {
  const { croppedImages, onCrop, removeCroppedImage } = useCropper();
  const {
    setValue,
    formState: { errors },
    setError,
    register,
    handleSubmit,
    watch,
    resetField,
    trigger,
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      coordinate: { lat: INITIAL_POSITION.lat, lng: INITIAL_POSITION.lng },
      capacity: 20,
      dateTime: dayjs(new Date()).format('YYYY-MM-DD A hh:mm'),
      registrationEnd: dayjs(new Date()).format('YYYY-MM-DD A hh:mm'),
    },
  });

  const [imageURL, setImageURL] = useState<string>('');
  const [addressValue, setAddressValue] = useState('');
  const {
    toggleValue: isOpenCropper,
    handleOpen: openCropper,
    handleClose: closeCropper,
  } = useToggle();
  const {
    toggleValue: isOpenDateTimeCalendar,
    handleOpen: openDateTimeCalendar,
    handleClose: closeDateTimeCalendar,
  } = useToggle();
  const {
    toggleValue: isOpenRegistrationEndCalendar,
    handleOpen: OpenRegistrationEndCalendar,
    handleClose: closeRegistrationEndCalendar,
  } = useToggle();
  const {
    toggleValue: isOpenMap,
    handleOpen: openMap,
    handleClose: closeMap,
  } = useToggle();
  const router = useRouter();
  const imageFieldValue = watch('imageFiles');
  const coordinateValue = watch('coordinate');
  const capacityValue = watch('capacity');
  const dateTimeValue = watch('dateTime');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //아래 validate는 다른 필드와 별개로 submit이 실행될 때 실행됨 그래서 이미지 인풋은 state로 관리하고 직접 crop된 이미지를 form field에 주입하도록 리팩토링 예정

    if (croppedImages.length <= 0) {
      setError('imageFiles', {
        type: 'required',
        message: '이미지를 등록해 주세요.',
      });
      return;
    }
    const { id } = router.query;
    const imageFiles = croppedImages.map((image) => image.blobImg);
    const fileUrls = await getImageUrls(imageFiles);
    if (!fileUrls) return;
    const requestBody: CreatePlanRequestBody = {
      planName: data.planName,
      dateTime: dayjs(data.dateTime, 'YYYY-MM-HH A hh:mm').format(
        'YYYY-MM-DDTHH:mm:ss',
      ),
      address: data.address,
      addressDetail: data.addressDetail,
      longitude: data.coordinate.lng,
      latitude: data.coordinate.lat,
      capacity: data.capacity,
      content: data.content,
      registrationEnd: dayjs(data.registrationEnd, 'YYYY-MM-HH A hh:mm').format(
        'YYYY-MM-DDTHH:mm:ss',
      ),
      fileUrls,
    };
    try {
      const result = await createPlan({ meetingId: id as string, requestBody });
      if (!result || result.success) {
        throw new Error('일정 생성 실패');
      }
      alert('일정이 생성됐습니다.'); //토스트
      handleCloseThisModal();
    } catch {
      alert('일정 생성에 실패했습니다.'); //토스트
    }
  };

  const handleClickMap = async ({ lat, lng }: Coordinate) => {
    setValue('coordinate', { lat: lat, lng: lng });
    const address = await coordinateToAddress(lat, lng);
    setAddressValue(address);
    trigger('address');
  };

  const handleClickDate = (date: Date, field: keyof FormValues) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD A hh:mm');
    setValue(field, formattedDate);
    trigger(field);
  };

  const handleOpenModal = (field: keyof FormValues) => {
    if (field === 'dateTime') {
      openDateTimeCalendar();
      closeRegistrationEndCalendar();
    } else if (field === 'registrationEnd') {
      OpenRegistrationEndCalendar();
      closeDateTimeCalendar();
    }
  };

  useEffect(() => {
    if (imageFieldValue && imageFieldValue.length > 0) {
      const objectURL = URL.createObjectURL(imageFieldValue[0]);
      setImageURL(objectURL);
      openCropper();
      resetField('imageFiles');
    }
  }, [imageFieldValue]);
  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <ErrorWrapper errorMessage={errors.planName?.message}>
          <label className="form-label">
            일정 제목
            <input
              className="form-input"
              placeholder="일정 제목을 입력해 주세요."
              {...register('planName', {
                required: '일정 제목을 입력해 주세요',
              })}
            />
          </label>
        </ErrorWrapper>
        <ErrorWrapper errorMessage={errors.content?.message}>
          <label className="form-label">
            일정 설명
            <textarea
              placeholder="최소 8자 이상, 최대 500자 이하로 작성해주세요"
              className="h-[100px] resize-none items-center rounded-md border border-black border-opacity-10 px-3 py-2 placeholder-opacity-50 outline-none"
              {...register('content', {
                required: {
                  value: true,
                  message: '일정 설명을 입력해주세요.',
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
        <ErrorWrapper errorMessage={errors.dateTime?.message}>
          <DatePickInput
            label="일정 일자"
            register={register}
            name="dateTime"
            isOpenCalendar={isOpenDateTimeCalendar}
            openCalendar={() => handleOpenModal('dateTime')}
            closeCalendar={closeDateTimeCalendar}
            onClickDate={(date) => handleClickDate(date, 'dateTime')}
            validate={{
              required: true,
              validate: (value) => {
                const selectedDate = dayjs(
                  value as string,
                  'YYYY-MM-DD A hh:mm',
                ).startOf('day');
                const tomorrow = dayjs().add(1, 'day').startOf('day');
                return (
                  selectedDate.isAfter(tomorrow) ||
                  selectedDate.isSame(tomorrow) ||
                  '선택한 일정은 최소 내일이어야 합니다.'
                );
              },
            }}
          />
        </ErrorWrapper>
        <ErrorWrapper errorMessage={errors.registrationEnd?.message}>
          <DatePickInput
            label="마감 일자"
            register={register}
            name="registrationEnd"
            isOpenCalendar={isOpenRegistrationEndCalendar}
            openCalendar={() => handleOpenModal('registrationEnd')}
            closeCalendar={closeRegistrationEndCalendar}
            onClickDate={(date) => handleClickDate(date, 'registrationEnd')}
            validate={{
              required: true,
              validate: (value) => {
                const selectedDate = dayjs(
                  value as string,
                  'YYYY-MM-DD A hh:mm',
                );

                const planDate = dayjs(
                  dateTimeValue as string,
                  'YYYY-MM-DD A hh:mm',
                );
                return (
                  selectedDate.isSame(planDate) ||
                  selectedDate.isBefore(planDate) ||
                  '마감 일자는 일정 일자 이전이어야 합니다.'
                );
              },
            }}
          />
        </ErrorWrapper>
        <div className="flex flex-col gap-1">
          <ErrorWrapper errorMessage={errors.address?.message}>
            <AddressInput
              register={register}
              value={addressValue}
              coordinate={coordinateValue}
              label="일정 장소"
              name="address"
              isOpenMap={isOpenMap}
              closeMap={closeMap}
              openMap={openMap}
              handleClickMap={handleClickMap}
            />
          </ErrorWrapper>
          <ErrorWrapper errorMessage={errors.addressDetail?.message}>
            <input
              className="form-input w-1/2 placeholder:text-sm"
              {...register('addressDetail', {
                required: '상세주소를 입력해 주세요.',
              })}
              placeholder="상세주소를 입력해 주세요."
            />
          </ErrorWrapper>
        </div>

        <div className="form-label">
          <div className="flex flex-col">
            <span>최대 인원</span>
            <span className="pb-1 text-xs text-black-sub">
              개설 확정을 위해 최소 5명이 필요합니다.
            </span>
          </div>
          <div className="flex items-center gap-1">
            <input
              {...register('capacity')}
              type="range"
              min="5"
              max="30"
              className="form-input-range"
            />
            <input
              type="number"
              className="form-input-number flex-center h-6 w-10 rounded-md border border-primary-10 pl-1 outline-none"
              min={5}
              max={30}
              value={capacityValue}
              onChange={(e) => {
                setValue('capacity', parseInt(e.target.value));
              }}
            />
          </div>
          <ErrorWrapper errorMessage={errors.imageFiles?.message}>
            <FileInput
              handleDelete={removeCroppedImage}
              croppedImages={croppedImages}
              register={register}
              name="imageFiles"
              toggleValue={isOpenCropper}
              handleClose={closeCropper}
              imageURL={imageURL}
              onCrop={onCrop}
            />
          </ErrorWrapper>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCloseThisModal}
            className="h-10 w-full rounded-md border border-primary-10 font-semibold text-primary-10"
          >
            취소
          </button>

          <button
            type="submit"
            className="h-10 w-full rounded-md border bg-primary-10 font-semibold text-white"
          >
            만들기
          </button>
        </div>
      </form>
    </div>
  );
}
