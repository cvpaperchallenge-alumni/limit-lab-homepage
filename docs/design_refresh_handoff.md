# LIMIT.Lab Homepage — Design Refresh Handoff

> **Status (2026-06-17, second pass):** Four PRs landed plus one in flight.
> - **#105** (design refresh foundation) — **merged into develop**
> - **#106** (Members card redesign with hover glow) — **merged into develop**
> - **#107** (Publications + Events card refresh) — **merged into develop**
> - **#108** (Recent News redesign: editorial cards + local-scroll ScrollArea) — **open, awaiting review/merge**
>
> All Section 6 polish items from the original handoff are resolved.
> Follow-up items #3 and #5 (News list polish, PaperOcean) are addressed in #108.
> Build + lint + format + visual QA (light/dark × mobile/tablet/desktop) all pass.

This document captures the modernization work done on `/Users/yoshihiro.fukuhara/Scratch/limit-lab-homepage` so a fresh session can pick up the work without re-deriving context.

---

## 1. Goal

Modernize the LIMIT.Lab homepage to match the look and feel of the sibling project `/Users/yoshihiro.fukuhara/Scratch/ECCV2026LIMIT` (a refined LIMIT-branded ECCV 2026 workshop site), while:

- Preserving the lab's signature brand assets: `VisualAtomDesign` (orbital atoms — echoes the logo), `PaperOceanDesign` (interactive image), and the animated grid background
- Preserving the dark-mode toggle
- Preserving all current content/data (members, news, publications, events)
- Preserving the existing filter logic on Publications and Events pages

---

## 2. Design Decisions (user-confirmed)

| Decision | Choice |
| --- | --- |
| Scope | All 4 pages + shared Header / Footer + every card surface |
| Brand assets | Keep & refine (atoms / paper-ocean / animated grid) |
| Palette | Blue-led with subtle gradients (matches logo, matches ECCV reference) |
| Preserve | Dark mode toggle, all content/data, all filter/sort logic |
| Hover language | Lift + brand-blue border + soft blue glow shadow + title color shift + image zoom (where applicable). The blue glow halo behind the hero atom is the visual anchor; cards echo it. |

Reference plan file: `/Users/yoshihiro.fukuhara/.claude/plans/mutable-drifting-pebble.md`

---

## 3. Core Visual Language

