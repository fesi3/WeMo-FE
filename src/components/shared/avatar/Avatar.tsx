import Image from 'next/image';

interface AvatarProps {
  imageUrl: string;
  className?: string;
}

/**
 * 유저 프로필 동그라미 이미지 컴포넌트
 * className으로 스타일을 추가할 수 있습니다.
 */
export default function Avatar({ imageUrl, className }: AvatarProps) {
  return (
    <>
      <div
        className={`relative h-20 w-20 overflow-hidden rounded-full border-2 border-white ${className}`}
      >
        <Image sizes="20vw" src={imageUrl} alt="유저 프로필" fill />
      </div>
    </>
  );
}
