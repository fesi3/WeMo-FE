import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import QueryProvider from '@/components/react-query/queryProvider';
import Head from 'next/head';
import GNB from '@/components/shared/layout/GNB';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WeMo - 직장인 힐링 모임 매칭 서비스</title>
      </Head>
      <GNB>
        <QueryProvider>
          <Component {...pageProps} />
        </QueryProvider>
      </GNB>
    </>
  );
}
