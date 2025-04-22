import { PropsWithChildren } from 'react';

import ToastContainer from '@/shared/components/toast/ToastContainer';
import ReduxProvider from './ReduxProvider';
import ReactQueryProvider from './ReactQueryProvider';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        {children}
        <ToastContainer />
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
