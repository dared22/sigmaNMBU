'use client';

import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
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
    <article className="rounded-xl border-l-2 border-l-accent-secondary bg-bg-raised/90 p-4 ghost-border">
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="secondary">{item.tag.replace('_', ' ')}</Badge>
        <span className="font-mono text-[10px] text-neutral-dim">{formatted}</span>
      </div>
      <p className="font-mono text-sm text-neutral/80">
        {item.excerpt}
      </p>
    </article>
  );
}
