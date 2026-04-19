import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { grotesk, mono } from '@/lib/fonts';
import { GridBg } from '@/components/layout/GridBg';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Sigma NMBU — Data Science Branch',
  description: 'Linjeforeningen for datavitenskap ved NMBU',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${grotesk.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-bg font-mono text-neutral antialiased">
        <NextIntlClientProvider messages={messages}>
          <GridBg />
          <div className="relative z-10 flex min-h-screen flex-col">
            <TopNavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
