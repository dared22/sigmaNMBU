# SigmaNMBU — Implementation Plan

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · MDX · next-intl · Framer Motion · Vercel
**Source of truth:** `DESIGN.MD` for visuals. Stitch exports are layout references only — when they conflict with Design.md (colors, typography, grid type), Design.md wins.
**Organization:** SigmaNMBU (Data Science Branch, Norges miljø- og biovitenskapelige universitet — NMBU). Not UiT. Not UiO.

---

## 0. Ground truth — applying Design.md

| Token | Design.md value | Notes |
|---|---|---|
| `bg.base` | `#33313B` (Deep Charcoal) | "Editor Background" — site-wide background |
| `accent.primary` | `#4592AF` (Neural Blue) | CTAs, success, active nav |
| `accent.secondary` | `#E3C4A8` (Sand/Papyrus) | Warnings, secondary data, tertiary emphasis |
| `fg.default` | `#F6F5F5` (Off-White) | Body text, sparingly |
| Headlines | Space Grotesk Bold, `tracking: -0.05em` | |
| Data / metadata / body prose | JetBrains Mono | Two-font system — no Inter |
| Grid | 24px **dot** grid (radial), persistent across all pages | Stitch home uses a line grid — override it |
| Borders | 1px `rgb(255 255 255 / 0.10)` | |
| Glass | `bg-white/5` or `bg-black/20` + `backdrop-blur` | |

**Stitch deviations we are intentionally correcting:**
- Stitch palette (`#121414` / `#86D0EF` / `#E0C1A5`) → replaced with Design.md palette above.
- Stitch Home uses a line grid → use the dot grid (per Design.md, used across "all pages").
- Stitch About references "UiT" → this is NMBU.
- Stitch uses Inter for body → drop Inter, body is JetBrains Mono.

---

## 1. Project setup

### 1.1 Create the app

```bash
pnpm create next-app@latest sigma-nmbu \
  --ts --app --src-dir --eslint --tailwind \
  --import-alias "@/*"
cd sigma-nmbu
```

### 1.2 Dependencies

```bash
# Core
pnpm add next-intl @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
pnpm add framer-motion lucide-react clsx tailwind-merge
pnpm add gray-matter remark-gfm rehype-slug rehype-autolink-headings
pnpm add zod react-hook-form @hookform/resolvers resend
pnpm add @vercel/analytics

# Dev
pnpm add -D @tailwindcss/typography prettier prettier-plugin-tailwindcss
```

**Why these:**
- `next-intl` — App Router-native i18n with typed messages and localized pathnames.
- `@next/mdx` — first-party MDX pipeline, works with RSC.
- `framer-motion` — used sparingly for terminal-type effects and scroll reveals.
- `lucide-react` — primary icon lib (outline, thin-stroke — matches "minimalist, outline icons"). Keep Material Symbols as a fallback via `<span className="material-symbols-outlined">` only for the handful of glyphs Lucide lacks (`commit`, `sensors`).
- `gray-matter` + `remark`/`rehype` plugins — MDX frontmatter + slugged anchors.
- `zod` + `react-hook-form` — For Companies intake form.
- `resend` — transactional email for form submissions.

### 1.3 Folder structure

