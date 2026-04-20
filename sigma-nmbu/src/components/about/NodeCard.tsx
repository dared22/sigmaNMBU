import Image from 'next/image';
import type { BoardMember } from '@/types/content';

interface NodeCardProps {
  member: BoardMember;
  roleLabel: string;
  classLabel: string;
}

const metricValueClasses = ['text-secondary', 'text-tertiary'] as const;

export function NodeCard({ member, roleLabel, classLabel }: NodeCardProps) {
  return (
    <div className="group rounded-sm bg-surface-container p-1 transition-shadow hover:shadow-[0_4px_40px_rgba(227,226,226,0.06)]">
      <div className="flex h-full flex-col gap-4 border border-outline-variant/15 bg-surface-container-low p-6">
        <div className="flex items-start justify-between gap-4">
          <Image
            src={member.portrait}
            alt={member.name}
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 rounded-sm border border-outline-variant/30 object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
          />
          <span className="rounded-sm bg-secondary/10 px-2 py-1 font-label text-xs text-secondary">
            {classLabel}
          </span>
        </div>

        <div>
          <h3 className="font-headline text-xl font-bold text-primary">
            {member.name}
          </h3>
          <p className="mt-1 font-label text-xs text-on-surface-variant">
            {roleLabel}
            {' // '}
            <span className="text-tertiary">{member.processName}</span>
          </p>
        </div>

        <div className="mt-auto space-y-2 border-t border-surface-container-highest pt-4">
          {member.metrics.map((metric, index) => (
            <div
              key={`${member.id}-${metric.label}`}
              className="flex items-center justify-between font-label text-xs"
            >
              <span className="text-on-surface-variant">{metric.label}</span>
              <span className={metricValueClasses[index % metricValueClasses.length]}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
