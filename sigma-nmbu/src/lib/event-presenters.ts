import type { Complexity, EventType, Locale } from '@/types/content';

const dateLocales: Record<Locale, string> = {
  nb: 'nb-NO',
  en: 'en-GB',
};

const titleMap: Record<string, Record<Locale, string>> = {
  'intro-to-neural-networks': {
    nb: 'Intro til nevrale nettverk',
    en: 'Intro to Neural Networks',
  },
  'sustainability-hackathon': {
    nb: 'Bærekraft-hackathon',
    en: 'Sustainability Hackathon',
  },
  'guest-lecture-ml-production': {
    nb: 'Gjesteforelesning i ML-produksjon',
    en: 'Guest Lecture in ML Production',
  },
};

const typeLabels: Record<EventType, Record<Locale, string>> = {
  workshop: { nb: 'Workshop', en: 'Workshop' },
  guest_lecture: { nb: 'Gjesteforelesning', en: 'Guest Lecture' },
  hackathon: { nb: 'Hackathon', en: 'Hackathon' },
  social: { nb: 'Sosialt', en: 'Social' },
};

const complexityStripe: Record<Complexity, 'primary' | 'secondary' | 'warn'> = {
  o1: 'primary',
  on: 'secondary',
  on2: 'warn',
};

export function formatEventDate(
  locale: Locale,
  timestamp: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(dateLocales[locale], options).format(
    new Date(timestamp),
  );
}

export function getEventTitle(locale: Locale, slug: string) {
  return titleMap[slug]?.[locale] ?? humanizeSlug(slug);
}

export function getEventTypeLabel(locale: Locale, type: EventType) {
  return typeLabels[type][locale];
}

export function getComplexityStripe(complexity: Complexity) {
  return complexityStripe[complexity];
}

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .map((token) => {
      if (token === 'ml') return 'ML';
      if (token === 'ai') return 'AI';
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(' ');
}
