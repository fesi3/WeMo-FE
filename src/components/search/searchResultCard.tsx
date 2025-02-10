import Image from 'next/image';
import MemberIcon from '@/assets/icons/member.svg';
import defaultImage from '@/assets/images/default-image.png';
import { PlanData } from '@/types/mypageType';

type SearchResultCardTypes = Pick<
  PlanData,
  'planImagePath' | 'planName' | 'meetingName' | 'participants'
>;

interface SearchResultCardProps {
  props: SearchResultCardTypes;
  isMeeting: boolean;
}

function SearchResultCard({ props, isMeeting = false }: SearchResultCardProps) {
  const { planImagePath, meetingName, planName, participants } = props;
  return (
    <div className="h-[140px] w-full max-w-[446px] rounded-lg bg-primary-100 px-[10px] py-[26.5px]">
      {/* // 래퍼 */}
      <div className="flex h-[103px] w-full">
        {/* //이미지 영역  */}
        <div className="relative h-[57px] w-[91px] overflow-hidden rounded-[4px]">
          <Image
            src={planImagePath ? planImagePath : defaultImage}
            onError={() => defaultImage}
            alt="result-card-image"
            fill
          />
        </div>
        {/* // 텍스트 영역 */}
        <div className="mx-auto flex flex-col items-center">
          <span className="mb-[30px] text-base font-semibold leading-none">
            {meetingName}
          </span>
          <div className="flex flex-col text-sm text-[#888B93]">
            <p>{planName}</p>
            <div className="flex items-center indent-1 font-semibold">
              <MemberIcon />
              <p>
                {'멤버 수'}
                {` ${participants}${isMeeting ? `·예정 모임${0}` : ''}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
