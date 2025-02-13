import { useForm, SubmitHandler } from 'react-hook-form';
import useAddressSearch from '@/hooks/useAddressSearch';
import axiosInstance from '@/utils/axios';
import Button from '@/components/shared/Button';
import { useEffect } from 'react';

interface LightningMeetupFormValues {
  lightningName: string;
  lightningTypeId: number;
  lightningDate: string;
  address: string;
  lightningContent: string;
  latitude: number;
  longitude: number;
  lightningCapacity: number;
}

const themes = [
  { id: 1, name: '밥친구' },
  { id: 2, name: '운동' },
  { id: 3, name: '카풀' },
];

interface LightningModalProps {
  onClose: () => void;
}

const LightningModal = ({ onClose }: LightningModalProps) => {
  const { coordinate, address, handleClickOpenSearch } = useAddressSearch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LightningMeetupFormValues>({
    mode: 'onChange',
    defaultValues: {
      lightningName: '',
      lightningTypeId: 1, // 기본값: 밥친구
      lightningDate: '',
      address: '',
      lightningContent: '',
      latitude: coordinate.lat,
      longitude: coordinate.lng,
      lightningCapacity: 2,
    },
  });

  useEffect(() => {
    if (address) {
      setValue('address', address);
    }
    if (coordinate.lat && coordinate.lng) {
      setValue('latitude', coordinate.lat);
      setValue('longitude', coordinate.lng);
    }
  }, [address, coordinate, setValue]);

  const capacityValue = watch('lightningCapacity');
  const selectedType = watch('lightningTypeId');

  const onSubmitHandler: SubmitHandler<LightningMeetupFormValues> = async (
    data,
  ) => {
    console.log('요청 데이터 전송:', JSON.stringify(data, null, 2));

    const date = new Date(data.lightningDate);
    date.setHours(date.getHours() + 9); // KST 변환
    const formattedDate = date.toISOString().slice(0, 19);

    // 데이터 객체
    const requestBody = {
      lightningName: data.lightningName.trim(), // 공백 제거
      lightningTypeId: Number(data.lightningTypeId), // 숫자로 변환
      lightningDate: formattedDate, //ISO 8601 형식 변환
      address: data.address,
      lightningContent: data.lightningContent.trim(), // 공백 제거
      latitude: Number(data.latitude), //숫자로 변환
      longitude: Number(data.longitude), // 숫자로 변환
      lightningCapacity: Number(data.lightningCapacity), // 숫자로 변환
    };

    //서버 요구 조건에 맞는지 확인
    if (
      requestBody.lightningName.length < 3 ||
      requestBody.lightningName.length > 30
    ) {
      alert('모임명은 3자 이상 30자 이하로 입력해주세요.');
      return;
    }
    if (
      requestBody.lightningContent.length < 5 ||
      requestBody.lightningContent.length > 255
    ) {
      alert('모임 내용은 5자 이상 255자 이하로 입력해주세요.');
      return;
    }
    if (
      requestBody.lightningCapacity < 2 ||
      requestBody.lightningCapacity > 50
    ) {
      alert('모임 정원은 최소 2명, 최대 50명까지 가능합니다.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/api/lightnings',
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log('번개팟 생성 성공:', response.data);
      alert('번개팟이 생성되었습니다!');
      onClose(); // 모달 닫기
      //에러 핸들링
    } catch (error) {
      console.error('번개팟 생성 실패:', error);
      alert('번개팟 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-2"
    >
      <span className="text-sm font-semibold">테마 선택</span>
      <div className="flex gap-2">
        {themes.map((theme) => (
          <label
            key={theme.id}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm ${
              selectedType === theme.id
                ? 'bg-teal-400 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <input
              type="radio"
              {...register('lightningTypeId')}
              value={theme.id}
              className="hidden"
              onChange={() => setValue('lightningTypeId', theme.id)} // 선택 값 변경
            />
            {theme.name}
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-3 py-3">
        <input
          type="text"
          {...register('lightningName', { required: '제목을 입력해주세요.' })}
          placeholder="제목을 입력하세요"
          className="mt-1 rounded-md border p-2"
        />
        {errors.lightningName && (
          <p className="text-sm text-red-500">{errors.lightningName.message}</p>
        )}

        <textarea
          {...register('lightningContent', {
            required: '내용을 입력해주세요.',
          })}
          placeholder="번개팟 내용을 입력하세요"
          className="rounded-md border p-2"
        />
      </div>

      <div>
        <span className="text-sm font-semibold">장소 선택</span>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="text"
            {...register('address', { required: true })}
            readOnly
            className="mt-1 flex-1 rounded-md border p-2"
          />
          <button
            onClick={handleClickOpenSearch}
            className="rounded-md bg-primary-10 px-4 py-2 text-white"
          >
            검색
          </button>
        </div>
      </div>

      <div>
        <span className="text-sm font-semibold">일정 시간</span>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="datetime-local"
            {...register('lightningDate', {
              required: '날짜와 시간을 입력해주세요.',
              validate: (value) => {
                const selectedDate = new Date(value);
                const hours = selectedDate.getHours();

                // 출근 전 (06:00 ~ 09:59), 점심시간 (12:00 ~ 13:59), 퇴근 후 (17:00 ~ 23:59)만 허용
                const isValidTime =
                  (hours >= 6 && hours < 10) ||
                  (hours >= 12 && hours < 14) ||
                  (hours >= 17 && hours < 24);

                return (
                  isValidTime ||
                  '출근 전, 점심시간, 퇴근 후만 선택할 수 있습니다.'
                );
              },
            })}
            className="mt-1 rounded-md border p-2"
          />
        </div>
      </div>

      {/* 모임 최대 인원 선택 */}
      <div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">최대 인원</span>
          <span className="pb-1 text-xs text-gray-500">
            개설 확정을 위해 최소 3명이 필요합니다.
          </span>
        </div>
        <div className="flex items-center gap-5">
          {/* 슬라이더 */}
          <input
            {...register('lightningCapacity')}
            type="range"
            min="3"
            max="10"
            className="cursor-pointed w-full"
            value={capacityValue}
            onChange={(e) =>
              setValue('lightningCapacity', parseInt(e.target.value))
            }
          />
          {/* 숫자 입력 필드 */}
          <div className="relative flex h-8 w-10 overflow-hidden rounded-md border border-gray-300">
            <input
              type="number"
              className="w-full text-center outline-none"
              min={3}
              max={10}
              value={capacityValue}
              onChange={(e) =>
                setValue('lightningCapacity', parseInt(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between py-3">
        <Button
          text="취소"
          onClick={onClose}
          className="rounded-md bg-gray-500 px-4 py-2 text-white"
        />
        <Button
          text="완료"
          onClick={handleSubmit(onSubmitHandler)}
          disabled={!isValid}
          className="rounded-md bg-primary-10 px-4 py-2 text-white disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default LightningModal;
