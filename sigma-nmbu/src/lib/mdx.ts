import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { eventFrontmatter, newsFrontmatter, pageFrontmatter } from './schemas';
import type { Event, NewsItem, PageMeta } from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

function readMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data, content } = matter(raw);
      return { data, content, filename: f };
    });
}

export const getEvents = cache((locale: string): Event[] => {
  const dir = path.join(contentDir, 'events', locale);
  return readMdxFiles(dir)
    .map(({ data, content }) => {
      const parsed = eventFrontmatter.parse(data);
      return { ...parsed, content } as Event;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
});

export const getEventBySlug = cache((locale: string, slug: string): Event | undefined => {
  return getEvents(locale).find((e) => e.slug === slug);
});

export const getAllEventSlugs = cache((locale: string): string[] => {
  return getEvents(locale).map((e) => e.slug);
});

export const getNews = cache((locale: string): NewsItem[] => {
  const dir = path.join(contentDir, 'news', locale);
  return readMdxFiles(dir)
    .map(({ data, content }) => {
      const parsed = newsFrontmatter.parse(data);
      return { ...parsed, content } as NewsItem;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
});

export const getPage = cache((route: string, locale: string): PageMeta | undefined => {
  const filePath = path.join(contentDir, 'pages', route, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const parsed = pageFrontmatter.parse(data);
  return { ...parsed, content };
});
