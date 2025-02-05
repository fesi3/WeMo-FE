import { motion } from 'motion/react';

interface ProgressBarProps {
  capacity: number;
  participants: number;
}

export default function ProgressBar({
  capacity,
  participants,
}: ProgressBarProps) {
  const progress = (participants / capacity) * 100;
  return (
    <div className="relative h-1 w-full rounded-full bg-primary-95">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${progress || 5}%` }}
        transition={{ ease: 'easeOut', duration: 0.7 }}
        className="absolute left-0 top-0 h-1 rounded-full bg-primary-10"
      ></motion.div>
    </div>
  );
}
