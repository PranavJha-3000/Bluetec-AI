# IMPLEMENTATION_PLAN (awaiting your approval — nothing implemented)

Time budget: 48h assignment. Order = highest fidelity-per-hour first; risky motion last. Each phase ends with a Playwright parity check against the reference.

## Phase 0 — Close recon gaps (≈1.5h)
- Get REA working if you approve (see questions) and/or read `04u0_mknmf3rz.js` (Lenis + canvas), `3umdxiosfhr4i.js` (view transition + forms), `2pig6dvmm0b07.js` to nail mascot/canvas/curtain rules.
- Extract the 27 gone-home puppy records + media from each detail page's RSC payload; read 404 copy; capture hover/focus states; form validation messages (client-side only, no live submit).

## Phase 1 — Foundation (≈3h)
Next + TS + Tailwind v4 scaffold; tokens (`@theme`), fonts, global CSS (cursor, scrollbar, selection), layout shell (Header, MobileMenu, BottomBar, Footer, SkipLink), data files from `recon/data`, UI primitives (Button, Pill, Tag, TapedCard…), SEO plumbing (metadata, sitemap, robots, icons, JSON-LD).

## Phase 2 — Inner pages (≈10h) — best fidelity/effort
`/faq` → `/contact` (form UI + server action) → `/how-it-works` (tabs) → `/puppies` (filters, URL sync, empty state) → `/puppies/[slug]` (gallery, enquiry, variants, prev/next) → `/gone-home` → `/happy-families` (+ lightbox) → 404.

## Phase 3 — Home scenes, static first (≈10h)
Hero → Meet (doors) → Paths → Chat (static phone) → Passport → Dusk → Night → Welcome-home. Inline SVG mascot poses/illustrations (largest manual effort). Get layout/colours pixel-close at 1440/390.

## Phase 4 — Motion (≈10h)
In-view reveals, door open, chat sequence + scroll-pinned steps, sunset/stars, hover/press states, Lenis, page curtain (+ view transition if time), polaroid/ticket micro-motion.

## Phase 5 — Mascot layer & canvas (≈5h, cut-able)
**Placeholder estimate** — the cursor paw-trail canvas is fully understood (source read, ~1h). The roaming `pup-actor` rules are not (read the rest of `04u0_mknmf3rz.js` in Phase 0 first, then re-estimate). Gate on reduced-motion/pointer. If behind schedule ship static mascot per scene + paw trail only.

## Phase 6 — QA & polish (≈6h)
Parity diffs per section/width, interaction + a11y suites, Lighthouse, cleanup (remove `recon/screenshots` from repo), README with run/test instructions.

## Priorities if time runs short
P0: shell, all routes with real data, filters, detail, forms UI, SEO, responsive layout (header switch at 1024px, bottom bar <768px). P1: home scene art + sticky scroll scenes (Meet horizontal track, Chat), lightbox, tabs/accordion, FAQ search. P2: curtain, view transitions, roaming mascot, paw trail.

**Schedule:** phase estimates sum to ≈45h of the 48h window. **Cut line:** if Phase 3 isn't done by hour ~26, drop Phase 5 and the view-transition part of Phase 4. **Reserve the last 3h** for submission (README, repo cleanup, deploy/preview check) — no new features after that.
Note: the Meet scene (sticky horizontal track) and Phase 3/4 split — build its layout and scroll mapping together, not as "static first".

## Risks
1. Mascot/canvas behaviour unread (largest estimate risk). 2. Illustration volume (109 inline SVGs on home). 3. Asset rights. 4. Form backend undefined. 5. Pixel diffs need freezing animations; fonts identical (same Google fonts) helps.

## Decisions I need from you
1. **Rights/lane**: the reference is the agency's/brand's site (its robots.txt says `ai-train=no` and blocks AI crawlers). Is recreating it (copy, photos of real customers, logo) explicitly permitted by Blutec for this assignment? If not, I'll do a reference build with placeholder imagery/own brand. (Skill `clone-website` requires this to be settled.)
2. **REA**: OK to run `npx rea-agents setup` (edits Claude MCP config; installs from npm)? Or skip REA — recon already works with curl+Playwright?
3. **Contact data**: keep the reference's placeholder links (WhatsApp `919898124987`, `instabizweb.com`, `+971 50 000 0000`) verbatim, or replace with neutral placeholders?
4. **Form backend**: log-only server action, email (Resend), or just WhatsApp deep-link?
5. **Stack**: Next.js 15/16 + Tailwind v4 as proposed (matches reference), or something simpler (Vite+React)?
6. **CSS**: re-author styles (recommended) vs. port the compiled `tp-*` CSS.
7. Include the two junk slugs (`/puppies/puppy`, `/puppies/maltipo`)? **Default: include them for parity.**
8. Ship scope for Phase 5 (mascot/canvas): full, simplified, or skip?
