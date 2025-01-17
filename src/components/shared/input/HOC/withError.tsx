import React from 'react';
import { twMerge } from 'tailwind-merge';

interface WithErrorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  inputClassName?: string;
}

function withError<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithErrorProps & T) => {
    const { error, inputClassName, ...rest } = props;

    return (
      <div className="relative flex flex-col">
        {/* Wrapped Input */}
        <WrappedComponent
          {...(rest as T)}
          className={twMerge(
            inputClassName,
            `rounded`,
            error ? 'border-red-400' : 'border-gray-300',
          )}
        />
        {/* 에러 메세지 */}
        {error && (
          <span className="absolute right-0 top-10 text-tiny text-red-400 md:top-11">
            {error}
          </span>
        )}
      </div>
    );
  };
}

export default withError;
