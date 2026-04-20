import { z } from 'zod/v4';

const isoDateTime = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'Expected an ISO-compatible datetime string',
});

export const eventFrontmatter = z.object({
  slug: z.string(),
  type: z.enum(['workshop', 'guest_lecture', 'hackathon', 'social']),
  complexity: z.enum(['o1', 'on', 'on2']),
  timestamp: isoDateTime,
  location: z.string(),
  capacity: z.object({ current: z.number(), max: z.number() }),
  input: z.string(),
  output: z.string(),
  speakers: z.array(z.string()).default([]),
  registerUrl: z.url().default('#'),
  excerpt: z.string(),
  featured: z.boolean().default(false),
});

export const newsFrontmatter = z.object({
  slug: z.string(),
  timestamp: isoDateTime,
  tag: z.enum(['update_log', 'announcement', 'recap']),
  excerpt: z.string(),
});

export const pageFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
});

export const partnershipForm = z.object({
  company: z.string().min(1),
  contact: z.string().min(1),
  email: z.email(),
  category: z.enum(['sponsorship', 'presentation', 'workshop', 'other']),
  message: z.string().min(10),
});
