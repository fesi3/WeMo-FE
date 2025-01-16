import Image from 'next/image';
import { Fragment } from 'react';

interface Member {
  nickname: string;
  profileImagePath: string;
  createdAt: string;
}

interface MemberListProps {
  members: Member[];
}

export default function MemberList({ members }: MemberListProps) {
  const visibleMembers = members.slice(0, 6);
  return (
    <div className="flex w-full flex-wrap">
      {members.length > 0 ? (
        visibleMembers.map((member, index) => (
          <Fragment key={member.createdAt}>
            <div className="flex w-1/2 items-center justify-stretch gap-2 border-b-2 py-4">
              <Image
                src={member.profileImagePath}
                alt="멤버 프로필"
                width={40}
                height={40}
                className="aspect-square rounded-full"
              />
              <span>{member.nickname}</span>
            </div>
            {index === members.length - 1 && members.length % 2 === 1 && (
              <div className="w-1/2 border-b-2" />
            )}
          </Fragment>
        ))
      ) : (
        <div className="flex-center h-40 w-full">멤버 없음</div>
      )}
    </div>
  );
}
