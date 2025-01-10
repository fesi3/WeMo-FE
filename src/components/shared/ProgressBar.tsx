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
    <div className="relative h-1 w-full rounded-full bg-gray-300">
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: 'easeOut', duration: 0.7 }}
        className="absolute left-0 top-0 h-1 rounded-full bg-orange-500"
      >
        {/* <div className="absolute -right-[30px] top-[17px]">
          <div className="relative max-w-xs rounded-lg bg-orange-500 px-2 py-[2px] text-sm text-white">
            <span>{`${participants} 명`}</span>
            <p className="font-sans text-base font-semibold"></p>
            <div className="absolute bottom-5 right-[26px] h-0 w-0 border-b-[15px] border-l-[5px] border-r-[5px] border-transparent border-b-orange-500"></div>
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}
