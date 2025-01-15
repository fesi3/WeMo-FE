import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import QueryProvider from '@/components/react-query/queryProvider';

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
    <main className={noto.className}>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </main>,
  );
}
