import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface WithErrorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  inputClassName?: string;
}

// 모듈 파일은 한 번만 로드되어 hasFocused 변수는 고유한 메모리 주소를 갖는다.
// 따라서, 새롭게 생성되는 withError 컴포넌트라도 이 변수를 참조하여 포커스 상태를 관리할 수 있다.
let hasFocused = false;

function withError<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithErrorProps & T) => {
    const { error, inputClassName, ...rest } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (error && inputRef.current && !hasFocused) {
        inputRef.current.focus();
        hasFocused = true; // 첫 번째 포커싱 후 막음
      }
    }, [error]);

    return (
      <motion.div
        className="relative flex flex-col"
        animate={error ? { x: [-3, 3, -2, 2, 0] } : {}} // 🔽 Reduced shaking effect
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Wrapped Input */}
        <WrappedComponent
          {...(rest as T)}
          ref={inputRef}
          className={twMerge(
            inputClassName,
            `rounded`,
            error
              ? 'border border-red-400 focus:ring-red-400'
              : 'border-gray-300',
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

export const resetFocusFlag = () => {
  hasFocused = false;
};

export default withError;
