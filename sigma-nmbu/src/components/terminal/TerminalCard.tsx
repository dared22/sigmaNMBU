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
        'overflow-hidden rounded-sm bg-surface-container-lowest ghost-border shadow-[0_20px_54px_rgb(0_0_0_/_0.22)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-surface-variant bg-surface-container-highest px-4 py-2.5">
        <TrafficLights />
        {title && (
          <span className="truncate rounded-sm bg-surface-container-highest px-2 py-1 font-label text-[11px] uppercase tracking-[0.2em] text-primary">
            {title}
          </span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
