import { useTranslations } from 'next-intl';

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
    <section className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-3">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          <span className="text-secondary opacity-70">{tHero('import')}</span>
          <br />
          <span className="text-tertiary">{tHero('init')}</span>
        </h1>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-on-surface-variant md:text-base">
          {summary}
        </p>
      </div>

      <div className="relative rounded-sm border border-outline-variant/15 bg-surface-container-highest p-8 font-label text-sm shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute right-0 top-0 p-2 text-xs text-on-surface-variant opacity-50">
          {'// INIT_SEQ_01'}
        </div>
        <div className="space-y-3 leading-7 text-primary md:text-base">
          <span className="block text-tertiary">vision_dict = &#123;</span>
          {rows.map((row, index) => (
            <div key={row.key} className="grid gap-2 pl-4 md:grid-cols-[12rem_1fr]">
              <span className="text-secondary">
                &quot;{row.key}&quot;
              </span>
              <span className="break-words text-[#bbe9ff]">
                {row.value}
                {index === rows.length - 1 ? '' : ','}
              </span>
            </div>
          ))}
          <span className="block text-primary">&#125;</span>
        </div>
      </div>
    </section>
  );
}
