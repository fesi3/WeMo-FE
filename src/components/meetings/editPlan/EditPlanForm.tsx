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
import { Coordinate } from '@/components/types/mapType';
import { POST_PLAN_DETAIL_REQUEST, postPlan } from '@/api/plan';
import { useRouter } from 'next/router';
import { getImageUrls } from '@/api/image';

interface FormValues {
  planName: string;
  dateTime: Date;
  address: string;
  addressDetail: string;
  coordinate: Coordinate;
  capacity: number;
  content: string;
  registrationEnd: Date;
  imageFiles: File[];
}

export default function EditPlanForm() {
  const { croppedImages, onCrop, removeCroppedImage } = useCropper();
  const { setValue, register, handleSubmit, watch, resetField } =
    useForm<FormValues>({
      defaultValues: {
        coordinate: { lat: INITIAL_POSITION.lat, lng: INITIAL_POSITION.lng },
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
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { id } = router.query;
    const imageFiles = croppedImages.map((image) => image.blobImg);
    const fileUrls = await getImageUrls(imageFiles);
    if (!fileUrls) return;
    const requestData: POST_PLAN_DETAIL_REQUEST = {
      planName: data.planName,
      dateTime: dayjs(data.dateTime).format('YYYY-MM-DDTHH:mm:ss'),
      address: data.address,
      addressDetail: data.addressDetail,
      longitude: data.coordinate.lng,
      latitude: data.coordinate.lat,
      capacity: data.capacity,
      content: data.content,
      registrationEnd: dayjs(data.registrationEnd).format(
        'YYYY-MM-DDTHH:mm:ss',
      ),
      fileUrls,
    };
    postPlan({ meetingId: id as string, requestData });
  };

  const handleClickMap = async ({ lat, lng }: Coordinate) => {
    setValue('coordinate', { lat: lat, lng: lng });
    const address = await coordinateToAddress(lat, lng);
    setAddressValue(address);
  };

  const handleClickDate = (date: Date, field: keyof FormValues) => {
    setValue(field, date);
    if (field === 'dateTime') {
      closeDateTimeCalendar();
    } else if (field === 'registrationEnd') {
      closeRegistrationEndCalendar();
    }
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
        <label className="form-label">
          일정 제목
          <input
            className="form-input"
            placeholder="일정 제목을 입력해 주세요."
            {...register('planName')}
          />
        </label>
        <label className="form-label">
          모임 설명
          <textarea
            placeholder="최소 8자 이상, 최대 500자 이하로 작성해주세요"
            className="h-[100px] resize-none items-center rounded-md border border-black border-opacity-10 px-3 py-2 placeholder-opacity-50 outline-none"
            {...register('content')}
          />
        </label>

        <DatePickInput
          label="일정 일자"
          register={register}
          name="dateTime"
          value={dayjs(watch('dateTime')).format('YYYY-MM-DD A hh:mm')}
          isOpenCalendar={isOpenDateTimeCalendar}
          openCalendar={() => handleOpenModal('dateTime')}
          closeCalendar={closeDateTimeCalendar}
          onClickDate={(date) => handleClickDate(date, 'dateTime')}
        />
        <DatePickInput
          label="마감 일자"
          register={register}
          name="registrationEnd"
          value={dayjs(watch('registrationEnd')).format('YYYY-MM-DD A hh:mm')}
          isOpenCalendar={isOpenRegistrationEndCalendar}
          openCalendar={() => handleOpenModal('registrationEnd')}
          closeCalendar={closeRegistrationEndCalendar}
          onClickDate={(date) => handleClickDate(date, 'registrationEnd')}
        />
        <div className="flex flex-col gap-1">
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
          <input
            className="form-input w-1/2 placeholder:text-sm"
            {...register('addressDetail')}
            placeholder="상세주소를 입력해 주세요."
          />
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
        </div>
      </form>
    </div>
  );
}
