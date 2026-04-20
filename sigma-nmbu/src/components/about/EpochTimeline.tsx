import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';

export interface EpochEntry {
  id: string;
  period: string;
  title: string;
  body: string;
  current?: boolean;
}

interface EpochTimelineProps {
  epochs: EpochEntry[];
  epochLabel: string;
  currentLabel: string;
}

export function EpochTimeline({
  epochs,
  epochLabel,
  currentLabel,
}: EpochTimelineProps) {
  return (
    <div className="relative space-y-8">
      <div className="absolute bottom-0 left-[0.9rem] top-0 w-px bg-[linear-gradient(180deg,rgb(69_146_175_/_0.65),rgb(227_196_168_/_0.15),transparent)]" />
      {epochs.map((epoch) => (
        <div key={epoch.id} className="relative grid gap-4 pl-10 md:grid-cols-[11rem_1fr] md:items-start">
          <div className="relative">
            <div
              className={`absolute left-[-2.1rem] top-2 h-3.5 w-3.5 rotate-45 border border-line bg-bg-raised ${
                epoch.current ? 'animate-pulse-dot bg-accent-primary/85 shadow-glow-md' : 'bg-bg'
              }`}
            />
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-dim">
              <span>
                {epochLabel} {epoch.id}
              </span>
              <span className="text-accent-secondary">{epoch.period}</span>
              {epoch.current ? <Badge variant="primary">{currentLabel}</Badge> : null}
            </div>
          </div>

          <Panel className="px-5 py-5" stripe={epoch.current ? 'primary' : 'secondary'}>
            <h3 className="font-headline text-2xl tracking-[-0.04em] text-neutral">
              {epoch.title}
            </h3>
            <p className="mt-3 font-mono text-sm leading-relaxed text-neutral/78 md:text-base">
              {epoch.body}
            </p>
          </Panel>
        </div>
      ))}
    </div>
  );
}
