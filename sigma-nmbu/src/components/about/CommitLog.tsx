import { useTranslations } from 'next-intl';
import { EpochTimeline, type EpochEntry } from './EpochTimeline';

interface CommitLogProps {
  epochs: EpochEntry[];
  summary: string;
}

export function CommitLog({ epochs, summary }: CommitLogProps) {
  const t = useTranslations('about.log');

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-primary">
            git log --oneline --graph
          </p>
          <h2 className="mt-3 font-headline text-3xl tracking-headline text-neutral md:text-5xl">
            {t('heading')}
          </h2>
        </div>
        <p className="max-w-md font-mono text-xs leading-relaxed text-neutral-dim md:text-sm">
          {summary}
        </p>
      </div>

      <EpochTimeline
        epochs={epochs}
        epochLabel={t('epoch')}
        currentLabel={t('current')}
      />
    </section>
  );
}
