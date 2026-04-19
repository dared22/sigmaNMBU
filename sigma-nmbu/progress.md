# SigmaNMBU Build Progress

## Phase 1 — Foundations
**Status:** COMPLETE
**Built:**
- Next.js 16 app with TypeScript, Tailwind CSS v4, App Router
- All dependencies installed (next-intl, MDX, framer-motion, lucide-react, zod, react-hook-form, resend, etc.)
- Design tokens implemented in globals.css via Tailwind v4 `@theme inline` (adapted from plan's v3 config)
- Fonts: Space Grotesk (headline) + JetBrains Mono (mono/body) via next/font/google
- i18n: routing.ts, request.ts, navigation.ts, middleware.ts — all wired with `as-needed` prefix strategy
- Message skeletons: nb.json + en.json with all namespaces (nav, footer, home, events, about, companies, common)
- `[locale]` layout with NextIntlClientProvider, font variables, GridBg
- GridBg component: fixed 24px dot-grid overlay
- Verified: build succeeds, dev server renders at localhost:3000, `lang="nb"` set correctly

**Deviations:**
- Tailwind v4 (shipped with Next.js 16) uses CSS-based config (`@theme inline`) instead of plan's `tailwind.config.ts`. All tokens are equivalent.
- MDX config simplified — remark-gfm/rehype-slug plugins removed from next.config.mjs due to Turbopack incompatibility. Will handle slug generation differently if needed.
- next.config uses `.mjs` extension (plan specified `.mjs`, Next.js 16 scaffolded `.ts` — switched to `.mjs` for ESM plugin imports).
- `middleware.ts` triggers deprecation warning in Next.js 16 (recommends "proxy" convention), but next-intl still uses middleware and it works.

**Blockers:** None
