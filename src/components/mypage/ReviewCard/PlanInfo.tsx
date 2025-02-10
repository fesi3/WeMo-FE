import Image, { StaticImageData } from 'next/image';
import { formatTime } from '@/utils/dateUtils';

interface PlanInfoProps {
  planName: string;
  dateTime: string;
  address: string;
  planImagePath: string | StaticImageData;
}

const PlanInfo = ({
  planName,
  dateTime,
  address,
  planImagePath,
}: PlanInfoProps) => {
  //   const goPlanDetail = (planId: number) => {
  //     console.log(planId, '번 으로 이동');
  //     // 일정 상세로 이동
  //   };

  return (
    <div className="rounded-lg py-3 hover:bg-gray-100">
      {/* 일정 정보 */}
      <div
        className="flex gap-4 p-2"
        // onClick={() => {
        //   goPlanDetail(planId);
        // }}
      >
        <div className="relative h-[60px] w-[60px]">
          <Image
            src={planImagePath}
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
