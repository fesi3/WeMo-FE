import { PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import GNBHeader from '@/widgets/GNB/ui/GNB-header';
import GNBFooter from '@/widgets/GNB/ui/GNB-footer';
import useAuth from '@/shared/hooks/useAuth';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  useAuth();
  return (
    <main className={noto.className}>
      <GNBHeader />
      {children}
      <GNBFooter />
    </main>
  );
}

export default GNB;
