import { Badge } from '@/components/ui/Badge';
import { MetaPair } from '@/components/ui/MetaPair';
import type { Event } from '@/types/content';

interface EventBlockProps {
  event: Event;
}

export function EventBlock({ event }: EventBlockProps) {
  const date = new Date(event.timestamp);
  const formatted = date.toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="rounded-lg bg-bg-raised ghost-border border-l-2 border-l-accent-primary p-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="primary">{event.type.replace('_', ' ')}</Badge>
        <span className="font-mono text-[10px] text-neutral-dim">{formatted}</span>
      </div>
      <h3 className="font-headline text-base font-bold tracking-headline text-neutral">
        {event.slug.replace(/-/g, ' ')}
      </h3>
      <p className="mt-1 font-mono text-xs text-neutral/70 line-clamp-2">
        {event.excerpt}
      </p>
      <div className="mt-3 flex gap-4">
        <MetaPair label="LOCATION" value={event.location} />
        <MetaPair label="CAPACITY" value={`${event.capacity.current}/${event.capacity.max}`} />
      </div>
    </article>
  );
}
