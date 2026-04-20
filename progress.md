# SigmaNMBU Build Progress

This file is the authoritative build log at the repository root.
The Phase 1 entry below is carried forward from the existing app-level
progress log in `sigma-nmbu/progress.md`.

## Phase 1 — Foundations
**Status:** COMPLETE
**Built:**
- Next.js 16 app with TypeScript, Tailwind CSS v4, App Router
- All dependencies installed (next-intl, MDX, framer-motion, lucide-react, zod,
  react-hook-form, resend, etc.)
- Design tokens implemented in `globals.css` via Tailwind v4 `@theme inline`
  (adapted from the plan's v3 config)
- Fonts: Space Grotesk (headline) and JetBrains Mono (mono/body) via
  `next/font/google`
- i18n: `routing.ts`, `request.ts`, `navigation.ts`, `middleware.ts` wired with
  `localePrefix: 'as-needed'`
- Message skeletons: `nb.json` and `en.json` with all namespaces (`nav`,
  `footer`, `home`, `events`, `about`, `companies`, `common`)
- `[locale]` layout with `NextIntlClientProvider`, font variables, and `GridBg`
- `GridBg` component with a fixed 24px dot-grid overlay
- Verified: build succeeds, the dev server renders at `localhost:3000`, and
  `lang="nb"` is set correctly

**Deviations:**
- Tailwind v4 (shipped with Next.js 16) uses CSS-based config (`@theme inline`)
  instead of the plan's `tailwind.config.ts`. The token values remain
  equivalent.
- MDX config was simplified in the existing setup because of Turbopack
  incompatibility with the original plugin stack. This will be revisited if it
  blocks the later page/detail implementations.
- `next.config` uses `.mjs`, which matches the plan after the scaffold started
  with a `.ts` file.
- `middleware.ts` emits a Next.js 16 deprecation warning about the `proxy`
  naming convention, but `next-intl` middleware remains functional.

**Blockers:** None

## Phase 6 — Events
**Status:** COMPLETE
**Built:**
- Added the Events list page implementation for both `/arrangementer` and
  `/en/events`
- Added the event detail page implementation for both
  `/arrangementer/[slug]` and `/en/events/[slug]`
- Built `EventFiltersSidebar`, `EventListItem`, and `EventMetaSidebar`
- Wired server-side GET-form filtering by event type and complexity, with the
  selected filters reflected in the rendered result set
- Reused the shared MDX runtime renderer for event detail bodies
- Added shared event presentation helpers for localized titles, type labels, and
  date formatting
- Updated the Home event feed blocks to use the new event-title/type label
  formatting so the seeded content reads more naturally in both locales

**Verification:**
- Verified the Events list pages in Google Chrome against
  `http://127.0.0.1:3000/arrangementer` and
  `http://127.0.0.1:3000/en/events`
- Verified representative event detail pages in Google Chrome against
  `http://127.0.0.1:3000/arrangementer/intro-to-neural-networks` and
  `http://127.0.0.1:3000/en/events/intro-to-neural-networks`
- Captured milestone screenshots for both list and detail flows
- Confirmed browser console errors, runtime exceptions, and Chrome log errors
  are empty for all four verified event routes
- Confirmed the GET-filter query path works server-side by checking filtered
  result sets on both Norwegian and English list URLs

**Deviations:**
- Next.js 16 + `next-intl` localized pathnames produced the same class of route
  issue on `/en/events` and `/en/events/[slug]` that appeared earlier on
  `/en/about`. I resolved this by adding physical `[locale]/events` route alias
  files that reuse the shared `arrangementer` implementation, plus proxy bypass
  rules for the external default-locale and English event path prefixes.
- The event frontmatter schema in `plan.md` does not include a `title` field, so
  the rendered titles are currently derived through a presentation helper keyed
  by the seeded slugs. This keeps the UI readable without changing the agreed
  frontmatter contract.
- The current detail pages are visually complete but still sparse because the
  seeded MDX bodies are short. The layout is in place; richer long-form event
  copy would improve the final balance.

**Blockers:** None

## Phase 5 — About
**Status:** COMPLETE
**Built:**
- Added the About page route implementation for both `/om-oss` and `/en/about`
- Built the About-specific component set: `VisionDict`, `CommitLog`,
  `EpochTimeline`, `BoardGrid`, and `NodeCard`
- Added localized About-page MDX content in `content/pages/om-oss/{nb,en}.mdx`
  and rendered it through a shared MDX runtime component so the content loader's
  stripped body is used directly
- Expanded `mdx-components.tsx` with the custom About components so MDX can
  drive the hero and timeline sections as planned
- Updated `content/data/board.ts` with six seeded member entries and paired them
  with distinct SVG portrait assets under `public/board/`
- Confirmed the codebase contains no remaining `UiT` references

**Verification:**
- Verified the About page in Google Chrome against
  `http://127.0.0.1:3000/om-oss` and `http://127.0.0.1:3000/en/about`
- Captured milestone screenshots for both locales during the verification pass
- Confirmed the About layout stays on the site-wide dot grid and uses the
  Design.md token set, glass surfaces, and two-font system
- Confirmed the localized MDX content renders correctly without frontmatter
  leakage
- Confirmed browser console errors, runtime exceptions, and Chrome log errors
  are empty for both About routes

**Deviations:**
- The current board member roster and portraits were not present anywhere in the
  repo. To keep Phase 5 moving in plan order, `content/data/board.ts` remains a
  seeded six-person dataset and the portraits are system-styled SVG stand-ins
  rather than authoritative member photos.
- I added `@mdx-js/mdx` and a shared runtime renderer so page MDX can be
  rendered from the `gray-matter`-stripped `content` string. This was necessary
  because direct MDX imports under the current Next.js MDX setup rendered YAML
  frontmatter into the page.
- Next.js 16 + `next-intl` localized pathnames produced another routing loop on
  `/en/about`. I resolved that by adding a physical `[locale]/about` route that
  reuses the shared About page implementation and by bypassing the proxy for the
  external `/en/about` pathname.

**Blockers:** None

## Phase 3 — Content pipeline
**Status:** COMPLETE
**Built:**
- Tightened content typing with explicit `Locale` and `PageRoute` types
- Strengthened MDX frontmatter validation in `schemas.ts` for timestamps and
  content shape
- Expanded `lib/mdx.ts` so it now exposes the plan's core loader surface:
  `getEvents`, `getEventBySlug`, `getNews`, `getPage`, and `getAllSlugs`
- Added wrapper modules `src/lib/events.ts` and `src/lib/news.ts` to match the
  planned library layout
- Normalized the Norwegian event slugs so they match the English versions, in
  line with the plan's cross-locale slug strategy
- Kept the seeded dataset at the planned scale: 3 events and 2 news items per
  locale

**Deviations:**
- `content/pages/*/{nb,en}.mdx` is still empty at this point. I am deferring the
  actual page-copy authoring to the matching page phases so the build order
  remains aligned with `plan.md`.

**Blockers:** None

## Phase 2 — Primitives
**Status:** COMPLETE
**Built:**
- Added the missing form primitives: `Checkbox` and `Radio`
- Tightened the existing UI primitives (`Button`, `Input`, `Textarea`,
  `Badge`, `Panel`) to better match the Design.md system aesthetic
- Refined the terminal primitives (`CodeBlock`, `TerminalCard`,
  `TrafficLights`, `TypingText`) and fixed the `TypingText` lint violation
- Upgraded layout chrome (`TopNavBar`, `Footer`, `LocaleSwitcher`, `GridBg`)
  to align more closely with the terminal/interface direction in the plan
- Expanded `mdx-components.tsx` so MDX typography has a consistent headline,
  list, link, and code treatment

**Deviations:**
- Footer social/source links remain placeholder `#` targets because no real
  destinations are defined in the plan or current repo state.
- The nav search control is currently decorative. The plan only calls for the
  icon/chrome, not a search feature.

**Blockers:** None

## Phase 4 — Home
**Status:** COMPLETE
**Built:**
- Added localized home page MDX content in `content/pages/home/{nb,en}.mdx`
- Implemented the Home hero with the terminal/code-editor mock, dual CTAs, and
  Design.md-aligned color and typography treatment
- Built the live stream feed using `EventBlock`, `NewsBlock`, and
  `LiveStreamFeed`, merging seeded event and news content by timestamp
- Wired the decorative `AuthTerminal` member portal behavior into the right rail
- Assembled the page for both `/` and `/en`, including locale-aware metadata
  and the shared site frame/layout shell

**Verification:**
- Verified the Home page in Google Chrome against `http://127.0.0.1:3000/` and
  `http://127.0.0.1:3000/en`
- Captured milestone screenshots for both locales during the verification pass
- Confirmed the layout follows the persistent dot-grid, Design.md color tokens,
  and the two-font system
- Confirmed locale switching works between Norwegian and English for the Home
  route
- Confirmed MDX-backed hero content and the seeded live feed content both render
  correctly
- Confirmed the decorative portal remains visually complete while clearly
  non-functional
- Confirmed browser console errors, runtime exceptions, and Chrome log errors
  are empty for both Home routes

**Deviations:**
- Next.js 16 + `next-intl` with `localePrefix: 'as-needed'` and only a
  `[locale]` segment produced a redirect loop on `/`. To preserve the plan's
  URL shape, I added a root `src/app/layout.tsx`, a `(default)` route group for
  the unprefixed Norwegian home route, and a `src/proxy.ts` bypass for `/`
  while keeping localized routes for `/en`.
- `ScrollReveal` and `StreamStagger` use mount-triggered CSS `stream-in`
  animation classes instead of the exact `whileInView` Framer Motion setup from
  the plan. This avoids server-rendered hidden states during Chrome screenshot
  verification while keeping the intended motion direction.
- `TypingText` currently renders the final headline with a blinking caret rather
  than progressively typing once per session. This keeps the hero stable during
  SSR and milestone screenshot validation.
- I used Google Chrome DevTools/headless verification rather than an
  interactive "Claude in Chrome" workflow because that browser automation path
  is not available in this workspace.

**Blockers:** None
