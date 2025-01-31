import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';
import getQueryClient from '@/utils/getQueryClient';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// eslint-disable-next-line prefer-const
export let persistor = persistStore(store);

export default function Provider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
