import { useTranslations } from 'next-intl';
import { TerminalCard } from '@/components/terminal/TerminalCard';

export function CompanyContactCard() {
  const t = useTranslations('companies.contact');

  return (
    <TerminalCard title="contact.request">
      <div className="space-y-5">
        <p className="m-0 font-mono text-sm leading-relaxed text-on-surface-variant md:text-base">
          {t('body')}
        </p>
        <a
          className="inline-flex rounded-sm border border-secondary bg-secondary px-5 py-3 font-label text-[11px] font-bold uppercase tracking-[0.24em] text-on-secondary shadow-glow-md transition-all hover:-translate-y-px"
          href={`mailto:${t('email')}`}
        >
          {t('email')}
        </a>
      </div>
    </TerminalCard>
  );
}
