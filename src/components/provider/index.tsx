import { PropsWithChildren } from 'react';

import ReduxProvider from './ReduxProvider';
import ReactQueryProvider from './ReactQueryProvider';
import ToastContainer from '../shared/toast/ToastContainer';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        {children}
        <div id="modal" />
        <ToastContainer />
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
