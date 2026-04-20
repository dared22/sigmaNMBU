'use client';

import { useTranslations } from 'next-intl';
import { StreamStagger } from '@/components/motion/StreamStagger';
import { EventBlock } from './EventBlock';
import { NewsBlock } from './NewsBlock';
import type { Event, NewsItem } from '@/types/content';

interface LiveStreamFeedProps {
  events: Event[];
  news: NewsItem[];
}

type FeedItem =
  | { kind: 'event'; data: Event; ts: number }
  | { kind: 'news'; data: NewsItem; ts: number };

export function LiveStreamFeed({ events, news }: LiveStreamFeedProps) {
  const t = useTranslations('home');

  const items: FeedItem[] = [
    ...events.map((e) => ({ kind: 'event' as const, data: e, ts: new Date(e.timestamp).getTime() })),
    ...news.map((n) => ({ kind: 'news' as const, data: n, ts: new Date(n.timestamp).getTime() })),
  ].sort((a, b) => b.ts - a.ts);

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-surface-variant pb-4">
        <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
          {t('stream.headingPrefix')}{' '}
          <span className="font-label text-lg text-secondary">
            {t('stream.headingAccent')}
          </span>
        </h2>
        <div className="inline-flex items-center gap-2 rounded-sm bg-surface-container px-3 py-1.5 ghost-border">
          <span
            className="material-symbols-outlined animate-pulse text-sm text-error"
            aria-hidden="true"
          >
            radio_button_checked
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface">
            {t('stream.streaming')}
          </span>
        </div>
      </div>

      <StreamStagger className="space-y-4" stagger={0.08}>
        {items.map((item) =>
          item.kind === 'event' ? (
            <EventBlock key={item.data.slug} event={item.data} />
          ) : (
            <NewsBlock key={item.data.slug} item={item.data} />
          ),
        )}
      </StreamStagger>
    </section>
  );
}
