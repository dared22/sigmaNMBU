import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

interface VisionDictProps {
  entity: string;
  focusArea: string;
  objective: string;
  values: string[];
  activeNodes: string;
  summary: string;
}

export function VisionDict({
  entity,
  focusArea,
  objective,
  values,
  activeNodes,
  summary,
}: VisionDictProps) {
  const tHero = useTranslations('about.hero');
  const tDict = useTranslations('about.dict');

  const rows = [
    { key: tDict('entity'), value: `"${entity}"` },
    { key: tDict('focus'), value: `"${focusArea}"` },
    { key: tDict('objective'), value: `"${objective}"` },
    {
      key: tDict('values'),
      value: `[${values.map((entry) => `"${entry}"`).join(', ')}]`,
    },
    { key: tDict('nodes'), value: activeNodes },
  ];

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(145deg,rgb(255_255_255_/_0.06),rgb(255_255_255_/_0.025))] px-6 py-8 shadow-glow md:px-8 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(69_146_175_/_0.16),transparent_40%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="space-y-5">
          <Badge variant="primary">MODULE_VISION</Badge>
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-primary">
              {tHero('import')}
            </p>
            <h1 className="max-w-xl font-headline text-4xl font-bold tracking-headline text-neutral md:text-6xl">
              {tHero('init')}
            </h1>
          </div>
          <p className="max-w-lg font-mono text-sm leading-relaxed text-neutral/75 md:text-base">
            {summary}
          </p>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-line bg-black/25 shadow-[0_22px_64px_rgb(0_0_0_/_0.18)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-dim">
            <span>vision.dict.ts</span>
            <span className="text-accent-secondary">render: stable</span>
          </div>
          <div className="space-y-3 px-4 py-5 font-mono text-xs leading-7 text-neutral/78 md:px-6 md:py-6 md:text-sm">
            <span className="block text-neutral/70">const sigma = &#123;</span>
            {rows.map((row, index) => (
              <div key={row.key} className="grid gap-2 pl-4 md:grid-cols-[12rem_1fr]">
                <span className="text-accent-primary">{row.key}:</span>
                <span className="break-words text-accent-secondary">
                  {row.value}
                  {index === rows.length - 1 ? '' : ','}
                </span>
              </div>
            ))}
            <span className="block text-neutral/70">&#125;;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
