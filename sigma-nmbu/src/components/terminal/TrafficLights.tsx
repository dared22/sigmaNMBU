import { cn } from '@/lib/cn';

interface TrafficLightsProps {
  className?: string;
}

export function TrafficLights({ className }: TrafficLightsProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-error" />
      <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
    </div>
  );
}
