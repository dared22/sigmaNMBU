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
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
