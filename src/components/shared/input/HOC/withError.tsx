import React from 'react';
import { twMerge } from 'tailwind-merge';

interface WithErrorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function withError<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: WithErrorProps & T) => {
    const { error, ...rest } = props;

    return (
      <div className="relative flex flex-col">
        {/* Wrapped Input */}
        <WrappedComponent
          {...(rest as T)}
          className={twMerge(
            `rounded border p-2`,
            error ? 'border-red-400' : 'border-gray-300',
          )}
        />
        {/* 에러 메세지 */}
        {error && (
          <span className="absolute right-0 top-12 text-small text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  };
}

export default withError;
