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
      className="ghost-border rounded-lg px-2.5 py-1 font-mono text-xs uppercase tracking-wide text-neutral-muted hover:text-neutral hover:bg-white/5 transition-colors"
      aria-label={`Switch to ${nextLocale === 'nb' ? 'Norwegian' : 'English'}`}
    >
      {t('locale')}
    </button>
  );
}
