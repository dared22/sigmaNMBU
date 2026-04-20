import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { BoardGrid } from '@/components/about/BoardGrid';
import { MDXContent } from '@/components/content/MDXContent';
import { getPage } from '@/lib/mdx';
import type { Locale } from '@/types/content';
import { board } from '../../../../content/data/board';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const page = getPage('om-oss', locale as Locale);

  return {
    title: page?.title ?? `Sigma NMBU — ${t('board.heading')}`,
    description: page?.description ?? t('board.query'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const page = getPage('om-oss', locale);

  if (!page) {
    notFound();
  }

  return (
    <div className="w-full space-y-20 px-6 py-8 md:space-y-24 md:py-10">
      <ScrollReveal>
        <div className="space-y-16 md:space-y-20">
          <MDXContent source={page.content} />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <BoardGrid members={board} />
      </ScrollReveal>
    </div>
  );
}
