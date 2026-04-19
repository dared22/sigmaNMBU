import { cn } from '@/lib/cn';
import { TrafficLights } from './TrafficLights';

interface TerminalCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCard({ title, children, className }: TerminalCardProps) {
  return (
    <div className={cn('rounded-xl bg-bg-raised ghost-border overflow-hidden', className)}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <TrafficLights />
        {title && (
          <span className="font-mono text-xs text-neutral-muted truncate">
            {title}
          </span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
