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
          <>
            <div
              key={member.createdAt}
              className="flex w-1/2 items-center justify-stretch gap-2 border-b-2 py-4"
            >
              <span className="h-10 w-10 rounded-full bg-black" />
              <span>{member.nickname}</span>
            </div>
            {index === members.length - 1 && members.length % 2 === 1 && (
              <div className="w-1/2 border-b-2" />
            )}
          </>
        ))
      ) : (
        <div className="flex-center h-40 w-full">멤버 없음</div>
      )}
    </div>
  );
}
