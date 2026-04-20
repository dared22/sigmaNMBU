import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { MetaPair } from '@/components/ui/MetaPair';
import { Panel } from '@/components/ui/Panel';
import type { Event } from '@/types/content';

interface EventMetaSidebarProps {
  event: Event;
}

export function EventMetaSidebar({ event }: EventMetaSidebarProps) {
  const t = useTranslations('events');

  return (
    <Panel className="space-y-5 px-5 py-5" stripe="primary">
      <div className="space-y-4">
        <a href={event.registerUrl} target="_blank" rel="noreferrer" className="block">
          <Button variant="primary" className="w-full">
            {t('detail.register')}
          </Button>
        </a>

        <div className="grid gap-4">
          <MetaPair label={t('item.location')} value={event.location} />
          <MetaPair
            label={t('item.capacity')}
            value={`${event.capacity.current}/${event.capacity.max}`}
          />
          <MetaPair label="INPUT" value={event.input} />
          <MetaPair label="OUTPUT" value={event.output} />
        </div>
      </div>

      {event.speakers.length > 0 ? (
        <div className="border-t border-line pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-dim">
            speakers
          </p>
          <div className="mt-3 space-y-2">
            {event.speakers.map((speaker) => (
              <p key={speaker} className="font-mono text-sm text-neutral/82">
                {speaker}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </Panel>
  );
}
