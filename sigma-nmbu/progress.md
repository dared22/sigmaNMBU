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

## Phase 2 — Stitch design alignment
This phase updates the public UI to match the Stitch reference captured on
April 20, 2026. It replaces the earlier glassy purple-gray treatment with the
Material-inspired dark system from `CHANGES.md`.

**Status:** COMPLETE
**Completed:** April 20, 2026

**Built:**
- Replaced the shared color token system in `src/app/globals.css` with the new
  dark surface palette, added Material-style surface aliases, and updated the
  fixed background grid to use a line-based crosshatch overlay.
- Expanded font loading to include Inter for body copy, kept Space Grotesk and
  JetBrains Mono for headings and labels, and loaded Material Symbols Outlined
  for the new icon treatment.
- Restyled the global shell in `TopNavBar`, `Footer`, `SiteFrame`, and
  `GridBg` so the layout now uses solid surface containers, `max-w-[1920px]`,
  and the stitch navigation and footer patterns.
- Updated shared UI and terminal primitives, including `Button`, `Badge`,
  `Panel`, `Input`, `Checkbox`, `Radio`, `CodeBlock`, and `TerminalCard`, so
  the square-radius system and surface tokens apply consistently across pages.
- Reworked the home page `Hero`, `LiveStreamFeed`, `EventBlock`, `NewsBlock`,
  and `AuthTerminal` components to match the stitch hero, stream cards, and
  auth terminal treatment.
- Reworked `EventFiltersSidebar` and `EventListItem` so the arrangementer page
  now uses the code-like filter sidebar and metadata-heavy event cards from the
  reference design.
- Reworked `VisionDict`, `EpochTimeline`, and `NodeCard` so the om oss page now
  matches the stitch dictionary block, timeline, and board card styles.
- Updated page-level wrappers and supporting copy in `messages/nb.json` and
  `messages/en.json` so the new layouts, headings, and auth terminal labels are
  reflected in the localized UI.

**Verification:**
- `pnpm lint`
- `pnpm build`

**Deviations:**
- The terminal traffic lights remain circular. `CHANGES.md` explicitly calls
  for circular dots in the auth terminal header, so those indicators were kept
  round while larger pills and chips were flattened elsewhere.
- Material Symbols Outlined is loaded through a stylesheet link in
  `src/app/layout.tsx`. This project setup already uses `next/font/google` for
  text fonts, but the icon font is not exposed there in this repository.

**Blockers:** None
