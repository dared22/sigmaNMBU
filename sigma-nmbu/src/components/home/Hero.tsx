'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/terminal/CodeBlock';
import { TerminalCard } from '@/components/terminal/TerminalCard';
import { TypingText } from '@/components/terminal/TypingText';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { cn } from '@/lib/cn';

const codeSnippet = `import numpy as np
import matplotlib.pyplot as plt

data = np.random.randn(1000)
bins = np.linspace(-3, 3, 20)

plt.figure(figsize=(8, 4))
plt.hist(data, bins, color="#86D0EF")
plt.title("distribution.analysis()")
plt.show()

# ████████████░░░░  78.4%
# ██████████░░░░░░  62.1%
# ████████░░░░░░░░  51.3%
# ██████░░░░░░░░░░  38.7%`;

export function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative px-0 pt-8">
      <div className="mx-auto max-w-[1920px] px-6">
        <div className="relative min-h-[614px] overflow-hidden rounded-sm hero-gradient ghost-border glow-shadow">
          <div className="relative grid gap-8 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-center lg:col-span-7">
          <ScrollReveal>
              <div className="flex items-center gap-3 font-label text-sm font-bold text-tertiary">
                <span className="h-2 w-2 rounded-none bg-tertiary" />
                <span>{t('status')}</span>
              </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
              <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              <TypingText text={t('hero.title')} />
              <br />
                <span className="text-secondary">
                {t('hero.titleAccent')}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
              <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/90">
              {t('hero.body')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/arrangementer">
                  <Button variant="primary" className="px-8 py-4">
                    <span className="material-symbols-outlined text-lg">
                      terminal
                    </span>
                    {t('hero.cta.primary')}
                  </Button>
              </Link>
              <Link href="/om-oss">
                  <Button variant="ghost" className="px-8 py-4">
                    {t('hero.cta.secondary')}
                  </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

          <div className="lg:col-span-5">
          <ScrollReveal delay={0.24}>
            <TerminalCard
              title="visualize_data.py"
                className="h-full bg-surface-container-lowest shadow-[0_20px_54px_rgb(0_0_0_/_0.22)]"
            >
              <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-variant pb-3 font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                    <span className="text-white">module.visualization</span>
                    <span className="text-tertiary">render: stable</span>
                </div>
                <CodeBlock className="border-0 bg-transparent p-0 shadow-none">
                  {codeSnippet.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line.includes('import') ? (
                        <>
                            <span className="text-secondary">{line.split(' ')[0]}</span>{' '}
                            <span className="text-tertiary">
                            {line.split(' ').slice(1).join(' ')}
                          </span>
                        </>
                      ) : line.includes('#') ? (
                          <span className="text-secondary">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </span>
                  ))}
                </CodeBlock>
                <div className="grid grid-cols-4 gap-2">
                    {[78, 62, 51, 39].map((value, index) => (
                      <div key={value} className="space-y-2">
                        <div className="flex h-24 items-end border border-surface-variant bg-surface-container p-1">
                          <div
                            className={cn(
                              'w-full rounded-none',
                              index < 2 ? 'bg-secondary' : 'bg-tertiary',
                            )}
                            style={{ height: `${value}%` }}
                          />
                      </div>
                        <p className="text-center font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                        {value}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TerminalCard>
          </ScrollReveal>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}
