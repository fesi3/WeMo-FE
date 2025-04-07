import { PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import GNBHeader from '@/widgets/GNB/ui/GNB-header';
import GNBFooter from '@/widgets/GNB/ui/GNB-footer';
import useAuth from '@/shared/hooks/useAuth';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';
import { hideGnbPathNames } from '@/shared/constants/gnb';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
});

function GNB({ children }: PropsWithChildren) {
  const router = useRouter();
  const { pathname } = router;
  const shouldHideGNB = hideGnbPathNames.includes(pathname);
  useAuth();
  return (
    <>
      <GNBHeader />
      <main
        className={twMerge(shouldHideGNB ? '' : 'mt-[46px]', noto.className)}
      >
        {children}
      </main>
      <GNBFooter />
    </>
  );
}

export default GNB;
