import Image from 'next/image';
import { useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();
    const dragBuffer = 50; // 드래그 기준 값

    if (x <= -dragBuffer && imageIndex < images.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else if (x >= dragBuffer && imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  const handleImageIndex = (arrow: 'left' | 'right') => {
    if (arrow === 'left' && imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    } else if (arrow === 'right' && imageIndex < images.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-transparents relative flex w-full overflow-hidden rounded-md">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: 0 }}
        style={{ x: dragX }}
        animate={{
          translateX: `-${imageIndex * 100}%`,
        }}
        onDragEnd={onDragEnd}
        className="flex w-full shrink-0"
      >
        {images.map((image, index) => (
          <div
            className="relative w-full shrink-0 pt-[60%]"
            key={index} /**바꿔야댐 */
            onClick={(e) => e.preventDefault()}
          >
            <Image
              src={image}
              alt="일정 상세 이미지지"
              fill
              className="pointer-events-none object-contain"
              sizes="50vw"
              priority
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-[5%] left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, index) => (
          <span
            key={index}
            /**바꿔야댐 */ className={`h-[10px] w-[10px] rounded-full bg-white ${imageIndex !== index && 'opacity-30'}`}
          ></span>
        ))}
      </div>
      <button
        onClick={() => {
          handleImageIndex('left');
        }}
        className="absolute left-[2%] top-1/2 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-black text-xl opacity-60 md:flex"
      >
        <ArrowLeftIcon color="white" />
      </button>
      <button
        onClick={() => {
          handleImageIndex('right');
        }}
        className="absolute right-[2%] top-1/2 hidden h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-black text-xl opacity-60 md:flex"
      >
        <ArrowRightIcon color="white" />
      </button>
    </div>
  );
}
