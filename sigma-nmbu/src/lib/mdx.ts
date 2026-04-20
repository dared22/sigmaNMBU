import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import { eventFrontmatter, newsFrontmatter, pageFrontmatter } from './schemas';
import type { Event, Locale, NewsItem, PageMeta, PageRoute } from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      return { data, content, filePath };
    });
}

export const getEvents = cache((locale: Locale): Event[] => {
  const dir = path.join(contentDir, 'events', locale);

  return readMdxFiles(dir)
    .map(({ data, content, filePath }) => {
      const parsed = eventFrontmatter.parse(data, {
        error: () => `Invalid event frontmatter in ${filePath}`,
      });
      return { ...parsed, content } as Event;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
});

export const getEventBySlug = cache((locale: Locale, slug: string): Event | undefined => {
  return getEvents(locale).find((e) => e.slug === slug);
});

export const getAllSlugs = cache((locale: Locale): string[] => {
  return getEvents(locale).map((e) => e.slug);
});

export const getNews = cache((locale: Locale): NewsItem[] => {
  const dir = path.join(contentDir, 'news', locale);

  return readMdxFiles(dir)
    .map(({ data, content, filePath }) => {
      const parsed = newsFrontmatter.parse(data, {
        error: () => `Invalid news frontmatter in ${filePath}`,
      });
      return { ...parsed, content } as NewsItem;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
});

export const getPage = cache((route: PageRoute, locale: Locale): PageMeta | undefined => {
  const filePath = path.join(contentDir, 'pages', route, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const parsed = pageFrontmatter.parse(data, {
    error: () => `Invalid page frontmatter in ${filePath}`,
  });
  return { ...parsed, content };
});
