'use client';

import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { MetaPair } from '@/components/ui/MetaPair';
import { formatEventDate, getEventTitle, getEventTypeLabel } from '@/lib/event-presenters';
import type { Event } from '@/types/content';

interface EventBlockProps {
  event: Event;
}

export function EventBlock({ event }: EventBlockProps) {
  const locale = useLocale() as 'nb' | 'en';
  const formatted = formatEventDate(locale, event.timestamp, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="rounded-xl border-l-2 border-l-accent-primary bg-bg-raised/90 p-4 ghost-border">
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="primary">{getEventTypeLabel(locale, event.type)}</Badge>
        <span className="font-mono text-[10px] text-neutral-dim">{formatted}</span>
      </div>
      <h3 className="font-headline text-base font-bold tracking-headline text-neutral md:text-lg">
        {getEventTitle(locale, event.slug)}
      </h3>
      <p className="mt-1 line-clamp-2 font-mono text-xs text-neutral/70">
        {event.excerpt}
      </p>
      <div className="mt-3 flex flex-wrap gap-4">
        <MetaPair label="LOCATION" value={event.location} />
        <MetaPair label="CAPACITY" value={`${event.capacity.current}/${event.capacity.max}`} />
      </div>
    </article>
  );
}
