import type { Locale } from '@/types/content';
import { getAllSlugs, getEventBySlug, getEvents } from './mdx';

export function listEvents(locale: Locale) {
  return getEvents(locale);
}

export function findEventBySlug(locale: Locale, slug: string) {
  return getEventBySlug(locale, slug);
}

export function listEventSlugs(locale: Locale) {
  return getAllSlugs(locale);
}