```
sigma-nmbu/
├─ mdx-components.tsx              # required by @next/mdx (root-level)
├─ next.config.mjs
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ messages/
│  ├─ nb.json
│  └─ en.json
├─ content/                        # MDX — see §6
│  ├─ events/
│  │  ├─ nb/
│  │  └─ en/
│  ├─ news/
│  │  ├─ nb/
│  │  └─ en/
│  ├─ pages/
│  │  ├─ home/{nb,en}.mdx
│  │  ├─ om-oss/{nb,en}.mdx
│  │  └─ for-bedrifter/{nb,en}.mdx
│  └─ data/
│     └─ board.ts                  # Hovedstyret — typed data, not MDX
├─ public/
│  ├─ board/                       # Board member portraits
│  └─ og/
└─ src/
   ├─ middleware.ts                # next-intl middleware
   ├─ i18n/
   │  ├─ routing.ts                # defineRouting(...)
   │  ├─ request.ts                # getRequestConfig
   │  └─ navigation.ts             # Link, redirect, usePathname, useRouter exports
   ├─ app/
   │  ├─ [locale]/
   │  │  ├─ layout.tsx             # html/body + providers + fonts + GridBg
   │  │  ├─ page.tsx               # Home
   │  │  ├─ arrangementer/         # (nb path)  — en rewrites to /events
   │  │  │  ├─ page.tsx
   │  │  │  └─ [slug]/page.tsx
   │  │  ├─ om-oss/page.tsx        # en rewrites to /about
   │  │  └─ for-bedrifter/page.tsx # en rewrites to /for-companies
   │  ├─ api/
   │  │  └─ partnership/route.ts   # company intake POST handler
   │  ├─ robots.ts
   │  ├─ sitemap.ts
   │  └─ globals.css
   ├─ components/
   │  ├─ layout/       # TopNavBar, Footer, GridBg, LocaleSwitcher
   │  ├─ ui/           # Button, Input, Checkbox, Radio, Badge, Panel, MetaPair
   │  ├─ terminal/     # TerminalCard, CodeBlock, TypingText, TrafficLights,
   │  │                # AuthTerminal, CommitLog, VisionDict
   │  ├─ home/         # Hero, LiveStreamFeed, NewsBlock, EventBlock
   │  ├─ events/       # EventFiltersSidebar, EventListItem, EventMetaSidebar
   │  ├─ about/        # EpochTimeline, BoardGrid, NodeCard
   │  ├─ companies/    # SystemMetrics, CollaborationEndpoint, PartnershipForm
   │  └─ motion/       # ScrollReveal, StreamStagger (framer-motion wrappers)
   ├─ lib/
   │  ├─ cn.ts
   │  ├─ fonts.ts                  # next/font exports
   │  ├─ mdx.ts                    # file-system content loader, gray-matter
   │  ├─ events.ts                 # getEvents(locale), getEventBySlug
   │  ├─ news.ts
   │  └─ schemas.ts                # zod schemas for MDX frontmatter + forms
   └─ types/
      └─ content.ts                # Event, NewsItem, BoardMember, etc.
```

### 1.4 `next.config.mjs`

```js
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { mdxRs: false }, // keep JS MDX — rehype-slug not supported on mdxRs
  images: { remotePatterns: [] },
};

export default withNextIntl(withMDX(config));
```

### 1.5 `mdx-components.tsx` (root)

```tsx
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/terminal/CodeBlock';
import { TerminalCard } from '@/components/terminal/TerminalCard';

const components: MDXComponents = {
  h1: (p) => <h1 className="font-headline text-5xl md:text-7xl tracking-[-0.05em] text-neutral" {...p} />,
  h2: (p) => <h2 className="font-headline text-3xl md:text-4xl tracking-[-0.05em] text-neutral mt-16 mb-6" {...p} />,
  h3: (p) => <h3 className="font-headline text-xl md:text-2xl tracking-[-0.04em] text-neutral mt-10 mb-3" {...p} />,
  p:  (p) => <p className="font-mono text-sm md:text-base text-neutral/80 leading-relaxed my-4" {...p} />,
  a:  (p) => <a className="text-accent-primary underline decoration-accent-primary/40 underline-offset-4 hover:decoration-accent-primary" {...p} />,
  ul: (p) => <ul className="font-mono text-sm text-neutral/80 list-none space-y-2 my-4" {...p} />,
  li: (p) => <li className="pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-accent-primary" {...p} />,
  code: (p) => <code className="font-mono text-accent-secondary bg-white/5 px-1.5 py-0.5 rounded" {...p} />,
  pre:  ({ children }) => <CodeBlock>{children}</CodeBlock>,
  TerminalCard,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

---

## 2. Design token implementation

### 2.1 `src/lib/fonts.ts`

```ts
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

