import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { LiveStreamFeed } from '@/components/home/LiveStreamFeed';
import { AuthTerminal } from '@/components/home/AuthTerminal';
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

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <LiveStreamFeed events={events.slice(0, 3)} news={news.slice(0, 2)} />
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <AuthTerminal />
          </div>
        </div>
      </section>
    </>
  );
}
