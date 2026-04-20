import { cn } from '@/lib/cn';
import { TrafficLights } from './TrafficLights';

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title, children, className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl bg-bg-raised/90 ghost-border shadow-[0_20px_54px_rgb(0_0_0_/_0.22)] backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-black/15 px-4 py-2.5">
        <TrafficLights />
        {title && (
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-muted">
            {title}
          </span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
