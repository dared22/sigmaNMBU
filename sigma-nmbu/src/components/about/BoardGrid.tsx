import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { NodeCard } from './NodeCard';
import type { BoardMember } from '@/types/content';

interface BoardGridProps {
  members: BoardMember[];
}

export function BoardGrid({ members }: BoardGridProps) {
  const t = useTranslations('about.board');

  const roleLabels = {
    leder: t('roles.leder'),
    nestleder: t('roles.nestleder'),
    okonomi: t('roles.okonomi'),
    markeds: t('roles.markeds'),
    bedrift: t('roles.bedrift'),
    arrangement: t('roles.arrangement'),
  };

  const classLabels = {
    root: t('class.root'),
    daemon: t('class.daemon'),
    allocator: t('class.allocator'),
    compiler: t('class.compiler'),
    scheduler: t('class.scheduler'),
  };

  const orderedMembers = [...members].sort((a, b) => a.order - b.order);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-primary">
            {t('query')}
          </p>
          <h2 className="mt-3 font-headline text-3xl tracking-headline text-neutral md:text-5xl">
            {t('heading')}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="status">{t('stats.uptime')}: 99.98%</Badge>
          <Badge>{orderedMembers.length}_ACTIVE_NODES</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {orderedMembers.map((member) => (
          <NodeCard
            key={member.id}
            member={member}
            roleLabel={roleLabels[member.roleKey]}
            classLabel={classLabels[member.class]}
          />
        ))}
      </div>
    </section>
  );
}
