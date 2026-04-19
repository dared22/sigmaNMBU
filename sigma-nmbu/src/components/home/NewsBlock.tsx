import { Badge } from '@/components/ui/Badge';
import type { NewsItem } from '@/types/content';

interface NewsBlockProps {
  item: NewsItem;
}

export function NewsBlock({ item }: NewsBlockProps) {
  const date = new Date(item.timestamp);
  const formatted = date.toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="rounded-lg bg-bg-raised ghost-border border-l-2 border-l-accent-secondary p-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{item.tag.replace('_', ' ')}</Badge>
        <span className="font-mono text-[10px] text-neutral-dim">{formatted}</span>
      </div>
      <p className="font-mono text-sm text-neutral/80">
        {item.excerpt}
      </p>
    </article>
  );
}
