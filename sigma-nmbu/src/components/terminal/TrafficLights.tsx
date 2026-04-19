import { cn } from '@/lib/cn';

interface TrafficLightsProps {
  className?: string;
}

export function TrafficLights({ className }: TrafficLightsProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
  );
}
