import Image from 'next/image';
import planimg from '@/assets/images/profile.png'; // api 요청으로 planImg도 받아와야 함.
import { formatTime } from '@/utils/dateUtils';

interface PlanInfoProps {
  planName: string;
  dateTime: string;
  address: string;
}

const PlanInfo = ({ planName, dateTime, address }: PlanInfoProps) => {
  //   const goPlanDetail = (planId: number) => {
  //     console.log(planId, '번 으로 이동');
  //     // 일정 상세로 이동
  //   };

  return (
    <div>
      {/* 일정 정보 */}
      <div
        className="flex gap-4 p-2"
        // onClick={() => {
        //   goPlanDetail(planId);
        // }}
      >
        <div className="relative h-[60px] w-[60px]">
          <Image
            src={planimg}
            alt="일정 이미지"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        {/* 일정 이름 + 정보 */}
        <div className="flex flex-1 flex-col justify-around">
          <p className="text-base font-semibold">{planName}</p>

          <p className="text-sm text-[#A4A4A4]">
            {address} | {formatTime(dateTime)} 이용
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanInfo;
