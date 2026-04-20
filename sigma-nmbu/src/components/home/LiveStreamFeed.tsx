'use client';

import { useTranslations } from 'next-intl';
import { StatusDot } from '@/components/ui/StatusDot';
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
    <section className="rounded-[24px] border border-line bg-black/10 p-6 backdrop-blur-sm">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h2 className="font-headline text-xl font-bold tracking-headline text-neutral md:text-2xl">
          {t('stream.heading')}
        </h2>
        <div className="flex items-center gap-1.5">
          <StatusDot status="err" />
          <span className="rounded-full bg-status-err/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-status-err">
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
