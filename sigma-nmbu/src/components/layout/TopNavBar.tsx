'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
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
    <header className="sticky top-0 z-50 border-b border-line glass">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-lg font-bold tracking-headline text-neutral">
            σ
          </span>
          <span className="hidden font-mono text-xs text-neutral-muted sm:inline">
            SIGMA_NMBU
          </span>
          <StatusDot status="ok" className="ml-1" />
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'rounded-lg px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors',
                isActive(href)
                  ? 'text-accent-primary'
                  : 'text-neutral-muted hover:text-neutral hover:bg-white/5',
              )}
            >
              {t(key)}
              {isActive(href) && (
                <span className="mt-0.5 block h-px w-full bg-accent-primary" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
