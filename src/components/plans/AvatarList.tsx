import { User } from '@/types/api/plan';
import Avatar from '../shared/avatar/Avatar';

interface AvatarListProps {
  users: User[];
}

export default function AvatarList({ users }: AvatarListProps) {
  const userList = users.slice(0, 3);
  return (
    <div className="ml-[10px] flex">
      {userList.map((user) => (
        <Avatar
          key={user.nickname}
          imageUrl={user.profileImagePath}
          className="relative -ml-[10px] h-[28px] w-[28px]"
        />
      ))}
      {users.length > 3 && (
        <div className="relative -ml-[10px] flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-white bg-primary-90 text-sm">{`+${users.length - 3}`}</div>
      )}
    </div>
  );
}
