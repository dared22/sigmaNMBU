import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { LiveStreamFeed } from '@/components/home/LiveStreamFeed';
import { AuthTerminal } from '@/components/home/AuthTerminal';
import { getEvents } from '@/lib/mdx';
import { getNews } from '@/lib/mdx';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `Sigma NMBU — ${t('hero.titleAccent')}`,
    description: t('hero.body'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const events = getEvents(locale);
  const news = getNews(locale);

  return (
    <>
      <Hero />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <LiveStreamFeed events={events.slice(0, 5)} news={news.slice(0, 3)} />
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
