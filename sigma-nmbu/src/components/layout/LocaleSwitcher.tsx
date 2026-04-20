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
      className="rounded-full border border-line bg-black/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-muted transition-colors hover:border-line-strong hover:bg-white/5 hover:text-neutral"
      aria-label={`Switch to ${nextLocale === 'nb' ? 'Norwegian' : 'English'}`}
    >
      {t('locale')}
    </button>
  );
}
