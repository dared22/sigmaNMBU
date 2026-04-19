'use client';

import { useTranslations } from 'next-intl';
import { StatusDot } from '@/components/ui/StatusDot';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-headline text-sm font-bold tracking-headline text-neutral">
            σ
          </span>
          <span className="font-mono text-xs text-neutral-dim">
            {t('version')}
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-neutral-muted">
          <span>{t('rights', { year: String(year) })}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-xs text-neutral-dim">
            <StatusDot status="ok" />
            {t('status')}
          </span>
        </div>
      </div>
    </footer>
  );
}
