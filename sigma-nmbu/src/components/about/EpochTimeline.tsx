import { Badge } from '@/components/ui/Badge';

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
      <div className="absolute bottom-0 left-[0.65rem] top-2 border-l-2 border-surface-container" />
      {epochs.map((epoch) => (
        <div key={epoch.id} className="relative grid gap-4 pl-10 md:grid-cols-[11rem_1fr] md:items-start">
          <div className="relative">
            <div
              className={`absolute left-[-2rem] top-1 h-4 w-4 rounded-sm ${
                epoch.current
                  ? 'animate-pulse bg-secondary'
                  : 'border-2 border-secondary bg-surface-container-highest'
              }`}
            />
            <div className="flex flex-wrap items-center gap-2 font-label text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
              <span>
                {epochLabel} {epoch.id}
              </span>
              <span className="text-tertiary">{epoch.period}</span>
              {epoch.current ? <Badge variant="primary">{currentLabel}</Badge> : null}
            </div>
          </div>

          <div className="rounded-sm border border-outline-variant/10 bg-surface-container-low p-4">
            <h3 className="font-headline text-2xl tracking-tight text-primary">
              {epoch.title}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-variant md:text-base">
              {epoch.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
