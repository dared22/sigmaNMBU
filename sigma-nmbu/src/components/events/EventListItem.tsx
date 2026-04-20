import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import {
  formatEventDate,
  getComplexityStripe,
  getEventTitle,
  getEventTypeLabel,
} from '@/lib/event-presenters';
import type { Event, Locale } from '@/types/content';

interface EventListItemProps {
  event: Event;
  locale: Locale;
}

export function EventListItem({ event, locale }: EventListItemProps) {
  const t = useTranslations('events');
  const complexityStripe = getComplexityStripe(event.complexity);
  const metadataBorder =
    complexityStripe === 'secondary' ? 'border-tertiary' : 'border-secondary';

  return (
    <Panel className="overflow-hidden bg-surface-container-low p-0 hover-matrix">
      <article className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
        <div className={`md:w-48 md:flex-shrink-0 md:border-l-2 md:pl-4 ${metadataBorder}`}>
          <div className="space-y-4">
            <div>
              <p className="font-label text-xs uppercase text-on-surface-variant">
                timestamp
              </p>
              <p className="mt-1 font-label text-sm text-primary">
                {formatEventDate(locale, event.timestamp, {
                  day: '2-digit',
                  month: 'short',
                })}
              </p>
            </div>
            <div>
              <p className="font-label text-xs uppercase text-on-surface-variant">
                complexity
              </p>
              <p className="mt-1 font-label text-sm text-primary">
                {t(`item.complexity.${event.complexity}`)}
              </p>
            </div>
            <div>
              <p className="font-label text-xs uppercase text-on-surface-variant">
                input
              </p>
              <p className="mt-1 break-words font-label text-sm text-primary">
                {event.input}
              </p>
            </div>
            <div>
              <p className="font-label text-xs uppercase text-on-surface-variant">
                output
              </p>
              <p className="mt-1 break-words font-label text-sm text-primary">
                {event.output}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-sm bg-surface-container-highest px-2 py-1 font-mono text-xs text-secondary ghost-border">
              module_type: &quot;{getEventTypeLabel(locale, event.type)}&quot;
            </span>
            {event.featured ? <Badge variant="status">FEATURED</Badge> : null}
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-2xl tracking-tight text-primary md:text-3xl">
              {getEventTitle(locale, event.slug)}
            </h2>
            <p className="max-w-3xl font-body text-sm leading-relaxed text-on-surface-variant md:text-base">
              {event.excerpt}
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-sm bg-surface-container-lowest p-4 font-mono text-xs text-on-surface-variant lg:flex-row lg:items-center lg:justify-between">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <p className="font-label uppercase">{t('item.location')}</p>
                <p className="font-label text-sm text-primary">{event.location}</p>
              </div>
              <div className="space-y-1">
                <p className="font-label uppercase">{t('item.capacity')}</p>
                <p className="font-label text-sm text-primary">
                  {event.capacity.current}/{event.capacity.max}
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-label uppercase">SPEAKERS</p>
                <p className="font-label text-sm text-primary">
                  {event.speakers[0] ?? 'TBA'}
                </p>
              </div>
            </div>

            <Link
              href={{
                pathname: '/arrangementer/[slug]',
                params: { slug: event.slug },
              }}
            >
              <Button
                variant="ghost"
                className="px-4 py-1.5 text-primary hover:bg-surface-tint hover:text-background"
              >
                {t('item.registerCta')}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Panel>
  );
}
