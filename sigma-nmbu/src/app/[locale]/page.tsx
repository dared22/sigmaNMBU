import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { LiveStreamFeed } from '@/components/home/LiveStreamFeed';
import { listEvents } from '@/lib/events';
import { getPage } from '@/lib/mdx';
import { listNews } from '@/lib/news';
import type { Locale } from '@/types/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const page = getPage('home', locale as Locale);

  return {
    title: page?.title ?? `Sigma NMBU — ${t('hero.titleAccent')}`,
    description: page?.description ?? t('hero.body'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const events = listEvents(locale);
  const news = listNews(locale);

  return (
    <>
      <Hero />

      <section className="w-full px-6 py-16">
        <LiveStreamFeed events={events.slice(0, 3)} news={news.slice(0, 2)} />
      </section>
    </>
  );
}
