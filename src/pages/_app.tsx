import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={noto.className}>
      <Component {...pageProps} />
    </main>
  );
}
