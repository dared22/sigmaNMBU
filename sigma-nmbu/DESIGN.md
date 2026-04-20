# Design System: The Analytical Editor

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Analytical Editor."**

We are moving away from the generic "Dashboard" aesthetic and toward a high-fidelity environment that feels like a premium, specialized IDE for high-level AI research. The goal is to blend the raw, logical structure of a **Jupyter Notebook** with the sophisticated precision of a **High-Fidelity Compiler**.

This system breaks the "template" look by treating the interface as a series of **Data Blocks** and **Modules**. We utilize intentional asymmetry—where technical metadata might sit far-right while core content is centered—and high-contrast typography scales to create a rhythmic, editorial flow. The UI should feel like it is "calculating" in real-time, providing a sense of depth through tonal layering rather than physical boundaries.

---

## 2. Colors & Surface Logic

Our palette is rooted in deep obsidian and charcoal, accented by technical cyans and organic sands.

### Token Reference

| Token | Value | Role |
|---|---|---|
| `background` | `#121414` | Page foundation |
| `surface-container-lowest` | `#0d0e0f` | Inset data cells, code blocks |
| `surface-container-low` | `#1a1c1c` | Subtle raised areas |
| `surface-container` | `#1e2020` | Standard modules / nav |
| `surface-container-high` | `#292a2a` | Interactive hover state |
| `surface-container-highest` | `#343535` | Data cell highlights, inputs |
| `surface-variant` | `#343535` | Border via background shift |
| `primary` | `#c9c4d1` | Lavender-gray, editorial text |
| `primary-container` | `#33313b` | Hero metallic gradient end |
| `secondary` | `#86d0ef` | Cyan — main interactive accent |
| `on-secondary` | `#003545` | Text on filled secondary buttons |
| `tertiary` | `#e0c1a5` | Warm sand — constants/values |
| `outline-variant` | `#48464b` | Ghost borders (at 15% opacity) |
| `on-surface` | `#e3e2e2` | Default text on dark surfaces |
| `error` | `#ffb4ab` | Error / live indicator |

### The "No-Line" Rule

**Designers are prohibited from using 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts.
- Use `surface-container-low` for the main canvas.
- Use `surface-container-high` for interactive modules.
- Use `surface-container-lowest` to "inset" data visualizations or code snippets.

### The "Glass & Gradient" Rule

- For floating elements (tooltips, dropdowns): `surface-variant` at 60% opacity + `backdrop-filter: blur(12px)`.
- Hero sections: subtle `linear-gradient` from `primary` to `primary-container` at 15% opacity for a "metallic sheen."

---

## 3. Typography: The Logic of Print

We use typography to distinguish between "Human Insight" and "Machine Logic."

| Role | Font | Usage |
|---|---|---|
| Display / Headlines | **Space Grotesk** (500, 700) | Hero numbers, module titles — the "Editorial" voice |
| Technical Data / Labels | **JetBrains Mono** (400, 500, 700) | Metrics, code, metadata, timestamps — the "Compiler" voice |
| Body | **Inter** (400, 500, 600) | Long-form explanatory text |
| Icons | **Material Symbols Outlined** | Vector-style icons only (sensors, terminal, login, commit, group_work) |

### Font mapping (Tailwind)

```js
fontFamily: {
  headline: ['Space Grotesk', 'sans-serif'],
  body:     ['Inter', 'sans-serif'],
  label:    ['JetBrains Mono', 'monospace'],
}
```

### Micro-copy Motif

Use technical jargon to reinforce the DS/ML theme:
- Instead of "Loading" → "Training Model..." or "Optimizing Weights..."
- Instead of "Error" → "Gradient Divergence Detected"
- Instead of "Members" → "Active Nodes"
- Instead of "History" → "Training Log // Historie"
- Instead of "Board" → "Active Nodes // Hovedstyret"

---

## 4. Elevation & Depth

Depth is achieved through **Tonal Layering** and ambient light, never through harsh drop-shadows.

- **The Layering Principle**: Place a `surface-container-lowest` card on a `surface-container-low` section for a natural "recess."
- **Ambient Shadows**: For floating modules — `box-shadow: 0 0 40px 0 rgba(on-surface, 0.06)`. Feels like a soft glow.
- **The "Ghost Border" Fallback**: If a line separation is functionally required (e.g., dense data tables), use `outline-variant` at 15% opacity — never a solid 1px border.
- **Data Motifs**: A 24px fixed crosshatch grid overlaid on `background` layers at 5–12% opacity provides texture without clutter.

