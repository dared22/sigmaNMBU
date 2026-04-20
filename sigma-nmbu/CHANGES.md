# Changes Required to Match Stitch Design

Reference: `/Users/pasha/Desktop/stitch_sigma_association_portal`

---

## 1. Color Palette — `src/app/globals.css` (CRITICAL)

The entire color token system must be replaced. The stitch design is built on a Material Design dark palette with near-black surfaces, not the current purple-gray.

| Token needed | Stitch value | Current value |
|---|---|---|
| background | `#121414` | `#33313B` |
| surface-container | `#1e2020` | N/A |
| surface-container-low | `#1a1c1c` | N/A |
| surface-container-high | `#292a2a` | N/A |
| surface-container-highest | `#343535` | N/A |
| surface-container-lowest | `#0d0e0f` | N/A |
| surface-variant | `#343535` | N/A |
| secondary (main cyan accent) | `#86d0ef` | `#4592AF` |
| on-secondary | `#003545` | N/A |
| primary (lavender gray) | `#c9c4d1` | `#C9C4D1` (neutral-muted — exists but not bg) |
| tertiary (warm sand) | `#e0c1a5` | `#E3C4A8` (accent-secondary — close) |
| outline-variant | `#48464b` | N/A |
| error | `#ffb4ab` | `#FFB4AB` (status-err — matches) |
| on-surface / neutral | `#e3e2e2` | `#F6F5F5` (off by ~5%) |

**Action**: Remap CSS custom properties in `globals.css` to the Material token names or add aliases. At minimum, change `--color-bg` from `#33313B` to `#121414` and `--color-accent-primary` from `#4592AF` to `#86d0ef`.

Also update the `html, body` base style: `background: #121414`.

---

## 2. TopNavBar — `src/components/layout/TopNavBar.tsx`

### Brand/Logo
- **Remove** `σ` Greek letter — replace with `sensors` Material Symbol icon (class `material-symbols-outlined text-[#86D0EF] text-2xl`) + `SIGMA_DS_AI` text in Space Grotesk bold, `text-[#C9C4D1] tracking-widest`.
- **Remove** the build-version chip from the logo area.

### Nav container
- Change from `bg-bg/70 backdrop-blur-xl` to `bg-surface-container` (solid, no blur).
- Change max-width from `max-w-7xl` to `max-w-[1920px]`.
- Add `border-b border-surface-variant` to the outer header.

### Nav link style (active indicator)
- **Remove** rounded-pill `rounded-full px-3 py-1.5 bg-accent-primary/10` style.
- **Replace** with flat text links; active link gets `text-[#86D0EF] border-b-2 border-[#86D0EF] pb-1`, inactive gets `text-[#e3e2e2] hover:text-[#86D0EF]`.
- Font: `font-['Space_Grotesk'] tracking-tighter uppercase text-sm font-bold`.

### Trailing actions
- Replace the `LocaleSwitcher` pill with a plain `account_circle` Material Symbol icon (same style as the search icon).
- Keep the search icon but remove its rounded-full border styling; use `text-[#e3e2e2] hover:text-[#86D0EF]`.

---

## 3. Hero Section — `src/components/home/Hero.tsx`

### Container
- Change `rounded-[28px]` → `rounded-sm` (0.125rem — nearly square corners per design system rule).
- Replace complex gradient/radial bg with: outer wrapper `px-0`, inner section gets `hero-gradient` (linear-gradient from surface-container to surface-container-high) + `ghost-border` (1px solid surface-variant `#343535`) + `glow-shadow`.
- The section should be `full-width` inside `max-w-[1920px] mx-auto px-6`, not capped at `max-w-7xl`.

