'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod/v4';
import { requireAdmin } from '@/lib/admin-auth';
import { deleteEvent, writeEvent } from '@/lib/events-admin';
import { eventFrontmatter } from '@/lib/schemas';
import type { Locale } from '@/types/content';

const localeSchema = z.enum(['nb', 'en']);

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function parseEventForm(formData: FormData) {
  const registerUrl = getString(formData, 'registerUrl');
  const locale = localeSchema.parse(getString(formData, 'locale'));
  const frontmatter = eventFrontmatter.parse({
    slug: getString(formData, 'slug'),
    type: getString(formData, 'type'),
    complexity: getString(formData, 'complexity'),
    timestamp: getString(formData, 'timestamp'),
    location: getString(formData, 'location'),
    capacity: {
      current: Number(getString(formData, 'capacityCurrent')),
      max: Number(getString(formData, 'capacityMax')),
    },
    input: getString(formData, 'input'),
    output: getString(formData, 'output'),
    speakers: getString(formData, 'speakers')
      .split(',')
      .map((speaker) => speaker.trim())
      .filter(Boolean),
    registerUrl:
      registerUrl.length === 0 || registerUrl === '#' ? undefined : registerUrl,
    excerpt: getString(formData, 'excerpt'),
    featured: formData.get('featured') === 'on',
  });
  const content = String(formData.get('content') ?? '');

  return { locale, frontmatter, content };
}

export async function createEventAction(formData: FormData) {
  await requireAdmin();
  const { locale, frontmatter, content } = parseEventForm(formData);
  writeEvent(locale, frontmatter.slug, frontmatter, content);
  redirect('/admin/events');
}

export async function updateEventAction(
  oldLocale: Locale,
  oldSlug: string,
  formData: FormData,
) {
  await requireAdmin();
  const { locale, frontmatter, content } = parseEventForm(formData);
  writeEvent(locale, frontmatter.slug, frontmatter, content);

  if (oldLocale !== locale || oldSlug !== frontmatter.slug) {
    deleteEvent(oldLocale, oldSlug);
  }

  redirect('/admin/events');
}

export async function deleteEventAction(locale: Locale, slug: string) {
  await requireAdmin();
  deleteEvent(locale, slug);
  redirect('/admin/events');
}