export const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});
```

Apply in `src/app/[locale]/layout.tsx`:
```tsx
<html lang={locale} className={`${grotesk.variable} ${mono.variable}`}>
```

### 2.2 `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.mdx',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        // Design.md palette — authoritative
        bg:      { DEFAULT: '#33313B', deep: '#2A2833', raised: '#3D3A46' },
        accent:  { primary: '#4592AF', 'primary-dim': '#356E86',
                   secondary: '#E3C4A8', 'secondary-dim': '#B89A82' },
        neutral: { DEFAULT: '#F6F5F5', muted: '#C9C4D1', dim: '#9A95A3' },
        line:    { DEFAULT: 'rgb(255 255 255 / 0.10)',
                   strong: 'rgb(255 255 255 / 0.20)' },
        status:  { ok: '#4592AF', warn: '#E3C4A8', err: '#FFB4AB' },
      },
      fontFamily: {
        headline: ['var(--font-grotesk)', 'sans-serif'],
        mono:     ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { headline: '-0.05em' },
      borderRadius: { DEFAULT: '2px', lg: '4px', xl: '8px', full: '12px' },
      boxShadow: {
        glow:      '0 0 40px 0 rgb(69 146 175 / 0.08)',
        'glow-md': '0 0 18px rgb(69 146 175 / 0.35)',
        'glow-lg': '0 0 32px rgb(69 146 175 / 0.55)',
        'glow-warm': '0 0 24px rgb(227 196 168 / 0.30)',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '24px 24px' },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        caret:       'caret 1s step-end infinite',
        glitch:      'glitch 140ms steps(2,end)',
        'stream-in': 'stream-in 420ms cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        caret:       { '50%': { opacity: '0' } },
        glitch:      { '50%': { transform: 'translate(-1px, 1px) skewX(-2deg)',
                                 filter: 'hue-rotate(8deg)' } },
        'stream-in': { '0%': { opacity: '0', transform: 'translateY(8px)' },
                       '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
} satisfies Config;
```

### 2.3 `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body { background: theme('colors.bg.DEFAULT'); color: theme('colors.neutral.DEFAULT'); }
  ::selection { background: theme('colors.accent.primary'); color: theme('colors.bg.DEFAULT'); }
  :focus-visible { outline: 2px solid theme('colors.accent.primary'); outline-offset: 2px; }
}

