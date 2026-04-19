'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { TerminalCard } from '@/components/terminal/TerminalCard';
import { TypingText } from '@/components/terminal/TypingText';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const codeSnippet = `import numpy as np
import matplotlib.pyplot as plt

data = np.random.randn(1000)
bins = np.linspace(-3, 3, 20)

plt.figure(figsize=(8, 4))
plt.hist(data, bins, color="#4592AF")
plt.title("distribution.analysis()")
plt.show()

# ████████████░░░░  78.4%
# ██████████░░░░░░  62.1%
# ████████░░░░░░░░  51.3%
# ██████░░░░░░░░░░  38.7%`;

export function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[614px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        {/* Left column */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <ScrollReveal>
            <p className="font-mono text-xs text-accent-primary">
              {t('status')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h1 className="mt-4 font-headline text-4xl font-bold tracking-headline text-neutral md:text-6xl lg:text-7xl">
              <TypingText text={t('hero.title')} speed={35} />
              <br />
              <span className="text-accent-primary">
                {t('hero.titleAccent')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-neutral/80 md:text-base">
              {t('hero.body')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/arrangementer">
                <Button variant="primary">{t('hero.cta.primary')}</Button>
              </Link>
              <Link href="/om-oss">
                <Button variant="ghost">{t('hero.cta.secondary')}</Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column — code editor mock */}
        <div className="lg:col-span-5">
          <ScrollReveal delay={0.24}>
            <TerminalCard title="visualize_data.py" className="shadow-glow">
              <pre className="font-mono text-xs leading-relaxed text-neutral/80 md:text-sm">
                {codeSnippet.split('\n').map((line, i) => (
                  <div key={i}>
                    {line.includes('import') && (
                      <span>
                        <span className="text-accent-primary">
                          {line.split(' ')[0]}
                        </span>{' '}
                        <span className="text-accent-secondary">
                          {line.split(' ').slice(1).join(' ')}
                        </span>
                      </span>
                    )}
                    {line.includes('#') && (
                      <span className="text-accent-primary">{line}</span>
                    )}
                    {!line.includes('import') && !line.includes('#') && (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </TerminalCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