### Status label
- Change color from `text-accent-primary` to `text-tertiary` (#e0c1a5).
- Status dot: change from the current `StatusDot` component to a plain `w-2 h-2 rounded-none bg-tertiary` square (no rounded corners — design system uses `rounded-none` for data points).

### CTA Buttons
- Primary button: `bg-secondary text-on-secondary` (cyan bg, dark text) + `shadow-[0_0_15px_rgba(134,208,239,0.3)]` + `rounded-sm`.
- Secondary/ghost button: `ghost-border text-white hover:bg-surface-variant hover:text-secondary` + `rounded-sm`.
- Icon inside primary button: `terminal` Material Symbol (replace lucide icons).

### Terminal Card (right column)
- Change terminal card background from `bg-black/20` to `bg-surface-container-lowest` (#0d0e0f).
- Bar chart at the bottom: bars should be rectangular (`rounded-none`), not `rounded-full`.
- Chart bars use `bg-secondary` and `bg-tertiary` — update from current gradient.

---

## 4. Live Stream Feed — `src/components/home/LiveStreamFeed.tsx`

- Remove the outer `rounded-[24px] border border-line bg-black/10 backdrop-blur-sm` panel wrapper — the stream items should render directly with no wrapping panel.
- The section heading should match stitch: `System_Output: <span class="text-secondary">Live Stream</span>`.
- Add a `border-b border-surface-variant` separator below the heading row.
- The streaming badge: use `material-symbols-outlined text-error animate-pulse` (radio_button_checked icon) inside a `bg-surface-container px-3 py-1.5 rounded-sm ghost-border` chip.

### EventBlock / NewsBlock cards (inside `LiveStreamFeed`)
- Event cards need a left accent stripe: `absolute left-0 top-0 w-1 h-full bg-secondary` (or `bg-tertiary` for tertiary events).
- Card background: `bg-surface-container rounded-sm` (not rounded-lg or rounded-[...]).
- Timestamp label: `text-secondary font-label text-xs`.
- Category badge: `bg-surface-container-highest px-3 py-1 text-tertiary rounded-sm font-bold`.

---

## 5. AuthTerminal — `src/components/home/AuthTerminal.tsx`

The stitch design shows a much richer terminal with auth metrics. Missing pieces:

- **Auth metrics block**: Add a `bg-surface-container-lowest p-5 rounded-sm ghost-border` section between the password input and the submit button showing:
  - "Connection Security: 99.9%" with a `bg-secondary` progress bar (full width, 1.5px height).
  - "Latency: 12ms" in `text-tertiary`.
- **Login button**: Change to `bg-surface-container-highest text-white border border-outline-variant hover:bg-secondary hover:text-on-secondary` style with `login` Material Symbol icon.
- **Terminal top bar**: Add dots row (error/tertiary/secondary colored 3px circles) + `Auth_Terminal_v2.4` label in `bg-surface-container-highest px-2 py-1 rounded-sm`.
- **Footer link**: "Request Access Protocol" in `text-secondary underline`.

---

## 6. Arrangementer Page — `src/components/events/EventFiltersSidebar.tsx`

The filter sidebar needs to look like a code block:

- Outer container: `bg-surface-container rounded-sm p-6` (no ghost-border pill on the whole box).
- Top label: `const filterParams = {` in font-mono with `text-secondary` for the `const` keyword.
- Category labels: `"type": [` in `text-tertiary font-mono`.
- Checkbox/radio inputs: `bg-surface-container-highest border-none text-secondary rounded-sm`.
- Bottom: `};` closing brace in font-mono.
- Filter button: `bg-secondary text-on-secondary font-mono font-bold py-3 rounded-sm` with `terminal` icon.

### EventListItem — `src/components/events/EventListItem.tsx`

- Left metadata sidebar: `md:w-48 flex-shrink-0 border-l-2 border-secondary` (using `border-secondary`/`border-tertiary` for color variation — currently uses `border-line`).
- Metadata labels: `text-on-surface-variant text-xs font-mono uppercase`.
- Metadata values: `text-primary text-sm font-mono` (not `text-neutral`).
- Event type badge: `font-mono text-xs text-secondary bg-surface-container-highest px-2 py-1 rounded-sm ghost-border` inline style.
- Footer row (location/capacity): `bg-surface-container-lowest p-4 rounded-sm font-mono text-xs text-on-surface-variant`.
- Register button: `ghost-border px-4 py-1.5 hover:bg-surface-tint transition-colors text-primary` (plain, no solid fill).

---

## 7. Om oss Page Components

### VisionDict — `src/components/about/VisionDict.tsx`
- Outer container: `bg-surface-container-highest p-8 rounded-sm font-label text-sm border border-outline-variant/15 shadow-[0_4px_40px_rgba(0,0,0,0.5)]`.
- Add `// INIT_SEQ_01` label in top-right corner `absolute top-0 right-0 p-2 text-xs text-on-surface-variant opacity-50`.
- Hero heading above: `import sigma` in `text-secondary opacity-70` + `sigma.init()` in `text-tertiary`.

### EpochTimeline — `src/components/about/EpochTimeline.tsx`
- Timeline connector line: `border-l-2 border-surface-container` (not current color).
- Timeline nodes: `w-4 h-4 rounded-sm bg-surface-container-highest border-2 border-secondary` (square nodes, not circles).
- Current/active node: `bg-secondary animate-pulse`.
- Card background: `bg-surface-container-low p-4 rounded-sm border border-outline-variant/10`.

### NodeCard (Board members) — `src/components/about/NodeCard.tsx`
- Outer wrapper: `bg-surface-container p-1 rounded-sm` with `hover:shadow-[0_4px_40px_rgba(227,226,226,0.06)]`.
- Inner: `bg-surface-container-low h-full flex flex-col p-6 gap-4 border border-outline-variant/15`.
- Profile photo: `w-16 h-16 rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300` (grayscale by default, color on hover).
- Class badge: `font-label text-xs text-secondary bg-secondary/10 px-2 py-1 rounded-sm`.
- Stats footer: `border-t border-surface-container-highest pt-4` with font-label text-xs.

---

## 8. Footer — `src/components/layout/Footer.tsx`

- Background: `bg-surface-container` (not `bg-black/10`).
- Change max-width to `max-w-[1920px]`.
- Remove `rounded-full` from social link buttons; use plain text links: `font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#e3e2e2] hover:text-[#86D0EF] hover:-translate-y-0.5 transition-all`.
- Remove lucide icons from footer links (Camera, GitBranch, MessageSquare) — no icons in stitch footer.
- Copyright: `font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#E0C1A5] bg-[#E0C1A5]/10 px-3 py-1.5 rounded-sm border border-[#E0C1A5]/30 font-bold` badge style.
- Brand in footer: `font-['JetBrains_Mono'] text-sm text-[#86D0EF] tracking-wider font-bold` + tagline below in `text-[10px] uppercase`.

---

## 9. Matrix Background — `src/components/layout/GridBg.tsx`

The stitch uses a line-grid (crosshatch) for the background, not dots:

- Change from `radial-gradient(circle, ...)` dots to:
  ```css
  background-image: linear-gradient(#343535 1px, transparent 1px),
    linear-gradient(90deg, #343535 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.1;
  ```
- The grid should be `fixed inset-0 pointer-events-none z-0` (full-page overlay, not per-section).
- Hover state on data blocks should increase grid opacity from 0.1 to 0.12 (`.hover-matrix:hover`).

---

## 10. Typography & Font Loading — `src/app/layout.tsx`

Verify that all three required fonts are loaded:
- `Space Grotesk` (weights 500, 700) — for headlines and nav labels.
- `JetBrains Mono` (weights 400, 500, 700) — for all data labels, metrics, code.
- `Inter` (weights 400, 500, 600) — for long-form body text.
- `Material Symbols Outlined` — for icons (sensors, terminal, login, etc.).

The stitch uses `font-label` mapped to `JetBrains Mono` consistently for all metadata and labels. The current implementation maps `font-mono` which is correct if the variable is JetBrains Mono.

---

## 11. Border Radius System

Per DESIGN.md "Don't" rules: **no `rounded-full` or large radii anywhere in the UI.** The system uses:
- Default: `rounded-sm` (0.125rem) — nearly all interactive elements.
- `rounded-lg` (0.25rem) — larger cards.
- `rounded-xl` (0.5rem) — modals/overlays only.

**Current violations** (search codebase for these patterns):
- `rounded-[28px]` in Hero — change to `rounded-sm`.
- `rounded-[24px]` in LiveStreamFeed wrapper — remove the wrapper entirely.
- `rounded-full` in TopNavBar pills (nav links, search button) — change to `rounded-sm`.
- `rounded-full` in Footer social link chips — remove, use plain text.
- `rounded-full` in StatusDot, Badge components — change to `rounded-sm` or `rounded-none`.

---

## 12. SiteFrame / Layout wrapper — `src/components/layout/SiteFrame.tsx`

- The main content area `<main>` should use `max-w-[1920px]` not `max-w-7xl` for pages that need full-width layouts (hjem, arrangementer header).
- Ensure the matrix grid background is a `fixed` overlay at `z-0`, not scoped to individual sections.