---

## 5. Components & Data Modules

### Buttons ("Execution" Variants)

- **Primary**: `bg-secondary text-on-secondary` (cyan fill, dark text) + `rounded-sm` + `shadow-[0_0_15px_rgba(134,208,239,0.3)]` glow.
- **Ghost**: `ghost-border text-white hover:bg-surface-variant hover:text-secondary` + `rounded-sm`.
- **Hover state**: `surface-tint` overlay at 8% opacity.

### Data Blocks (Cards)

- No divider lines inside cards. Separate sections using a `font-label text-xs` tag (e.g., `// MODULE_01`) + 32px vertical spacer.
- Left accent stripe: `absolute left-0 top-0 w-1 h-full bg-secondary` (or `bg-tertiary`).
- Bullets: 4px circles using `tertiary` color.

### Input Fields ("Parameter" Fields)

- **Default**: `bg-surface-container-highest border-none rounded-sm`.
- **Focus**: background transitions to `primary-container` + a `secondary` dot appears next to the label.
- Prefix `>` prompt character in `font-label text-sm font-bold`.

### Syntax Highlighting (within prose)

- **Variables / keywords**: `text-secondary` in JetBrains Mono.
- **Constants / values**: `text-tertiary` in JetBrains Mono.
- **Inline metric**: wrap in `font-label text-tertiary bg-tertiary/20 px-1 rounded-sm`.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts. Let a column of data sit off-center to create visual interest.
- **Do** use `JetBrains Mono` for any text that includes numbers, percentages, or units (e.g., "98.2% Accuracy").
- **Do** treat white space as "Computational Room." If a section feels crowded, increase the padding.
- **Do** use `sensors`, `terminal`, `commit`, `group_work` Material Symbol icons.

### Don't
- **Don't** use standard 1px borders for layout separation. Use a background color shift instead.
- **Don't** use `rounded-full` or large radii (e.g., `rounded-[28px]`). Stick to `rounded-sm` or `rounded-none`. Precision over softness.
- **Don't** use generic lucide icons where Material Symbols exist for the concept.
- **Don't** use pure black (`#000`) or pure white (`#FFF`). Always use the provided surface tokens.
- **Don't** use `max-w-7xl` for page-level wrappers — use `max-w-[1920px]` for full editorial width.

---

## 7. Signature Micro-Interactions

- **The "Compile" Load**: Page elements stagger in vertically (50ms delay each) as if a script is being executed line-by-line. (`animate-stream-in` with staggered delays.)
- **Hover Matrix**: When hovering a Data Block, the background crosshatch grid increases opacity from 5% to 12% (`.hover-matrix:hover`).
- **Active Nav Indicator**: `border-b-2 border-secondary` underline on the active nav link — no pill/chip.

---

## 8. Page-Level Layout Rules

### Hjem (Home)
- Hero: full-width `surface-container` gradient section, `min-h-[614px]`, `ghost-border`, `glow-shadow`.
- Below hero: `grid-cols-12` with `col-span-8` live stream + `col-span-4` sticky auth terminal.

### Arrangementer (Events)
- Full-width hero header with `SELECT * FROM Events` label.
- `sticky top-32` filter sidebar on the left with code-block style params.
- Event cards in main area with left `border-l-2` metadata sidebar.

### Om oss (About)
- Vision section: `import sigma / sigma.init()` heading + dict code block.
- Training Log: vertical timeline with square commit nodes, `border-l-2`.
- Board grid: 3-column, grayscale photos that color on hover.

### Navigation
- Brand: `sensors` icon + `SIGMA_DS_AI` in Space Grotesk bold + `tracking-widest`.
- Nav container: `bg-surface-container`, full-width, `border-b border-surface-variant`.
- Active link: flat text, `text-secondary border-b-2 border-secondary pb-1`.

### Footer
- 3-column grid: brand+tagline | copyright badge | social links.
- Social links: plain JetBrains Mono text, `hover:-translate-y-0.5 transition-all`.
- Copyright: `text-tertiary bg-tertiary/10 px-3 py-1.5 rounded-sm border border-tertiary/30` badge.
