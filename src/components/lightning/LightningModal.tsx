import { useForm, SubmitHandler } from 'react-hook-form';
import axiosInstance from '@/api/axiosInstance';
import Button from '@/components/shared/Button';

interface LightningMeetupFormValues {
  lightningName: string;
  lightningTypeId: number;
  dateTypeId: number;
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

const times = [
  { id: 1, name: '출근 전' },
  { id: 2, name: '점심' },
  { id: 3, name: '퇴근 후' },
];

interface LightningModalProps {
  onClose: () => void;
}

const LightningModal = ({ onClose }: LightningModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LightningMeetupFormValues>({
    mode: 'onChange',
    defaultValues: {
      lightningName: '',
      lightningTypeId: 3, // 기본값: 카풀
      dateTypeId: 1, // 기본값: 출근 전
      lightningDate: '',
      address: '서울 양천구 신정동 목동아파트 10단지',
      lightningContent: '',
      latitude: 37.51489494503132,
      longitude: 126.85861232838182,
      lightningCapacity: 2,
    },
  });

  const onSubmitHandler: SubmitHandler<LightningMeetupFormValues> = async (
    data,
  ) => {
    console.log('요청 데이터 전송:', JSON.stringify(data, null, 2));

    //서버가 요구하는 `LocalDateTime` 형식으로 변환 (ISO 8601)
    const formattedDate = new Date(data.lightningDate).toISOString();

    // 수정된 데이터 객체
    const requestBody = {
      lightningName: data.lightningName.trim(), // 공백 제거
      lightningTypeId: Number(data.lightningTypeId), // 숫자로 변환
      dateTypeId: Number(data.dateTypeId), //숫자로 변환
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
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        {...register('lightningName', { required: '제목을 입력해주세요.' })}
        placeholder="제목을 입력하세요"
        className="rounded-md border p-2"
      />
      {errors.lightningName && (
        <p className="text-sm text-red-500">{errors.lightningName.message}</p>
      )}

      <select
        {...register('lightningTypeId', { required: true })}
        className="rounded-md border p-2"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>

      <select
        {...register('dateTypeId', { required: true })}
        className="rounded-md border p-2"
      >
        {times.map((time) => (
          <option key={time.id} value={time.id}>
            {time.name}
          </option>
        ))}
      </select>

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
              isValidTime || '출근 전, 점심시간, 퇴근 후만 선택할 수 있습니다.'
            );
          },
        })}
        className="rounded-md border p-2"
      />

      <textarea
        {...register('lightningContent', {
          required: '내용을 입력해주세요.',
        })}
        placeholder="번개팟 내용을 입력하세요"
        className="rounded-md border p-2"
      />

      <div className="flex justify-between">
        <Button
          text="취소"
          onClick={onClose}
          className="rounded-md bg-gray-500 px-4 py-2 text-white"
        />
        <Button
          text="완료"
          onClick={handleSubmit(onSubmitHandler)}
          disabled={!isValid}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default LightningModal;
