import { PropsWithChildren } from 'react';

import ReduxProvider from './ReduxProvider';
import ReactQueryProvider from './ReactQueryProvider';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ReduxProvider>
  );
}
