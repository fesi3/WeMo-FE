import Image from 'next/image';
import MemberIcon from '@/assets/icons/member.svg';
import defaultImage from '@/assets/images/default-image.png';
import { useRouter } from 'next/router';
import { PlanDataWithCategory } from '@/types/plans';

type SearchResultCardTypes = Pick<
  PlanDataWithCategory,
  'planImagePath' | 'planName' | 'meetingName' | 'participants' | 'planId'
>;

interface SearchResultCardProps {
  props: SearchResultCardTypes;
  isMeeting?: boolean;
  handleClose: () => void;
}

function SearchResultCard({
  props,
  isMeeting = false,
  handleClose,
}: SearchResultCardProps) {
  const { planImagePath, meetingName, planName, participants, planId } = props;
  const router = useRouter();
  return (
    // [프롭스 드릴링] - 리덕스를 활용한 모달 전역 상태관리 필요
    <div
      onClick={() => {
        router.push(`/plans/${planId}`);
        handleClose();
      }}
      className="h-[140px] w-full max-w-[446px] rounded-lg bg-primary-100 px-[10px] py-[26.5px]"
    >
      {/* // 래퍼 */}
      <div className="flex h-[103px] w-full">
        {/* //이미지 영역  */}
        <div className="relative h-[57px] w-[91px] overflow-hidden rounded-[4px]">
          <Image
            src={planImagePath ? planImagePath : defaultImage}
            onError={() => defaultImage}
            alt="result-card-image"
            fill
            sizes="33vw"
          />
        </div>
        {/* // 텍스트 영역 */}
        <div className="mx-auto flex flex-col items-center">
          <span className="mb-[30px] w-full text-base font-semibold leading-none">
            {meetingName}
          </span>
          <div className="flex w-full flex-col text-sm text-[#888B93]">
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
