# LIMIT.Lab Homepage — Current State and Backlog

> **Snapshot: 2026-08-30.** `main` = `7b956a7` (PR #123, released and deployed to limitlab.xyz).
> `develop` and `main` are in sync.
>
> This document is the forward-looking handoff. `design_refresh_handoff.md` is the
> historical record of the #105–#108 design refresh and is partly out of date —
> see [Corrections](#corrections-to-design_refresh_handoffmd) at the end.

---

## 1. Open production issue (P0)

**Three of the four pages return HTTP 403 when requested directly.**

```
https://limitlab.xyz/                     200
https://limitlab.xyz/publications/        403  AccessDenied (S3 XML)
https://limitlab.xyz/events-reports/      403
https://limitlab.xyz/contact/             403
https://limitlab.xyz/publications/index.html   200   <- the file is there
```

Same on `dev.limitlab.xyz`.

**Cause.** `terraform/modules/s3_cloudfront/main.tf` sets `default_root_object = "index.html"`,
which CloudFront applies **only to the distribution root**. A request for `/publications/`
is sent to S3 as the key `publications/`, which does not exist; the bucket policy denies
`ListBucket`, so S3 answers 403 rather than 404. There is no CloudFront Function,
Lambda@Edge, or `custom_error_response` to rewrite subdirectory paths — the 403 error
response block exists but is commented out (main.tf lines 94–99).

**Not caused by the 2026-08-30 release.** `next.config.ts` (`output: 'export'`,
`trailingSlash: true`) and everything under `terraform/` are byte-identical between
`f1aa13d` (previous `main`) and `7b956a7`.

**Why it went unnoticed.** Next.js client-side routing handles in-site navigation, so a
visitor who lands on `/` and clicks through never issues a server request for
`/publications/`. Only direct links, refreshes, bookmarks, and crawlers hit it.

**This now matters more than it did.** PR #119 added `sitemap.xml`, which advertises all
four URLs to search engines — three of which currently 403. Shared links to sub-pages also
fail. Fixing this should come before any further SEO work.

**Fix.** A CloudFront Function on `viewer-request` that appends `index.html` to URIs
ending in `/` (and handles extensionless paths), attached via `function_association` in
the `s3_cloudfront` module. This is terraform work, not site code.

---

## 2. Backlog

Each item below was verified against the codebase; the evidence is included so it does not
need re-deriving. Ordered roughly by value over effort.

### 2.1 Asset weight — about 1.1 MB recoverable

`next.config.ts` sets `images: { unoptimized: true }`. **This is required by
`output: 'export'` and cannot be removed** — there is no image optimization server behind
the S3/CloudFront setup. The fix is therefore to regenerate the source assets at sensible
sizes, not to change configuration.

**First-load images on the Top page total 399 KB, all of it logos:**

| File | Intrinsic | Bytes | Rendered at |
| --- | --- | ---: | --- |
| `limitlab-logo-black-wide.png` | 1495×484 | 174 KB | 48–64 px tall |
| `alumni-logo-with-wide-black.png` | 1088×414 | 188 KB | 40 px tall |
| `cvpaper-logo-black.png` | 484×484 | 47 KB | 40 px tall |

Dark mode loads the `-white` variants (365 KB total). Regenerating at 2–3× the rendered
size should land around 30–50 KB.

**A 1080×1080 PNG is used as a 32 px icon.** `src/components/ui/dropdown-menu.tsx`
lines 10–11 and 140–146 use `visual_atoms_1_black.png` (489 KB) / `_white.png` (268 KB) as
the selected-item marker in the mobile menu — 757 KB downloaded the moment a phone user
opens the hamburger. A 64×64 export would be ~10 KB.

**565 KB is referenced from nowhere** (grep over `src/` returns zero hits):

| File | Bytes | Note |
| --- | ---: | --- |
| `paper-ocean.png` | 354 KB | Only `paper-ocean-design.tsx` references it, and that component is imported by nothing (removed from the Top page in #108) |
| `limitlab-logo-black.png` / `-white.png` | 207 KB | Square variants; header and footer use `-wide` |
| `next.svg` `vercel.svg` `file.svg` `globe.svg` `window.svg` | 3 KB | `create-next-app` leftovers |

`output: 'export'` copies all of `public/` into `out/` regardless of references, so these
are deployed. **Decision needed:** whether `paper-ocean-design.tsx` should be deleted or
given a home — flagged as unresolved since #108.

### 2.2 Background animation and reduced motion

The compiled CSS contains:

```css
.simple-grid { animation: simple-grid 1s linear infinite; background-size: 20px 20px }
@keyframes simple-grid { 0% { background-position: 0 0 } to { background-position: 20px 20px } }
```

The grid cell is 20 px and it travels 20 px per second, diagonally, forever, on the
full-viewport element in `src/app/(homepage)/layout.tsx`. Every page repaints continuously
for the whole visit. **`prefers-reduced-motion` appears nowhere in the repository**, so
there is no way to stop it.

**Decision needed:** stop it entirely / slow it to ~60 s (recommended — keeps the brand
motion, removes the cost) / keep as-is. Either way add:

```css
@media (prefers-reduced-motion: reduce) {
  .simple-grid, .fade-in-up { animation: none; }
}
```

**Related dead code.** `layout.tsx` applies `bg-animated simple-grid` together, but
`.bg-animated` (globals.css line 29) is defined *before* `.simple-grid` (line 34) at equal
specificity, so `.simple-grid` wins both `animation` and `background-size`. The
`.bg-animated` rule and its `@keyframes` never apply. Remove them in the same change.

### 2.3 Accessibility

**Theme toggle has no accessible name.** `src/components/header.tsx` line 101: the
`Switch` has `id="theme-mode"` but no `<label>` and no `aria-label`. The flanking sun/moon
icons are decorative and convey nothing to assistive technology. Screen readers announce
only "switch". Fix: `aria-label`, plus `aria-hidden="true"` on the icons.

**Mobile navigation is not links.** `header.tsx` lines 132–142 use
`DropdownMenuRadioItem` with `onClick={() => router.push(...)}`. No `<a href>` exists, so
⌘-click and middle-click do nothing, "copy link address" is unavailable, and crawlers
cannot follow the mobile menu. The desktop nav (line 76) correctly uses `<Link>`. Fix:
wrap the item content in `<Link>` and drop `router.push`.

### 2.4 List pages: no search, and no empty state

Publications (11 entries) and Events & Reports (10) offer three dropdowns and no free-text
search — no way to find a paper by author or keyword. Publications grew 8 → 11 this year.

Separately, when a filter combination matches nothing, `filteredPublications.map(...)`
renders an empty array and **the page shows nothing at all** — no "no results" message.
That reads as broken and is worth fixing on its own, independent of search.

Proposed: add an `Input` (already in `src/components/ui/`), match on title + authors,
show a result count, and add an empty state with a clear-filters action.

### 2.5 Hero copy length

`src/app/(homepage)/page.tsx` lines 68–82 is a single 106-word paragraph, and the
"Upcoming Events" buttons sit *below* it — the primary call to action is buried under the
longest block of text on the page.

**Decision needed:** trim the hero to its first two sentences and move the rest into an
About section (recommended) / put it behind a "Read more" disclosure / leave the text and
move the buttons above it. Any rewording should be reviewed by a human — the wording is
the lab's positioning statement.

### 2.6 Contact page

`contact/page.tsx` is a heading plus one Slack card. Other channels (GitHub org, X,
cvpaper.challenge) exist only in the footer.

**Decision needed:** which channels are the official contact points. **No email address or
contact form exists anywhere in the repository** — whether to create a shared address,
route to an individual, or stay Slack-only is a call for the team, not something to infer.

---

## 3. Colour direction (decided 2026-08-30)

Recorded because it is a judgement call that the code alone does not explain.

Blue was **not** introduced by the design refresh: `--orbit: var(--blue-8)`,
`--particle-glow`, `--icon-accent`, and the `--blue-1`/`--blue-2` page gradient are all
present on the pre-refresh `main`, byte-identical. The atom visual has always been blue.
What the refresh changed was the *area* blue covered.

Measured on the Top page, light mode, identical viewport, pixels bucketed by chroma:

| | tinted % (chroma ≥ 10) | coloured % (≥ 30) | cool cast (B − R) |
| --- | ---: | ---: | ---: |
| pre-refresh `main` | 0.9 | 0.3 | +2.5 |
| peak (before #121) | 31.3 | 4.2 | +10.1 |
| after #121 + #122 | 3.8 | 1.2 | +3.3 |

**The decision:** blue stays as an accent (atom, nav active state, links, card hover
borders and glows, `.section-accent`), not as a surface tint. Rationale: blue-gradient
glass surfaces are the default visual language of AI product landing pages, which sits
awkwardly with a collective whose stated purpose is to counter resource-dominant
institutions; and the restraint matches how peer research groups present themselves.

**The logo is not blue.** The dark pixels of `limitlab-logo-black-wide.png` measure
RGB(36, 25, 23) — R > G > B, a faintly warm near-black, median chroma 8/255.
`visual_atoms_1_black.png` is pure greyscale. Any future claim that the palette "matches
the logo" should be checked against this.

Left over from #121/#122, safe to clean up: `.gradient-text` is still defined in
`globals.css` but used by nothing, and `brand-purple-{1,9,11,12}` in `tailwind.config.ts`
lost its last consumer when `.gradient-mesh` was removed. The `--purple-*` CSS variables
are still live — `--badge-type` uses them for the Publications "Field" badge.

---

## 4. Working notes (things that cost time to rediscover)

**Never run `npm run build` while a dev server is running.** `next dev` and `next build`
share `.next/`. Building over a live dev server overwrites its manifests and chunks and the
running server starts returning Internal Server Error. Check first:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

**To build without disturbing a running dev server,** use a detached worktree with its own
`.next`:

```bash
git worktree add --detach /tmp/build <ref>
ln -s "$PWD/node_modules" /tmp/build/node_modules
cd /tmp/build && npm run build
```

`next build` tolerates the symlinked `node_modules`; `next dev --turbopack` rejects it
("Symlink node_modules is invalid"), so serve `out/` with `python3 -m http.server` if you
need a second running site.

**`next dev` caches metadata per route and will show stale tags.** After changing shared
metadata code, `/publications/` updated while `/events-reports/` and `/contact/` kept
serving the previous `og:*` tags, and touching the files did not invalidate it. Verify
metadata against a production build, never against dev.

**Next.js merges metadata per top-level key, not deeply.** A page that sets `openGraph`
*replaces* the root layout's object — it does not extend it. Losing `og:image` and having
`twitter:card` silently fall back to `summary` is the usual symptom. Use
`pageMetadata()` in `src/lib/site.ts`, which restates `type`, `siteName`, `locale`,
`images` and `card` for exactly this reason.

**Forcing a colour scheme in headless Chrome** (there is no puppeteer in this repo):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --virtual-time-budget=12000 \
  --blink-settings=preferredColorScheme=0 \   # 0 = dark, 1 = light
  --window-size=1280,1000 --screenshot=out.png http://localhost:3000/
```

Do not pass `--user-data-dir`; it made the run hang. Very tall `--window-size` values
(7000+) also hang.

**Deploys are manual.** `site-deploy-prod.yaml` and `site-deploy-dev.yaml` are
`workflow_dispatch` only, and no workflow triggers on push to any branch. Merging to `main`
publishes nothing until someone runs **site-deploy-prod**.

---

## Corrections to `design_refresh_handoff.md`

That document is accurate about the #105–#108 work but has drifted:

| Claim | Reality |
| --- | --- |
| §2: palette is "blue-led ... (matches logo...)" | The logo contains no blue — see §3 above. The other stated reason, matching the ECCV 2026 LIMIT site, is correct. |
| §4: footer is a "4-column grid: Brand / Pages / Workshops / Supported by" | 3 columns. The Workshops column was removed in `feat/cleanup-footer` (#110). |
| §7 gotchas: "header + footer wait on `resolvedTheme`" | Was true of the header only; the footer used `theme` and rendered black logos in dark mode until #117 fixed it. Now accurate. |
| §3, §4, §11: `.gradient-mesh` | Removed entirely in #122. |
| §10 item 7: PaperOcean placement "to decide" | Still undecided. See §2.1 above. |
