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
    <TerminalCard title={t('heading')} className="shadow-glow">
      <p className="font-mono text-xs text-neutral-dim mb-4">
        {t('subtitle')}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
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
        <Button type="submit" variant="primary" className="w-full">
          {t('cta')}
        </Button>
      </form>

      {showNotice && (
        <p className="mt-3 font-mono text-xs text-status-warn animate-stream-in">
          {t('decorativeNotice')}
        </p>
      )}

      <div className="mt-4 flex justify-between font-mono text-[10px] text-neutral-dim">
        <span>{t('metrics.security')}</span>
        <span>{t('metrics.latency')}</span>
      </div>
    </TerminalCard>
  );
}
