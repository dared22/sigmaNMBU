import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/navigation';
import { MDXContent } from '@/components/content/MDXContent';
import { EventMetaSidebar } from '@/components/events/EventMetaSidebar';
import { findEventBySlug, listEventSlugs } from '@/lib/events';
import {
  formatEventDate,
  getEventTitle,
  getEventTypeLabel,
} from '@/lib/event-presenters';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/content';

export function generateStaticParams() {
  return routing.locales
    .filter((locale) => locale !== routing.defaultLocale)
    .flatMap((locale) =>
      listEventSlugs(locale as Locale).map((slug) => ({ locale, slug })),
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = findEventBySlug(locale as Locale, slug);

  if (!event) {
    return {
      title: 'Sigma NMBU — Event',
    };
  }

  return {
    title: `Sigma NMBU — ${getEventTitle(locale as Locale, event.slug)}`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: 'events' });
  setRequestLocale(locale);

  const event = findEventBySlug(locale, slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-8 md:space-y-12 md:py-10">
      <section className="space-y-6 border-b border-line pb-8">
        <Link
          href="/arrangementer"
          className="inline-flex font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-dim transition-colors hover:text-accent-primary"
        >
          {t('detail.back')}
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">{getEventTypeLabel(locale, event.type)}</Badge>
          <Badge>{t(`item.complexity.${event.complexity}`)}</Badge>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-4xl font-headline text-4xl tracking-headline text-neutral md:text-6xl">
            {getEventTitle(locale, event.slug)}
          </h1>
          <p className="max-w-3xl font-mono text-sm leading-relaxed text-neutral/78 md:text-base">
            {event.excerpt}
          </p>
        </div>

        <div className="grid gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-dim sm:grid-cols-3">
          <span>
            {formatEventDate(locale, event.timestamp, {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span>{event.location}</span>
          <span>
            {event.capacity.current}/{event.capacity.max}
          </span>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <article className="prose prose-invert max-w-none">
          <MDXContent source={event.content} />
        </article>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <EventMetaSidebar event={event} />
        </div>
      </section>
    </div>
  );
}
