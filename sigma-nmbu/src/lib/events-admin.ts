import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import { eventFrontmatter } from '@/lib/schemas';
import type { Locale } from '@/types/content';

export type EventFrontmatter = z.infer<typeof eventFrontmatter>;

export interface AdminEventRecord {
  slug: string;
  locale: Locale;
  frontmatter: EventFrontmatter;
  content: string;
  filePath: string;
}

const EVENT_LOCALES: Locale[] = ['nb', 'en'];
const EVENTS_ROOT = path.join(process.cwd(), 'content/events');

function getEventPath(locale: Locale, slug: string) {
  return path.join(EVENTS_ROOT, locale, `${slug}.mdx`);
}

function readEventFile(locale: Locale, filePath: string): AdminEventRecord {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = eventFrontmatter.parse(data, {
    error: () => `Invalid event frontmatter in ${filePath}`,
  });

  return {
    slug: frontmatter.slug,
    locale,
    frontmatter,
    content,
    filePath,
  };
}

export function listAllEventsForAdmin(): AdminEventRecord[] {
  return EVENT_LOCALES.flatMap((locale) => {
    const dir = path.join(EVENTS_ROOT, locale);

    if (!fs.existsSync(dir)) {
      return [];
    }

    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => readEventFile(locale, path.join(dir, file)))
      .sort(
        (a, b) =>
          new Date(b.frontmatter.timestamp).getTime() -
          new Date(a.frontmatter.timestamp).getTime(),
      );
  });
}

export function readEventForAdmin(
  locale: Locale,
  slug: string,
): AdminEventRecord | null {
  const filePath = getEventPath(locale, slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readEventFile(locale, filePath);
}

export function writeEvent(
  locale: Locale,
  slug: string,
  frontmatter: EventFrontmatter,
  body: string,
) {
  const serializedFrontmatter: Partial<EventFrontmatter> = { ...frontmatter };

  if (serializedFrontmatter.registerUrl === '#') {
    delete serializedFrontmatter.registerUrl;
  }

  const dir = path.join(EVENTS_ROOT, locale);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    getEventPath(locale, slug),
    matter.stringify(body, serializedFrontmatter),
  );
  revalidatePath('/', 'layout');
}

export function deleteEvent(locale: Locale, slug: string) {
  try {
    fs.unlinkSync(getEventPath(locale, slug));
  } catch (error) {
    if (
      typeof error !== 'object' ||
      error === null ||
      !('code' in error) ||
      error.code !== 'ENOENT'
    ) {
      throw error;
    }
  }

  revalidatePath('/', 'layout');
}
