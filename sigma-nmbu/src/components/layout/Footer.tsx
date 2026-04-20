'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface-variant bg-surface-container">
      <div className="mx-auto grid max-w-[1920px] gap-6 px-6 py-8 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/sigma-nmbu-logo.png"
            alt="Sigma NMBU logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div className="space-y-1">
            <span className="block font-label text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              {t('brand')}
            </span>
            <span className="block font-label text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
              {t('version')}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-center">
          <a
            href="#"
            aria-disabled="true"
            className="font-label text-[10px] uppercase tracking-widest text-on-surface transition-all hover:-translate-y-0.5 hover:text-secondary"
          >
            {t('slack')}
          </a>
          <a
            href="#"
            aria-disabled="true"
            className="font-label text-[10px] uppercase tracking-widest text-on-surface transition-all hover:-translate-y-0.5 hover:text-secondary"
          >
            {t('instagram')}
          </a>
          <a
            href="#"
            aria-disabled="true"
            className="font-label text-[10px] uppercase tracking-widest text-on-surface transition-all hover:-translate-y-0.5 hover:text-secondary"
          >
            {t('source')}
          </a>
        </div>

        <div className="flex items-center justify-start md:justify-end">
          <span className="inline-flex rounded-sm border border-tertiary/30 bg-tertiary/10 px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-[0.22em] text-tertiary">
            {t('rights', { year: String(year) })}
          </span>
        </div>
      </div>
    </footer>
  );
}
