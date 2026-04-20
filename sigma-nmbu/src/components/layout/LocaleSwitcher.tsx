'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'nb' ? 'en' : 'nb';

  function handleSwitch() {
    // Cast needed because pathname may include dynamic segments like /arrangementer/[slug]
    router.replace(pathname as '/', { locale: nextLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="rounded-sm border border-outline-variant/60 bg-surface-container-highest px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.24em] text-on-surface transition-colors hover:text-secondary"
      aria-label={`Switch to ${nextLocale === 'nb' ? 'Norwegian' : 'English'}`}
    >
      {t('locale')}
    </button>
  );
}
