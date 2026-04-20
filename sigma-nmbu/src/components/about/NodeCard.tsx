import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Panel } from '@/components/ui/Panel';
import type { BoardClass, BoardMember } from '@/types/content';

interface NodeCardProps {
  member: BoardMember;
  roleLabel: string;
  classLabel: string;
}

const classVariants: Record<BoardClass, 'primary' | 'secondary' | 'default'> = {
  root: 'primary',
  daemon: 'default',
  allocator: 'secondary',
  compiler: 'default',
  scheduler: 'secondary',
};

export function NodeCard({ member, roleLabel, classLabel }: NodeCardProps) {
  return (
    <Panel className="group overflow-hidden" stripe={member.class === 'root' ? 'primary' : 'secondary'}>
      <div className="relative aspect-[4/4.8] overflow-hidden border-b border-line bg-[radial-gradient(circle_at_top,rgb(69_146_175_/_0.16),transparent_60%)]">
        <Image
          src={member.portrait}
          alt={member.name}
          fill
          unoptimized
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,rgb(42_40_51_/_0.92))]" />
        <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-dim">
          <span className="inline-block h-2 w-2 rounded-full bg-status-ok animate-pulse-dot" />
          <span>pid://{member.processName}</span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={classVariants[member.class]}>{classLabel}</Badge>
            <Badge>{member.id.replaceAll('-', '_')}</Badge>
          </div>
          <div>
            <h3 className="font-headline text-2xl tracking-[-0.04em] text-neutral">
              {member.name}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-accent-primary">
              {roleLabel}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {member.metrics.map((metric) => (
            <div
              key={`${member.id}-${metric.label}`}
              className="rounded-2xl border border-line bg-black/15 px-3 py-3 font-mono"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-dim">
                {metric.label}
              </p>
              <p className="mt-2 text-sm text-neutral">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
