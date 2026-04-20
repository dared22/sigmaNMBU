'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

const navLinks = [
  { href: '/' as const, key: 'home' },
  { href: '/arrangementer' as const, key: 'events' },
  { href: '/om-oss' as const, key: 'about' },
  { href: '/for-bedrifter' as const, key: 'companies' },
] as const;

export function TopNavBar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-surface-variant bg-background">
      <div className="bg-surface-container">
        <nav className="mx-auto flex h-16 max-w-[1920px] items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/sigma-nmbu-logo.png"
              alt="Sigma NMBU logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="font-headline text-lg font-bold uppercase tracking-[0.28em] text-primary md:text-xl">
              SIGMA_NMBU
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'border-b-2 pb-1 font-headline text-sm font-bold uppercase tracking-tight transition-colors',
                isActive(href)
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-on-surface hover:text-secondary',
              )}
            >
              {t(key)}
            </Link>
          ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={t('search')}
              className="text-on-surface transition-colors hover:text-secondary"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <button
              type="button"
              aria-label={t('account')}
              className="text-on-surface transition-colors hover:text-secondary"
            >
              <span className="material-symbols-outlined text-[22px]">
                account_circle
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
