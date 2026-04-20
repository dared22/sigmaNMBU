import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
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
    <aside className="sticky top-24 rounded-sm bg-surface-container p-6 shadow-[0_0_40px_rgba(227,226,226,0.06)]">
      <div className="border-b border-surface-container-highest pb-2 font-mono text-sm text-primary">
        <span className="text-secondary">const</span> filterParams = &#123;
      </div>

      <form method="GET" className="space-y-8 py-6">
        <fieldset className="space-y-3">
          <legend className="font-mono text-sm text-tertiary">
            &quot;{t('filters.type')}&quot;: [
          </legend>
          <div className="space-y-2 pl-4">
            {eventTypes.map((type, index) => (
              <Checkbox
                key={type}
                id={`type-${type}`}
                name="type"
                value={type}
                label={`"${typeLabels[type]}"${index === eventTypes.length - 1 ? '' : ','}`}
                defaultChecked={selectedTypes.includes(type)}
              />
            ))}
            <p className="font-mono text-sm text-tertiary">],</p>
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="font-mono text-sm text-tertiary">
            &quot;{t('filters.complexity')}&quot;: [
          </legend>
          <div className="space-y-2 pl-4">
            {complexityOptions.map((option, index) => (
              <Radio
                key={option}
                id={`complexity-${option}`}
                name="complexity"
                value={option}
                label={`"${t(`item.complexity.${option}`)}"${index === complexityOptions.length - 1 ? '' : ','}`}
                defaultChecked={selectedComplexity === option}
              />
            ))}
            <p className="font-mono text-sm text-tertiary">]</p>
          </div>
        </fieldset>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 active:animate-glitch"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          {t('filters.execute')}
        </Button>
      </form>

      <div className="border-t border-surface-container-highest pt-2 font-mono text-sm text-primary">
        &#125;;
      </div>
    </aside>
  );
}
