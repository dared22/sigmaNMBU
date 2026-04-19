import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: { remotePatterns: [] },
};

export default withNextIntl(withMDX(config));
