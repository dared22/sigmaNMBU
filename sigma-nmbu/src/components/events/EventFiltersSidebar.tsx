import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Panel } from '@/components/ui/Panel';
import { Radio } from '@/components/ui/Radio';
import type { Complexity, EventType } from '@/types/content';

interface EventFiltersSidebarProps {
  selectedTypes: EventType[];
  selectedComplexity?: Complexity;
}

const eventTypes: EventType[] = [
  'workshop',
  'guest_lecture',
  'hackathon',
  'social',
];

const complexityOptions: Complexity[] = ['o1', 'on', 'on2'];

const typeLabels: Record<EventType, string> = {
  workshop: 'WORKSHOP',
  guest_lecture: 'GUEST_LECTURE',
  hackathon: 'HACKATHON',
  social: 'SOCIAL',
};

export function EventFiltersSidebar({
  selectedTypes,
  selectedComplexity,
}: EventFiltersSidebarProps) {
  const t = useTranslations('events');

  return (
    <Panel className="sticky top-24 overflow-hidden">
      <div className="border-b border-line px-5 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-dim">
        const filterParams = &#123;
      </div>

      <form method="GET" className="space-y-6 px-5 py-5">
        <fieldset className="space-y-3">
          <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-primary">
            {t('filters.type')}
          </legend>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <Checkbox
                key={type}
                id={`type-${type}`}
                name="type"
                value={type}
                label={typeLabels[type]}
                defaultChecked={selectedTypes.includes(type)}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-primary">
            {t('filters.complexity')}
          </legend>
          <div className="space-y-2">
            {complexityOptions.map((option) => (
              <Radio
                key={option}
                id={`complexity-${option}`}
                name="complexity"
                value={option}
                label={t(`item.complexity.${option}`)}
                defaultChecked={selectedComplexity === option}
              />
            ))}
          </div>
        </fieldset>

        <Button
          type="submit"
          variant="glitch"
          className="w-full active:animate-glitch"
        >
          {t('filters.execute')}
        </Button>
      </form>

      <div className="border-t border-line px-5 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-dim">
        &#125;;
      </div>
    </Panel>
  );
}
