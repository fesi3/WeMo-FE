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
      <div className="flex flex-col">
        {children}
        {errorMessage && (
          <span className="text-sm text-heart">{errorMessage}</span>
        )}
      </div>
    </>
  );
}
