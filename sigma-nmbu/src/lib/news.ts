import type { Locale } from '@/types/content';
import { getNews } from './mdx';

export function listNews(locale: Locale) {
  return getNews(locale);
}
