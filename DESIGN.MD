# Design System Strategy: Sigma Core Neural

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Neural Architect."** 

We are moving away from standard web components toward a "System Interface" aesthetic. The design should feel like a custom-built environment for data scientists—precise, data-dense, and technically sophisticated.

## 2. Visual Language

### A. Typography
- **Headlines:** *Space Grotesk* (Bold, Tracking -0.05). High-impact, modern, and slightly industrial.
- **Body & Metadata:** *JetBrains Mono*. Used for all technical details, logs, and data-heavy sections to reinforce the "code-first" feel.
- **Casing:** Frequent use of `UPPERCASE` and `snake_case` for labels and headers to mimic programming conventions.

### B. Color Palette
- **Primary:** `#33313B` (Deep Charcoal) - The "Editor Background."
- **Highlight A:** `#4592AF` (Neural Blue) - Used for primary actions and "Success" states.
- **Highlight B:** `#E3C4A8` (Sand/Papyrus) - A warm accent for secondary data points and warnings, providing high contrast against the dark base.
- **Neutral:** `#F6F5F5` (Off-White) - Used sparingly for high-readability text blocks.

### C. Surface & Texture
- **The Grid:** A persistent 24px dot-grid background across all pages to ground elements in a coordinate system.
- **Glassmorphism:** Use of low-opacity overlays (`bg-white/5` or `bg-black/20`) with heavy backdrop blurs to create depth.
- **Borders:** Thin, 1px borders (`border-white/10`) to define "modules" without adding visual bulk.

## 3. Component Philosophy
- **The "Terminal" Card:** News and event items are styled with title bars and window controls (Red/Yellow/Green dots).
- **Buttons as "Functions":** Hover states should feel like active code selection, often using a "glitch" or "instant-swap" transition.
- **Iconography:** Minimalist, outline icons (Material Symbols) related to sensors, data, and connectivity.

## 4. Brand Integration (The σ Logo)
The "Small Sigma" (σ) is the core identifier. It should always appear in a monoline, technical style, often accompanied by a version string (e.g., `BUILD_VER: 2.4.0-STABLE`) to reinforce the system-level aesthetic.