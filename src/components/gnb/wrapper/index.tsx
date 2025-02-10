import Link from 'next/link';
import { ReactNode } from 'react';

function LinkWrapper({
  isDisabled,
  path,
  children,
}: {
  isDisabled: boolean;
  path: string;
  children: ReactNode;
}) {
  return isDisabled ? <>{children}</> : <Link href={path}>{children}</Link>;
}

export default LinkWrapper;
