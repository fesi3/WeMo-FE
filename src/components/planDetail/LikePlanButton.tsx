import ThumbUpIcon from '@/assets/icons/thumb_up.svg';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface LikePlanButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

export default function LikePlanButton({
  isLiked,
  onClick,
}: LikePlanButtonProps) {
  return (
    <div className="relative w-[30px]">
      <motion.button
        onClick={onClick}
        key={isLiked ? 'active' : 'inactive'}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.5 }}
        className="absolute h-[30px] w-[30px]"
      >
        <ThumbUpIcon
          className={twMerge('h-full w-full', isLiked ? 'fill-primary-10' : '')}
        />
      </motion.button>
    </div>
  );
}
