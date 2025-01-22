import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import QueryProvider from '@/components/react-query/queryProvider';
import Head from 'next/head';
import GNB from '@/components/shared/layout/GNB';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WeMo - 직장인 힐링 모임 매칭 서비스</title>
      </Head>
      <Provider store={store}>
        <QueryProvider>
          <GNB>
            <Component {...pageProps} />
          </GNB>
        </QueryProvider>
      </Provider>
    </>
  );
}
