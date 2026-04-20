'use client';

import { useLocale } from 'next-intl';
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
  const stripeClass = event.type === 'guest_lecture' || event.type === 'social'
    ? 'bg-tertiary'
    : 'bg-secondary';

  return (
    <article className="relative overflow-hidden rounded-sm bg-surface-container p-5 ghost-border">
      <div className={`absolute left-0 top-0 h-full w-1 ${stripeClass}`} />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-label text-xs text-secondary">{formatted}</span>
        <span className="rounded-sm bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
          {getEventTypeLabel(locale, event.type)}
        </span>
      </div>
      <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
        {getEventTitle(locale, event.slug)}
      </h3>
      <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-on-surface-variant">
        {event.excerpt}
      </p>
      <div className="mt-5 flex flex-wrap gap-6 rounded-sm bg-surface-container-lowest p-4 font-label text-xs text-on-surface-variant ghost-border">
        <div className="space-y-1">
          <p className="tracking-[0.18em] text-on-surface">LOCATION</p>
          <p className="text-secondary">{event.location}</p>
        </div>
        <div className="space-y-1">
          <p className="tracking-[0.18em] text-on-surface">CAPACITY</p>
          <p className="text-tertiary">
            {event.capacity.current}/{event.capacity.max}
          </p>
        </div>
      </div>
    </article>
  );
}
