import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetaPair } from '@/components/ui/MetaPair';
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

  return (
    <Panel
      stripe={complexityStripe}
      className="overflow-hidden p-0"
    >
      <article className="grid md:grid-cols-[6.5rem_1fr]">
        <div className="border-b border-line bg-black/18 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-dim md:border-b-0 md:border-r">
          <div className="space-y-4">
            <div>
              <p>timestamp</p>
              <p className="mt-1 text-neutral">
                {formatEventDate(locale, event.timestamp, {
                  day: '2-digit',
                  month: 'short',
                })}
              </p>
            </div>
            <div>
              <p>complexity</p>
              <p className="mt-1 text-neutral">{t(`item.complexity.${event.complexity}`)}</p>
            </div>
            <div>
              <p>input</p>
              <p className="mt-1 break-words text-neutral">{event.input}</p>
            </div>
            <div>
              <p>output</p>
              <p className="mt-1 break-words text-neutral">{event.output}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-5 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={complexityStripe === 'warn' ? 'secondary' : 'primary'}>
              {getEventTypeLabel(locale, event.type)}
            </Badge>
            {event.featured ? <Badge variant="status">FEATURED</Badge> : null}
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-2xl tracking-[-0.04em] text-neutral md:text-3xl">
              {getEventTitle(locale, event.slug)}
            </h2>
            <p className="max-w-3xl font-mono text-sm leading-relaxed text-neutral/78 md:text-base">
              {event.excerpt}
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t border-line pt-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MetaPair label={t('item.location')} value={event.location} />
              <MetaPair
                label={t('item.capacity')}
                value={`${event.capacity.current}/${event.capacity.max}`}
              />
              <MetaPair label="SPEAKERS" value={event.speakers[0] ?? 'TBA'} />
            </div>

            <Link
              href={{
                pathname: '/arrangementer/[slug]',
                params: { slug: event.slug },
              }}
            >
              <Button variant="primary">{t('item.registerCta')}</Button>
            </Link>
          </div>
        </div>
      </article>
    </Panel>
  );
}
