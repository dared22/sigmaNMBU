'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TerminalCard } from '@/components/terminal/TerminalCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function AuthTerminal() {
  const t = useTranslations('home.portal');
  const [showNotice, setShowNotice] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowNotice(true);
  }

  return (
    <TerminalCard title="Auth_Terminal_v2.4" className="shadow-glow">
      <div className="mb-4 space-y-2">
        <h2 className="font-headline text-lg font-bold text-primary">
          {t('heading')}
        </h2>
        <p className="font-label text-xs text-on-surface-variant">
          {t('subtitle')}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t('studentId')}
          id="student-id"
          placeholder={t('placeholder.id')}
          autoComplete="off"
        />
        <Input
          label={t('accessKey')}
          id="access-key"
          type="password"
          placeholder={t('placeholder.key')}
          autoComplete="off"
        />
        <div className="rounded-sm bg-surface-container-lowest p-5 ghost-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between font-label text-xs uppercase tracking-[0.18em] text-on-surface">
              <span>{t('metrics.security')}</span>
              <span>99.9%</span>
            </div>
            <div className="h-px bg-surface-variant">
              <div className="h-px w-full bg-secondary" />
            </div>
            <p className="font-label text-xs text-tertiary">
              {t('metrics.latency')}
            </p>
          </div>
        </div>
        <Button type="submit" variant="terminal" className="w-full">
          <span className="material-symbols-outlined text-base">login</span>
          {t('cta')}
        </Button>
      </form>

      {showNotice && (
        <p className="mt-3 font-label text-xs text-status-warn animate-stream-in">
          {t('decorativeNotice')}
        </p>
      )}

      <button
        type="button"
        className="mt-4 font-label text-xs text-secondary underline underline-offset-4"
      >
        {t('requestAccess')}
      </button>
    </TerminalCard>
  );
}
