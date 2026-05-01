import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';
import { TerminalCard } from '@/components/terminal/TerminalCard';

const packages = [
  {
    key: 'annonse',
    tier: '01',
    command: 'publish_notice()',
    featureKeys: ['announcement', 'promotion', 'channels'],
  },
  {
    key: 'sponsor',
    tier: '02',
    command: 'activate_sponsor_profile()',
    featureKeys: ['includes', 'visibility', 'logo', 'profile'],
  },
  {
    key: 'bedpress',
    tier: '03',
    command: 'schedule_bedpress()',
    featureKeys: ['includes', 'presentation', 'access', 'mingling', 'recruiting'],
  },
] as const;

export function PackageGrid() {
  const t = useTranslations('companies.packages');

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 font-label text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
            <StatusDot />
            <span>{t('label')}</span>
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-5xl">
            {t('heading')}
          </h2>
        </div>
        <p className="max-w-xl font-mono text-sm leading-relaxed text-on-surface-variant">
          {t('body')}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {packages.map((item) => (
          <TerminalCard
            key={item.key}
            title={`package_tier_${item.tier}.json`}
            className="h-full bg-surface-container-lowest"
          >
            <article className="flex h-full flex-col gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant={item.tier === '02' ? 'secondary' : 'primary'}>
                    {`// PACKAGE_TIER: ${item.tier}`}
                  </Badge>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-tertiary">
                    {item.command}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
                    {t(`items.${item.key}.name`)}
                  </h3>
                  <p className="font-label text-3xl font-bold text-secondary">
                    {t(`items.${item.key}.price`)}
                  </p>
                </div>

                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                  {t(`items.${item.key}.summary`)}
                </p>
              </div>

              <ul className="mt-auto space-y-3 border-t border-outline-variant/25 pt-5 font-mono text-xs leading-relaxed text-on-surface-variant">
                {item.featureKeys.map((feature) => (
                  <li key={feature} className="grid grid-cols-[1rem_1fr] gap-2">
                    <span className="text-secondary">&gt;</span>
                    <span>{t(`items.${item.key}.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
}
