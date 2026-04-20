import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteFrame } from '@/components/layout/SiteFrame';

export const metadata: Metadata = {
  title: 'Sigma NMBU — Data Science Branch',
  description: 'Linjeforeningen for datavitenskap ved NMBU',
};

export function generateStaticParams() {
  return routing.locales
    .filter((locale) => locale !== routing.defaultLocale)
    .map((locale) => ({ locale }));
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

  return <SiteFrame messages={messages}>{children}</SiteFrame>;
}
