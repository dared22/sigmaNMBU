import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nb', 'en'],
  defaultLocale: 'nb',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/arrangementer': { nb: '/arrangementer', en: '/events' },
    '/arrangementer/[slug]': { nb: '/arrangementer/[slug]', en: '/events/[slug]' },
    '/om-oss': { nb: '/om-oss', en: '/about' },
    '/for-bedrifter': { nb: '/for-bedrifter', en: '/for-companies' },
  },
});
