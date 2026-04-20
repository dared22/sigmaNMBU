import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { EventFiltersSidebar } from '@/components/events/EventFiltersSidebar';
import { EventListItem } from '@/components/events/EventListItem';
import { listEvents } from '@/lib/events';
import type { Complexity, EventType, Locale } from '@/types/content';

const eventTypes: EventType[] = [
  'workshop',
  'guest_lecture',
  'hackathon',
  'social',
];

const complexities: Complexity[] = ['o1', 'on', 'on2'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return {
    title: `Sigma NMBU — ${t('heading')}`,
    description: t('subtitle'),
  };
}

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const filters = await searchParams;
  const t = await getTranslations({ locale, namespace: 'events' });
  setRequestLocale(locale);

  const selectedTypes = (Array.isArray(filters.type)
    ? filters.type
    : filters.type
      ? [filters.type]
      : []
  ).filter((value): value is EventType => eventTypes.includes(value as EventType));

  const selectedComplexity = complexities.includes(filters.complexity as Complexity)
    ? (filters.complexity as Complexity)
    : undefined;

  const allEvents = listEvents(locale);
  const filteredEvents = allEvents.filter((event) => {
    if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
      return false;
    }

    if (selectedComplexity && event.complexity !== selectedComplexity) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full space-y-10 px-6 py-8 md:space-y-12 md:py-10">
      <ScrollReveal>
        <section className="space-y-5 border-b border-line pb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="font-label text-[11px] uppercase tracking-[0.28em] text-tertiary">
                {t('subtitle')}
              </p>
              <h1 className="font-headline text-4xl tracking-tight text-primary md:text-6xl">
                {t('heading')}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="status">
                {t('stats.activeNodes')}: {filteredEvents.length}
              </Badge>
              <Badge>{t('stats.uptime')}: 99.98%</Badge>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="grid gap-8 lg:grid-cols-[20rem_1fr]">
        <ScrollReveal delay={0.04}>
          <EventFiltersSidebar
            selectedTypes={selectedTypes}
            selectedComplexity={selectedComplexity}
          />
        </ScrollReveal>

        <div className="space-y-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <ScrollReveal key={event.slug} delay={0.04 * (index + 1)}>
                <EventListItem event={event} locale={locale} />
              </ScrollReveal>
            ))
          ) : (
            <ScrollReveal delay={0.08}>
              <Panel className="px-6 py-8">
                <p className="font-mono text-sm text-neutral/78">
                  {t('list.emptyState')}
                </p>
              </Panel>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
