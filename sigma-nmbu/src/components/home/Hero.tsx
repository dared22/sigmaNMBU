'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/terminal/CodeBlock';
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
    <section className="relative overflow-hidden px-6 pt-8">
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgb(69_146_175_/_0.18),transparent_50%)]" />
      <div className="relative mx-auto min-h-[614px] max-w-7xl overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(135deg,rgb(255_255_255_/_0.05),rgb(255_255_255_/_0.02))] shadow-glow">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(69_146_175_/_0.08),transparent_42%)]" />
        <div className="relative grid gap-8 px-6 py-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:py-20">
          <div className="flex flex-col justify-center lg:col-span-7">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent-primary">
              {t('status')}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <h1 className="mt-4 font-headline text-4xl font-bold tracking-headline text-neutral md:text-6xl lg:text-7xl">
              <TypingText text={t('hero.title')} />
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

          <div className="lg:col-span-5">
          <ScrollReveal delay={0.24}>
            <TerminalCard
              title="visualize_data.py"
              className="h-full border-accent-primary/15 bg-black/20 shadow-glow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-dim">
                  <span>module.visualization</span>
                  <span className="text-accent-secondary">render: stable</span>
                </div>
                <CodeBlock className="border-0 bg-transparent p-0 shadow-none">
                  {codeSnippet.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line.includes('import') ? (
                        <>
                          <span className="text-accent-primary">{line.split(' ')[0]}</span>{' '}
                          <span className="text-accent-secondary">
                            {line.split(' ').slice(1).join(' ')}
                          </span>
                        </>
                      ) : line.includes('#') ? (
                        <span className="text-accent-primary">{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </span>
                  ))}
                </CodeBlock>
                <div className="grid grid-cols-4 gap-2">
                  {[78, 62, 51, 39].map((value) => (
                    <div key={value} className="space-y-2">
                      <div className="h-24 rounded-full border border-line bg-black/15 p-1">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(180deg,rgb(69_146_175_/_0.95),rgb(227_196_168_/_0.45))]"
                          style={{ clipPath: `inset(${100 - value}% 0 0 0 round 999px)` }}
                        />
                      </div>
                      <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-dim">
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
    </section>
  );
}
