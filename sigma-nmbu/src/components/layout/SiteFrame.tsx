import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { Footer } from './Footer';
import { GridBg } from './GridBg';
import { TopNavBar } from './TopNavBar';

interface SiteFrameProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}

export function SiteFrame({ children, messages }: SiteFrameProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      <GridBg />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNavBar />
        <main className="relative mx-auto flex w-full max-w-[1920px] flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
