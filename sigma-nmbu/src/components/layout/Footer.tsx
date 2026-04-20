'use client';

import { Camera, GitBranch, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { StatusDot } from '@/components/ui/StatusDot';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-black/10">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="flex items-center gap-3">
          <span className="font-headline text-sm font-bold tracking-headline text-neutral">
            σ
          </span>
          <div className="space-y-1">
            <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-muted">
              {t('brand')}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-dim">
              {t('version')}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#"
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-muted transition-colors hover:border-line-strong hover:text-neutral"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {t('slack')}
          </a>
          <a
            href="#"
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-muted transition-colors hover:border-line-strong hover:text-neutral"
          >
            <Camera className="h-3.5 w-3.5" />
            {t('instagram')}
          </a>
          <a
            href="#"
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-muted transition-colors hover:border-line-strong hover:text-neutral"
          >
            <GitBranch className="h-3.5 w-3.5" />
            {t('source')}
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-dim">
            {t('rights', { year: String(year) })}
          </span>
        </div>

        <div className="flex items-center justify-start lg:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral">
            <StatusDot status="ok" />
            {t('status')}
          </span>
        </div>
      </div>
    </footer>
  );
}