1. **Glassmorphism surfaces** — `.glass` and `.glass-strong` utilities (use `color-mix()` on `var(--background)` so they auto-theme; do **not** use `@apply bg-background/70` — the hex var doesn't support Tailwind opacity modifiers). Note: list cards now use the standard `border-border/40 + bg-background/40 + backdrop-blur-md` pattern instead of `.glass` to allow per-card hover tinting.
2. **Card hover lift** — `.card-hover` (`translateY(-4px)` + brand-tinted shadow on hover). Still used on the Top page's PaperOcean and News surfaces; list cards use bespoke hover styles (see Section 4).
3. **Gradient hero text** — `.gradient-text` (bg-clip-text linear-gradient from `--blue-12` → `--blue-9`)
4. **Section header pattern** — `h2` + `<div className="section-accent" />` (a 1×20rem rounded bar with blue gradient)
5. **Soft radial backdrop** — `.gradient-mesh` (low-opacity radial overlay using `--blue-9` and `--purple-9`)
6. **Container** — `container mx-auto w-full max-w-6xl space-y-12 (or 24) px-6 py-12 md:px-8`
7. **Sticky blurred header** — `fixed top-0 z-50 ... bg-background/70 backdrop-blur-xl`
8. **Modernized heading scale** in `@layer base` — h1 4xl→6xl, h2 3xl→5xl, h3 2xl→3xl, all `font-bold tracking-tight` with slight negative letter-spacing
9. **Card hover pattern (canonical)** — used on Members, Publications, Events cards:
   ```
   group relative ... border-border/40 bg-background/40 backdrop-blur-md
   transition-all duration-300
   hover:-translate-y-1 hover:border-brand-blue-a6 hover:bg-background/60
   hover:shadow-[0_18px_40px_-12px_var(--blue-a6)]
   ```
   Plus a top radial accent overlay (opacity-30 → 100 on hover) and an inline avatar/image glow halo using `radial-gradient(circle, var(--blue-a*) 0%, transparent 70%)` with `blur-2xl`.

---

## 4. Files Modified (across PR #105 → #106 → #107)

### `src/app/globals.css` (PR #105)
- Added `section[id] { scroll-margin-top: 6rem; }` (sticky-header offset)
- Added base heading scale (`h1`–`h6`, `font-bold tracking-tight`, larger sizes)
- Added `@layer utilities`: `.glass`, `.glass-strong`, `.card-hover`, `.gradient-text`, `.gradient-mesh`, `.section-accent`, `.fade-in-up`, `.scrollbar-hide`
- **Important:** `.glass` uses `color-mix(in srgb, var(--background) 70%, transparent)` instead of `@apply bg-background/70`. Tailwind v3 opacity modifiers don't work on hex CSS-var colors.

### `tailwind.config.ts` (PR #105)
- Added `brand-blue-{1–12, a1–a12}` and `brand-purple-{1, 9, 11, 12}` to `theme.extend.colors`
- **Important:** Use the `brand-` prefix. Do NOT use plain `blue`/`purple`/`gray` — overriding those would break Tailwind's default scales that the news tag colors (`bg-blue-100`, `bg-green-100`, etc.) depend on.

### `src/app/(homepage)/layout.tsx` (PR #105)
- Added a `.gradient-mesh` absolute overlay behind the animated grid
- Added `pt-24 sm:pt-28` to `<main>` to clear the now-sticky header

### `src/components/header.tsx` (PR #105)
- Sticky / glass / blur, simplified 4-link nav
- **Active state:** `bg-brand-blue-a4 font-semibold text-brand-blue-11` (clearly visible blue pill in both modes — replaces the original `bg-accent/60` which was nearly invisible)
- Kept sun/moon Switch theme toggle and mobile DropdownMenu

### `src/components/footer.tsx` (PR #105)
- 4-column grid: Brand blurb / Pages / Workshops / Supported by
- Workshop links hardcoded (ECCV 2026 LIMIT, CVPR 2026 VGI / BigMAC, ICCV 2025 LIMIT / FOUND)
- Preserved alumni + cvpaper.challenge logos in light/dark variants and their social rows

### `src/app/(homepage)/page.tsx` (PR #105 + #106 + #108)
- **Hero** (#105 + polish): gradient-text h1 with **no `<br />` tags** (natural wrapping); side-by-side layout switches at `lg:flex-row` (NOT `md:`) to avoid squeezing the copy column at tablet width; atom halo uses `var(--blue-a7)` for a more prominent glow.
- **Recent News (#108 redesign):** PaperOcean removed from the Top page; news promoted to a centered `max-w-3xl` single-column editorial list wrapped in a fixed-height (`h-[520px]`) Radix `ScrollArea` with `type="always"` (always-visible scrollbar) plus a bottom fade gradient hint. Each item is an `<article>` using the canonical hover pattern (border-glow + lift + top radial accent) with a monospace `<time>`, a `rounded-full` tag pill, and `fade-in-up` stagger (`animationDelay: index * 60ms`). The container height stays constant as news grows — the section never inflates the page.
- **Members (#106 redesign):** card uses canonical hover pattern from Section 3, plus:
  - Avatar bumped to `size-24/sm:size-28` with ring shifting to `ring-brand-blue-a9` on hover
  - Blue glow halo behind avatar (opacity 0 → 100 on hover) mirroring the hero atom
  - Top radial accent overlay (`var(--blue-a4)`)
  - Name color shift to `text-brand-blue-11` on hover
  - Social icons converted to `size-8 rounded-full` pill chips with `hover:bg-brand-blue-a4 hover:text-brand-blue-11 hover:scale-110`

### `src/app/(homepage)/publications/page.tsx` (PR #105 + #107)
- Gradient h1 + `.section-accent` header
- Glass filter strip (Conference / Year / Field) — **filter logic preserved verbatim**
- **Article cards (#107 refresh):** canonical hover pattern, plus:
  - Image wrapped in `ring-1 ring-border/40` that shifts to `brand-blue-a6` on hover; image itself `scale-105` on hover
  - Title color shift to `text-brand-blue-11` on hover
  - Action buttons (`button-project` / `button-pdf` / `button-github`) keep brand color tokens but gain `hover:-translate-y-0.5 hover:shadow-md`
  - Top radial accent overlay (`var(--blue-a4)`)

### `src/app/(homepage)/events-reports/page.tsx` (PR #105 + #107)
- Mirrors Publications: gradient header → glass filter strip (Type / Year / Conference) → card grid using the canonical hover pattern with image zoom and title color shift
- Sort-by-date-desc preserved
- Calendar icon in the date row tinted `text-brand-blue-11`

### `src/app/(homepage)/contact/page.tsx` (PR #105)
- Gradient h1 + accent bar
- Single centered `glass-strong` panel with `.gradient-mesh` overlay
- Slack icon in a `bg-brand-blue-a4` rounded square + "Join Slack WG" button

---

## 5. Verification Status

| Check | Status |
| --- | --- |
| `npm run lint-check` | ✅ clean |
| `npm run format-check` | ✅ clean |
| `npm run build` | ✅ all 8 pages prerendered (Top, Publications, Events, Contact + 4 framework routes) |
| `npm run dev` smoke | ✅ all 4 routes return 200 |
| Visual QA (browser, light + dark, mobile/tablet/desktop) | ✅ 32+ screenshots captured via puppeteer-core + system Chrome; hero h1 wrapping, header active state, atom glow, Members hover halo, Publications/Events hover all verified |

Screenshot capture script: `/tmp/shoot.mjs`, `/tmp/shoot-hero.mjs`, `/tmp/shoot-members2.mjs`, `/tmp/shoot-cards.mjs` (all use `puppeteer-core` from `/tmp/node_modules/`, driving `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` via Chrome's headless mode; outputs to `/tmp/limit-screenshots/`).

---

## 6. Original Polish Items — All Resolved

The original Section 6 was a punch list of 8 things to verify. All resolved:

| # | Item | Resolution |
|---|---|---|
| 1 | Hero atom glow too subtle | Bumped `var(--blue-a5)` → `var(--blue-a7)` (PR #105 polish) |
| 2 | Glass contrast in dark mode | Verified fine, no change needed |
| 3 | Hero h1 line breaks (orphan "with", broken words at tablet) | Removed all `<br />` tags + moved side-by-side from `md:flex-row` to `lg:flex-row` (PR #105 polish) |
| 4 | News card hover bg works in className context | Verified |
| 5 | Header active state low contrast | Switched from `bg-accent/60` to `bg-brand-blue-a4 + font-semibold + text-brand-blue-11` (PR #105 polish) |
| 6 | Footer brand blurb wording | Confirmed matches |
| 7 | Workshop links hardcoded | Confirmed list matches current upstream |
| 8 | Stale `Card`/`CardContent` imports | No matches found, clean |

---

## 7. Important Gotchas (don't relearn these)

- **Don't `@apply bg-background/70`** — `--background` is a hex CSS var; Tailwind's `/<opacity>` modifier doesn't apply. Use `color-mix(in srgb, var(--background) X%, transparent)` in raw CSS instead. Same for any other hex CSS var. (In `className` context the opacity modifier *does* work, so e.g. `hover:bg-background/60` is fine inline.)
- **Don't add a top-level `blue`/`purple`/`gray` key under `theme.extend.colors`** — it overrides (not merges with) Tailwind's defaults, breaking `bg-blue-100` in the news tag color map. Use a `brand-` prefix.
- **`.glass` vs the new card pattern** — `.glass` is still defined and used on the Top page (PaperOcean wrapper, news list, filter strips). List cards (Members, Publications, Events) use the canonical hover pattern in Section 3 instead, because they need per-card border tinting on hover that the global `.glass` utility can't express cleanly.
- **The hero side-by-side layout switches at `lg:` (1024px), not `md:` (768px)**. Don't undo this — the copy column gets crushed at tablet width when the atom takes its share of a 768px row.
- **Don't reintroduce `<br />` in the hero h1**. Natural wrapping is intentional; the gradient text + the line-height handles it.
- **`Spinner`** is imported from `@/components/ui/spinner` (custom) — keep it; the loading spinner shows briefly while `next-themes` hydrates the dark-mode preference.
- **`isDarkMode` flicker on first paint:** header + footer wait on `resolvedTheme` before swapping logos. Don't simplify this without checking.
- **Local-scroll containers (`ScrollArea` + `type="always"` + bottom fade) — pattern from #108.** When a list section would otherwise grow unbounded (e.g., Recent News), wrap it in `<ScrollArea type="always" className="h-[NNNpx]">` so the scrollbar is visible even when idle (default Radix behavior only shows the scrollbar on hover/scroll, which on desktop hides the affordance entirely). Pair it with a `pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent` overlay so the last item visibly fades as content peeks beneath. Add `pr-4` on the inner content so cards don't visually collide with the scrollbar, and `pt-1 pb-2` so the hover lift transform doesn't clip at the container edges. Don't use `overflow-y-auto` directly — the Radix scrollbar styling matches the rest of the site (`bg-border` thumb) and behaves consistently in light/dark.
- **Button color tokens** (`button-project`, `button-pdf`, `button-github`) are intentionally reused for visual continuity with the previous design. They already use alpha-tinted backgrounds (`--{color}-a3/a4/a5`) so they look "outline-like" by default.
- **SSH to github.com timed out during this session.** If `git push`/`fetch` over SSH hangs, fall back to `git -c "credential.helper=!gh auth git-credential" push -u origin <branch>` (uses gh's HTTPS token). The remote URL can be set back to SSH afterward.
- **The screenshot harness uses `puppeteer-core` + system Chrome** (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) — no chromium download needed. `next-themes` is `defaultTheme="system"`, so seed `localStorage.setItem('theme', t)` before navigation (and call `emulateMediaFeatures` with `prefers-color-scheme`) to force light/dark for screenshots.

---

## 8. File Inventory

Modified across PRs #105 / #106 / #107 / #108:
- `src/app/globals.css` (#105)
- `tailwind.config.ts` (#105)
- `src/app/(homepage)/layout.tsx` (#105)
- `src/app/(homepage)/page.tsx` (#105 + #106 + #108 — hero polish, Members redesign, Recent News redesign)
- `src/app/(homepage)/publications/page.tsx` (#105 + #107)
- `src/app/(homepage)/events-reports/page.tsx` (#105 + #107)
- `src/app/(homepage)/contact/page.tsx` (#105)
- `src/components/header.tsx` (#105 — active-state contrast)
- `src/components/footer.tsx` (#105)

Untouched (intentionally reused):
- `src/components/visual-atom-design.tsx`
- `src/components/ui/*` (all shadcn primitives, including the Radix `ScrollArea` now used by Recent News)
- `src/data/*` (all data files)
- `src/app/layout.tsx` (root)

Now unused but kept for possible reuse:
- `src/components/paper-ocean-design.tsx` — removed from the Top page in #108; the file (and `public/paper-ocean.png`) remain in the repo in case the interactive piece is wanted elsewhere later.

---

## 9. PR Chain

| PR | Title | Status |
|---|---|---|
| [#105](https://github.com/cvpaperchallenge-alumni/limit-lab-homepage/pull/105) | feat: modernize design refresh across all pages | ✅ merged into develop (commit `6f1f3eb`) |
| [#106](https://github.com/cvpaperchallenge-alumni/limit-lab-homepage/pull/106) | feat: redesign Our Members cards with hover glow | ✅ merged into develop (commit `0bc8de1`) |
| [#107](https://github.com/cvpaperchallenge-alumni/limit-lab-homepage/pull/107) | feat: refresh Publications and Events & Reports cards | ✅ merged into develop (commit `5fb99d3`) |
| #108 | feat: redesign Recent News as scrollable editorial list | 🟡 open, branch `feat/refresh-recent-news`, awaiting review |

---

## 10. Possible Follow-ups (none committed, just ideas)

If a future session wants to keep polishing, candidates in roughly descending impact:

1. **Contact page feels minimal** — single Slack card centered on the page. Could add a contact-form glass panel beside it, or surface a few "ways to get involved" tiles (Slack / GitHub / Mailing list).
2. **Filter strips** (Publications / Events) are functional but visually plain compared to the new card style. Could borrow the canonical hover pattern (border-glow on focus) on the select triggers.
3. ~~**News list card** on the Top page hasn't been touched since #105.~~ — **Resolved in #108** (single-column editorial cards in a Radix `ScrollArea`).
4. **Hero CTA buttons** — currently shadcn default. Could match the new card-button hover style (lift + soft blue shadow + brand-blue tint) for unified motion.
5. ~~**PaperOcean wrapper card** on the Top page — pretty minimal.~~ — **Resolved in #108** (PaperOcean removed from the Top page; component kept in the repo for possible reuse elsewhere).
6. **Add subtle stagger/fade-in to card grids** — `.fade-in-up` exists but is only used on hero/page headers and the news list (#108). Applying it with a per-item delay (CSS `animation-delay`) to the Members/Publications/Events grids would feel more crafted.
7. **Decide PaperOcean's permanent home** — now that it's off the Top page, the interactive component is unused. Either find a more meaningful placement (its own brand/research page, or as a contact-page accent), or delete the file and `public/paper-ocean.png` outright.

---

## 11. Reference Project

`/Users/yoshihiro.fukuhara/Scratch/ECCV2026LIMIT` is the design source-of-truth. Most useful files:

- `src/app/app.css` — original `.glass`, `.card-hover`, `.gradient-text`, `.gradient-mesh` definitions (Tailwind v4 `@theme inline` syntax; we adapted for v3)
- `src/app/routes/Home.tsx` — section header pattern, hero pattern, speaker/organizer card hover usage (the image-zoom + ring-shift hover came from here)
- `src/components/header.tsx` — sticky blurred header pattern
- `src/components/footer.tsx` — multi-column footer pattern
