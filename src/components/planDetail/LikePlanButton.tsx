import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import HeartIcon from '@/assets/icons/emptyHeart.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

interface LikePlanButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

export default function LikePlanButton({
  isLiked,
  onClick,
}: LikePlanButtonProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();
  return (
    <div className="relative w-[30px]">
      <motion.button
        onClick={isLoggedIn ? onClick : () => router.push('/start')}
        key={isLiked ? 'active' : 'inactive'}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.5 }}
        className="absolute h-[30px] w-[30px]"
      >
        <HeartIcon
          className={twMerge('h-full w-full', isLiked ? 'fill-heart' : '')}
        />
      </motion.button>
    </div>
  );
}
