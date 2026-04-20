'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Search } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { StatusDot } from '@/components/ui/StatusDot';

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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-headline text-lg font-bold tracking-headline text-neutral">
            σ
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-muted sm:inline">
            SIGMA_NMBU
          </span>
          <span className="hidden items-center gap-2 rounded-full border border-line bg-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-dim md:inline-flex">
            <StatusDot status="ok" className="ml-0.5" />
            BUILD_VER: 1.0.0
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors',
                isActive(href)
                  ? 'bg-accent-primary/10 text-accent-primary'
                  : 'text-neutral-muted hover:bg-white/5 hover:text-neutral',
              )}
            >
              {t(key)}
              {isActive(href) && (
                <span className="mt-1 block h-px w-full bg-accent-primary" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={t('search')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-black/15 text-neutral-muted transition-colors hover:border-line-strong hover:bg-white/5 hover:text-neutral"
          >
            <Search className="h-4 w-4" />
          </button>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
