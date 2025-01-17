import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import QueryProvider from '@/components/react-query/queryProvider';
import Head from 'next/head';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>WeMo - 직장인 힐링 모임 매칭 서비스</title>
      </Head>
      <main className={noto.className}>
        <QueryProvider>
          <Component {...pageProps} />
        </QueryProvider>
      </main>
    </>,
  );
}