@layer components {
  .grid-bg {
    background-image: theme('backgroundImage.dot-grid');
    background-size: theme('backgroundSize.grid');
  }
  .glass {
    background-color: rgb(255 255 255 / 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .ghost-border { border: 1px solid theme('colors.line.DEFAULT'); }
  .hairline      { border: 1px solid theme('colors.line.strong'); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

---

## 3. Component inventory

### 3.1 Layout & chrome
| Component | Purpose | Used on |
|---|---|---|
| `TopNavBar` | Sticky nav, σ brand, locale-aware links, active underline, locale switcher, search icon | all |
| `Footer` | Brand, `BUILD_VER`, Slack/IG/source links, system-status pill | all |
| `GridBg` | Fixed 24px dot-grid overlay (pointer-events none, opacity tweaks on hover via parent) | all |
| `LocaleSwitcher` | NB ↔ EN toggle, preserves pathname via `next-intl/navigation` | nav |

### 3.2 UI primitives
| Component | Purpose | Used on |
|---|---|---|
| `Button` | Variants: `primary` (glow), `ghost` (ghost-border), `terminal` (dark w/ traffic lights), `glitch` | all |
| `Input` / `Textarea` | Terminal-styled with `>` prefix, focus ring = accent-primary | home, companies |
| `Checkbox` / `Radio` | Square corners, accent-primary tick | events filters |
| `Badge` | Small monospace pill: `MODULE_EVENT`, `UPDATE_LOG`, `CLASS: ROOT` | home, about, events |
| `Panel` | Base card: bg-bg.raised, ghost-border, optional left color stripe | home, events |
| `MetaPair` | Vertical label+value pair in monospace (LOCATION / CAPACITY) | events, home |
| `StatusDot` | Colored pulsing dot (ok/warn/err) | nav, feed, footer |

### 3.3 Terminal primitives
| Component | Purpose | Used on |
|---|---|---|
| `TrafficLights` | Three circles (red/yellow/green) for card chrome | all cards |
| `TerminalCard` | Panel + traffic-light header + monospace title slot | home, about |
| `CodeBlock` | Multi-line monospace block with colored spans (no real syntax highlighting v1) | home hero, MDX `<pre>` |
| `TypingText` | Types characters over time; respects reduced-motion | home hero |
| `AuthTerminal` | Full login card with metrics block (decorative placeholder — no backend in v1) | home |
| `VisionDict` | JSON-shaped hero block with colored keys/values | about |
| `CommitLog` / `EpochNode` | Vertical timeline with diamond nodes, labeled `EPOCH N` | about |

### 3.4 Feature components
| Component | Purpose | Used on |
|---|---|---|
| `Hero` | Welcome + tagline + dual CTA + floating code editor mock | home |
| `LiveStreamFeed` | Streaming pill header + vertical list of `EventBlock`/`NewsBlock` | home |
| `EventBlock` / `NewsBlock` | Timestamped article with left color stripe, badge, meta strip | home |
| `EventFiltersSidebar` | Sticky sidebar styled as JS object literal with checkboxes/radios | events |
| `EventListItem` | Left meta sidebar (timestamp/complexity/io) + body + register CTA | events |
| `EventDetailHeader` | Title, complexity, timestamp, register CTA, back link | events/[slug] |
| `BoardGrid` / `NodeCard` | Member profile grid with grayscale→color hover, CLASS badge | about |
| `SystemMetrics` | Big animated counters (framer-motion `useMotionValue`) | companies |
| `CollaborationEndpoint` | Service card (sponsorship / workshop / bedpres) | companies |
| `PartnershipForm` | zod + RHF intake form, Resend email on POST | companies |

### 3.5 Motion wrappers
| Component | Purpose |
|---|---|
| `ScrollReveal` | `whileInView` fade + 8px translateY, 60ms stagger, `once: true` |
| `StreamStagger` | Wraps children and applies `stream-in` with index delay |

---

## 4. Page-by-page build plan

### 4.1 Home `/` (nb) · `/en`

**Layout:**
1. `Hero` — full-width, min-h 614px, hero-gradient + ghost-border + shadow-glow. Left: status line (`// STATUS: ONLINE_AND_READY`), H1 `Velkommen til Sigma // Data_Science_Branch` (H1 second line uses `text-accent-primary`), body paragraph, two buttons (`Start Training (Bli medlem)` primary-glow, `View Documentation (Les mer)` ghost). Right: `TerminalCard` rendering a static `visualize_data.py` `CodeBlock` with a mini bar chart.
2. 12-col grid: left 8 = `LiveStreamFeed`, right 4 = `AuthTerminal` (sticky `top-24`).
3. `LiveStreamFeed` header: "System_Output: Live Stream" + pulsing red dot + "Streaming" pill.
4. Feed body: alternating `EventBlock` (left stripe = accent-primary) and `NewsBlock` (left stripe = accent-secondary). Pull 3–5 items via `getEvents('nb')` + `getNews('nb')`, merge by timestamp desc.
5. `AuthTerminal` — decorative in v1. Form submits to a no-op handler that only toggles a "NOT YET AVAILABLE" inline message.

**Components used:** `Hero`, `TerminalCard`, `CodeBlock`, `LiveStreamFeed`, `EventBlock`, `NewsBlock`, `AuthTerminal`, `StatusDot`, `Button`, `Badge`, `MetaPair`.

**MDX content:** `content/pages/home/{nb,en}.mdx` provides hero title, tagline, button labels via frontmatter; live feed items come from `content/events/*` + `content/news/*`.

**i18n keys** (`messages/nb.json` → `home`): `status`, `hero.title`, `hero.titleAccent`, `hero.body`, `hero.cta.primary`, `hero.cta.secondary`, `stream.heading`, `stream.streaming`, `portal.heading`, `portal.subtitle`, `portal.studentId`, `portal.accessKey`, `portal.cta`, `portal.requestAccess`, `portal.placeholder.id`, `portal.metrics.security`, `portal.metrics.latency`, `portal.decorativeNotice`.

### 4.2 Events `/arrangementer` (nb) · `/en/events`

**Layout:**
1. Hero strip: "`// QUERY_EXECUTED: SELECT * FROM Events`" + H1 "Event_Log" + subtitle. Right: pill block with "Active_Nodes / Uptime".
2. Row: `EventFiltersSidebar` (sticky, `w-80`) + event list (`flex-grow`).
3. Filters rendered as JS object literal (`const filterParams = { ... }`) with checkboxes for type, radio for complexity. State mirrored into URL search params — all filtering happens server-side via RSC re-render. "EXECUTE_FILTER()" button is a `<button type="submit">` inside a GET `<form>`.
4. `EventListItem` per event: left 48px meta sidebar (TIMESTAMP / COMPLEXITY / INPUT / OUTPUT) with left-border color = complexity tier, body (type badge + title + excerpt), bottom strip (location / capacity / REGISTER_NODE button → `/arrangementer/[slug]`).

**Detail page `/arrangementer/[slug]`:**
- Top strip: back link, type badge, complexity tag.
- H1 title, timestamp, location, capacity.
- MDX body (long-form description).
- Right rail on desktop: "REGISTER_NODE" CTA (decorative — links to external signup URL from frontmatter), speaker block if present.

**MDX content:** `content/events/{locale}/[slug].mdx` — see §6.

**i18n keys** (`events` namespace): `heading`, `subtitle`, `stats.activeNodes`, `stats.uptime`, `filters.type`, `filters.complexity`, `filters.execute`, `list.emptyState`, `item.registerCta`, `item.location`, `item.capacity`, `item.complexity.o1`, `item.complexity.on`, `item.complexity.on2`, `detail.back`, `detail.register`.

### 4.3 About `/om-oss` (nb) · `/en/about`

**Layout:**
1. `VisionDict` hero — `import sigma` H1 then a code-style dict literal with entity/focus_area/objective/core_values/active_nodes.
2. `CommitLog` / Training Log — vertical timeline with three+ epochs. **Content must reference NMBU, not UiT.** Current epoch node pulses accent-primary.
3. `BoardGrid` — 3-col `NodeCard` layout. Board data lives in `content/data/board.ts`. Portraits grayscale → color on hover. CLASS badge (ROOT / DAEMON / ALLOCATOR / …) from data.

**Content origin:**
- Vision dict literal + epoch copy → `content/pages/om-oss/{nb,en}.mdx` (MDX with custom components).
- Board data → `content/data/board.ts` (typed array), with translated role strings via i18n keys keyed by `memberId`.

**i18n keys** (`about` namespace): `hero.import`, `hero.init`, `dict.entity`, `dict.focus`, `dict.objective`, `dict.values`, `dict.nodes`, `log.heading`, `log.epoch`, `log.current`, `board.heading`, `board.query`, `board.stats.uptime`, `board.class.root`, `board.class.daemon`, `board.class.allocator`.

### 4.4 For Companies `/for-bedrifter` (nb) · `/en/for-companies`

No Stitch screen — design from scratch following Design.md.

**Layout:**
1. Hero: `// ENDPOINT: /api/partnership` style status line, H1 "B2B_Integration", subtitle.
2. `SystemMetrics` — 3 big counters: `400` active nodes, `N` events/year, `N` corporate partnerships. Animate on scroll-in.
3. `CollaborationEndpoints` — 3 `TerminalCard`s in a grid: `sponsorship`, `bedriftspresentasjon`, `workshop`. Each has a body paragraph + ghost `Request endpoint` button that scrolls to the form.
4. `PartnershipForm` — styled exactly like the home AuthTerminal. Fields: company name, contact name, email, category (enum: sponsorship/presentation/workshop/other), message. Validated with zod; POSTs to `/api/partnership`; handler sends Resend email to `kontakt@sigmanmbu.no` and returns 200.

**i18n keys** (`companies` namespace): `hero.endpoint`, `hero.title`, `hero.subtitle`, `metrics.members`, `metrics.events`, `metrics.partners`, `endpoints.sponsorship.{title,body,cta}`, `endpoints.presentation.{title,body,cta}`, `endpoints.workshop.{title,body,cta}`, `form.{company,contact,email,category,message,submit,success,error}`.

---

## 5. Animation strategy

Design.md cues: "glitch" or "instant-swap" button transitions, subtle motion, code-editor feel. Keep motion purposeful and respect `prefers-reduced-motion` everywhere (handled globally in `globals.css`).

| Surface | Technique | Implementation |
|---|---|---|
| Hero code block types in on first paint | Custom `<TypingText>` stepping a slice index with `requestAnimationFrame`, caret via `animate-caret` | once per visit (sessionStorage) |
| Feed cards enter | `ScrollReveal` wrapper (framer-motion `whileInView`, `once: true`, 60ms stagger, y:8 → y:0) | home, events |
| Streaming status dots | CSS `animate-pulse-dot` | nav, feed header |
| Primary button hover | `shadow-glow-md` → `shadow-glow-lg`, 120ms `transition-all`, icon gets `rotate-90` (terminal icon) | all |
| Filter execute button click | `animate-glitch` via `data-state="pressed"` toggle, 140ms | events |
| Board card hover | Portrait `grayscale` → `grayscale-0`, 300ms | about |
| Current-epoch node | `animate-pulse-dot` on the marker | about |
| System metrics counters | framer-motion `useMotionValue` + `useTransform` on scroll-into-view | companies |
| Page transitions | None in v1 — RSC navigations are fast and transitions risk jank. |
| Caret blink on inputs | CSS `animate-caret` on the `>` prefix | all forms |

**Explicitly out of scope:** particle fields, matrix rain, typing SFX, full-screen cursor trails. The aesthetic is *implying* terminal, not cosplay.

---

## 6. MDX content structure

### 6.1 `content/events/{locale}/[slug].mdx`

Frontmatter schema (zod-validated via `lib/schemas.ts` at load time):

```yaml
---
slug: intro-to-neural-networks
type: workshop              # workshop | guest_lecture | hackathon | social
complexity: on              # o1 | on | on2
timestamp: 2026-03-15T14:30:00Z
location: "R8_Data_Lab"
capacity: { current: 42, max: 50 }
input: "Students_Active"
output: "Neural_Networks"
speakers: []
registerUrl: "https://..."
excerpt: "Optimizing weights and biases in PyTorch."
featured: false
---

## module.description

Long-form MDX body goes here. Can use <TerminalCard> and custom components
registered in mdx-components.tsx.
```

### 6.2 `content/news/{locale}/[slug].mdx`

```yaml
---
slug: titan-x-cluster-online
timestamp: 2026-03-12T09:15:00Z
tag: update_log             # update_log | announcement | recap
excerpt: "New GPU cluster 'Titan-X' online."
---
```

### 6.3 `content/pages/{route}/{locale}.mdx`

For long-form static content (home hero copy, about page prose). Frontmatter just holds `{ title, description }` for metadata.

### 6.4 `content/data/board.ts`

```ts
export type BoardClass = 'root' | 'daemon' | 'allocator' | 'compiler' | 'scheduler';
export interface BoardMember {
  id: string;                  // stable i18n key root
  name: string;                // proper noun, not translated
  portrait: string;            // /public/board/...
  class: BoardClass;
  processName: string;         // e.g. "sysadmin"
  roleKey: 'leder' | 'nestleder' | 'okonomi' | 'markeds' | 'bedrift' | 'arrangement';
  order: number;
  metrics: { label: string; value: string }[];
}
export const board: BoardMember[] = [ /* ... */ ];
```

Role labels and page copy translated via `messages/{locale}.json` using `roleKey` as the lookup.

### 6.5 Content loader (`src/lib/mdx.ts`)

- Reads `content/{type}/{locale}/*.mdx` at build time via `fs.readdir`.
- Parses frontmatter with `gray-matter`, validates with zod; throws at build time on schema errors.
- Exports `getEvents(locale)`, `getEventBySlug(locale, slug)`, `getNews(locale)`, `getPage(route, locale)`.
- Cached per-request via `React.cache`.

---

## 7. i18n architecture

### 7.1 Strategy

- **Locales:** `nb` (default, Norwegian Bokmål), `en` (English).
- **Prefix strategy:** `localePrefix: 'as-needed'` — Norwegian audience is primary, so `/arrangementer` serves NB without prefix, English lives at `/en/events`.
- **Localized pathnames:** Norwegian route slugs stay Norwegian; English rewrites to natural English slugs.

### 7.2 `src/i18n/routing.ts`

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nb', 'en'],
  defaultLocale: 'nb',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/arrangementer':          { nb: '/arrangementer',          en: '/events' },
    '/arrangementer/[slug]':   { nb: '/arrangementer/[slug]',   en: '/events/[slug]' },
    '/om-oss':                 { nb: '/om-oss',                 en: '/about' },
    '/for-bedrifter':          { nb: '/for-bedrifter',          en: '/for-companies' },
  },
});
```

### 7.3 `src/middleware.ts`

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};
```

### 7.4 `src/i18n/navigation.ts`

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**Always import `Link` from `@/i18n/navigation`, never from `next/link`.** Nav, footer, and feature components all use this.

### 7.5 `src/i18n/request.ts`

```ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 7.6 Message files

`messages/nb.json` and `messages/en.json` — nested by namespace (`nav`, `footer`, `home`, `events`, `about`, `companies`, `common`). Lock the NB file first, then translate to EN in one pass per page.

### 7.7 Localized MDX

- Content files live per-locale: `content/events/nb/`, `content/events/en/`.
- Slugs match across locales when the event is the same (so `/en/events/intro-to-neural-networks` and `/arrangementer/intro-to-neural-networks` map to the same canonical event).
- At build, each locale's event list is loaded independently — no cross-locale key mapping required.
- `generateStaticParams` on `[slug]/page.tsx` returns the cross-product `{locale, slug}`.

### 7.8 `LocaleSwitcher`

Uses `usePathname` + `useRouter` from `@/i18n/navigation` to swap locale while preserving the current pathname. For MDX pages with locale-specific slugs, look up the sibling slug via a generated `content/slug-map.json` built during content load.

---

## 8. Build order

Tight tasks. Each one should be a PR or a single commit. Don't start a task before its predecessors are green.

**Phase 1 — foundations (day 1)**
1. `pnpm create next-app` + install all deps from §1.2.
2. Wire `next.config.mjs`, `tailwind.config.ts`, `globals.css`, `lib/fonts.ts`.
3. Add `messages/nb.json` + `messages/en.json` skeletons.
4. Create `src/i18n/{routing,request,navigation}.ts` + `src/middleware.ts`.
5. Move app into `src/app/[locale]/`; verify `/` renders under both `nb` (default, no prefix) and `/en`.
6. Build `GridBg` and apply in root layout. Confirm dot grid visible site-wide.

**Phase 2 — primitives (day 2)**
7. `Button` (all variants), `Input`, `Checkbox`, `Radio`, `Badge`, `Panel`, `MetaPair`, `StatusDot`.
8. `TrafficLights`, `TerminalCard`, `CodeBlock`, `TypingText`.
9. `TopNavBar` + `Footer` + `LocaleSwitcher`. Nav active state driven by `usePathname`.
10. `mdx-components.tsx` wired with typography.

**Phase 3 — content pipeline (day 3)**
11. Zod schemas in `lib/schemas.ts` (event, news, page frontmatter).
12. `lib/mdx.ts` loader — `getEvents`, `getNews`, `getPage`, `getEventBySlug`, `getAllSlugs` (for `generateStaticParams`).
13. Seed 3 events and 2 news items per locale (can be lorem — real copy later).

**Phase 4 — Home (day 4)**
14. `Hero` + `TerminalCard` + mock code editor chart.
15. `EventBlock`, `NewsBlock`, `LiveStreamFeed`.
16. `AuthTerminal` with decorative-notice behavior.
17. Page assembly + `generateMetadata` with per-locale title/description.

**Phase 5 — About (day 5)**
18. `VisionDict`, `EpochTimeline`, `CommitLog` node styling.
19. `BoardGrid` + `NodeCard` with 6 real board members in `content/data/board.ts`.
20. Confirm copy references **NMBU** everywhere (search-and-destroy any "UiT" text).

**Phase 6 — Events (day 6)**
21. `EventFiltersSidebar` with URL-synced filters (GET form, RSC re-render).
22. `EventListItem` + list page.
23. `[slug]/page.tsx` detail page + `generateStaticParams`.

**Phase 7 — For Companies (day 7)**
24. `SystemMetrics` (framer counters).
25. `CollaborationEndpoint` cards × 3.
26. `PartnershipForm` + `/api/partnership` route + Resend integration.

**Phase 8 — polish & ship (day 8)**
27. `app/sitemap.ts` + `app/robots.ts` covering both locales.
28. `@vercel/analytics` hooked up.
29. Lighthouse: target ≥95 Performance, ≥95 A11y. Fix any contrast issues — Design.md's accent-primary `#4592AF` on `#33313B` is ~4.6:1, fine for body text; secondary `#E3C4A8` is ~8:1, excellent.
30. Manual QA in both locales; tab-through every interactive element.
31. Deploy.

---

## 9. Deployment

### 9.1 Vercel
- Import the GitHub repo, framework auto-detected as Next.js.
- Production branch: `main`. Preview deploys on every PR.
- Custom domain: point `sigmanmbu.no` (or chosen domain) at Vercel.
- Node version: 20 LTS (set via `"engines"` in `package.json`).

### 9.2 Environment variables

| Key | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Production + Preview | Partnership form email |
| `PARTNERSHIP_TO_EMAIL` | Production | Recipient mailbox (default `kontakt@sigmanmbu.no`) |
| `NEXT_PUBLIC_SITE_URL` | Production | Used by sitemap + OG images |

No auth env vars in v1 (AuthTerminal is decorative).

### 9.3 i18n/MDX in production notes
- `next-intl` works on Vercel edge + node runtimes out of the box; middleware runs on edge.
- MDX compiled at build time — no runtime deps. `@next/mdx` is JS (we disabled `mdxRs`) so `rehype-slug` and `rehype-autolink-headings` work.
- `generateStaticParams` on `[locale]` + `[slug]` routes means events and news are fully static — no ISR needed v1.
- Add `Cache-Control: s-maxage=3600, stale-while-revalidate=86400` headers in `next.config.mjs` once content volume grows.

### 9.4 SEO basics
- Per-page `generateMetadata` with locale-specific `title`, `description`, `openGraph.locale`, and `alternates.languages` pointing to the sibling locale URL.
- `sitemap.ts` emits both locale trees, each page with `alternates.languages`.
- `robots.ts` allows all, points at sitemap.

---

## 10. Open decisions

Flag these with a human answer before (or early during) the matching phase.

| # | Decision | Impact | Default if silent |
|---|---|---|---|
| D1 | Final domain (`sigmanmbu.no` vs `.org`/`.com`)? | Phase 8 | `sigmanmbu.no` |
| D2 | Locale prefix strategy — `as-needed` (recommended) vs `always` (`/nb`, `/en`)? | Phase 1 | `as-needed` |
| D3 | Keep two-font system (Space Grotesk + JetBrains Mono only, body prose is mono)? Design.md implies yes; long-form readability will suffer on About/event detail. | Phase 1 | Two-font strict. Re-evaluate after Phase 5 on real copy. |
| D4 | Real Feide/NMBU auth for Medlemsportal in a future milestone, or keep decorative indefinitely? | Post-v1 | Decorative v1, Feide deferred |
| D5 | Events source — MDX in repo (recommended for v1) vs headless CMS (Sanity/Notion) later? | Phase 3 | MDX in repo; migrate if event volume > ~30/semester |
| D6 | Registration mechanism — external link per event (in frontmatter) vs internal form? | Phase 6 | External link v1 |
| D7 | Contact email for partnership form (`PARTNERSHIP_TO_EMAIL`)? | Phase 7 | Blocks email wiring — must be set before ship |
| D8 | Brand assets — is there a real SigmaNMBU σ logo SVG? If not, we use a typographic `σ` placeholder. | Phase 2 | Typographic placeholder |
| D9 | Analytics — Vercel Analytics only, or add Plausible/Umami? | Phase 8 | Vercel Analytics only |
| D10 | Accent palette is taken verbatim from Design.md, but `#4592AF` + `#E3C4A8` is a markedly cooler+warmer combo than Stitch. Confirm visual direction matches Design.md intent. | Phase 1 | Follow Design.md |
| D11 | Dark-mode-only, or add a light theme later? Design.md is dark-first; a light theme is non-trivial given glass/glow usage. | Post-v1 | Dark only v1 |
| D12 | "NMBU" badge in the σ logomark or only in body copy? | Phase 2 | `SIGMA_NMBU` wordmark in nav/footer |

---

*End of plan. Execute in order. When in doubt, reread §0.*
