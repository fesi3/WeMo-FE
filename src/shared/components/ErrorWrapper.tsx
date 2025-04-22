import { PropsWithChildren } from 'react';

interface ErrorWrapperProps {
  errorMessage?: string;
}

export default function ErrorWrapper({
  children,
  errorMessage,
}: PropsWithChildren<ErrorWrapperProps>) {
  return (
    <>
      <div className="relative flex flex-col">
        {children}
        {errorMessage && (
          <span className="absolute -bottom-5 right-0 text-tiny text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    </>
  );
}
