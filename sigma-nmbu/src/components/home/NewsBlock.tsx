'use client';

import { useLocale } from 'next-intl';
import type { NewsItem } from '@/types/content';

interface NewsBlockProps {
  item: NewsItem;
}

export function NewsBlock({ item }: NewsBlockProps) {
  const locale = useLocale();
  const date = new Date(item.timestamp);
  const formatted = date.toLocaleDateString(locale === 'nb' ? 'nb-NO' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="relative overflow-hidden rounded-sm bg-surface-container p-5 ghost-border">
      <div className="absolute left-0 top-0 h-full w-1 bg-tertiary" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-label text-xs text-secondary">{formatted}</span>
        <span className="rounded-sm bg-surface-container-highest px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-tertiary">
          {item.tag.replaceAll('_', ' ').toUpperCase()}
        </span>
      </div>
      <p className="font-body text-sm leading-relaxed text-on-surface-variant">
        {item.excerpt}
      </p>
    </article>
  );
}
