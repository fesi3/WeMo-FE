import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface WithErrorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  inputClassName?: string;
}

function withError<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithErrorProps & T) => {
    const { error, inputClassName, ...rest } = props;

    return (
      <motion.div
        className="relative flex flex-col"
        animate={error ? { x: [-3, 3, -2, 2, 0] } : {}} // 🔽 Reduced shaking effect
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Wrapped Input */}
        <WrappedComponent
          {...(rest as T)}
          className={twMerge(
            inputClassName,
            `rounded`,
            error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300',
          )}
        />

        {/* 에러 메시지 */}
        {error && (
          <motion.span
            className="absolute right-0 top-10 text-tiny text-red-400 md:top-11"
            initial={{ opacity: 0, y: -5 }} // 처음에 투명하고 살짝 위에 위치
            animate={{ opacity: 1, y: 0 }} // 부드럽게 나타나는 애니메이션
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.span>
        )}
      </motion.div>
    );
  };
}

export default withError;
