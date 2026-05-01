import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MDXContent } from '@/components/content/MDXContent';
import { getPage } from '@/lib/mdx';
import type { Locale } from '@/types/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'companies' });
  const page = getPage('for-bedrifter', locale as Locale);

  return {
    title: page?.title ?? `Sigma NMBU — ${t('hero.title')}`,
    description: page?.description ?? t('hero.subtitle'),
  };
}

export default async function CompaniesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const page = getPage('for-bedrifter', locale);

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
    </div>
  );
}
