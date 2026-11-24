# TeddyPups U.A.E. — rebuild of puppy.instabizweb.com

Next.js 16 (App Router) · TypeScript · Tailwind v4 · no backend · no animation libraries. Built for the Blutec AI assignment.

```
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm test             # Playwright: builds, serves on :3100, runs tests/smoke.spec.ts
```

## Structure
- `src/app/` — routes: `/`, `/puppies`, `/puppies/[slug]`, `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, 404, `sitemap`, `robots`.
- `src/components/home/` — home scenes (Hero, Paths, Meet, Chat, Passport, Dusk, Night, HomeDoor). `Roamer` is the one dog that walks with the scroll and hops into the footer basket; `rig.ts` is a port of the reference's mascot rig.
- `src/data/` — typed puppy, FAQ and media data, generated from the reference by `scripts/gen-data.mjs` (inputs in `recon/data`).
- `src/app/globals.css` — design tokens (`@theme`) and scene CSS transcribed from the reference's own rules (`.md-*`, `.tpw-*`, `.tpb-*`, `.tpn-*`, `.tph-*`, `.tph2-*`, `.tpf-*`).
- Scroll motion uses CSS `animation-timeline: view()`, `requestAnimationFrame`, and a canvas paw trail. `prefers-reduced-motion` gets static scenes.

## Behaviour notes
- The contact/enquiry form has **no backend**. After a valid submit it says "This demo doesn't send messages yet" and points to WhatsApp / email. Nothing is sent or logged.
- Filters are synced to the URL (`/puppies?breed=…`). Puppy pages have photo gallery and previous/next.
- WhatsApp number and email are the reference site's own placeholder contact details.

## Media rights
Photos, videos and illustrations in `public/media` and `public/brand` are the reference site's assets, used here with the owner's permission for this assignment. Saved reference CSS/HTML is not committed (`recon/` scratch is git-ignored).

## Docs
`FINAL_AUDIT.md` (findings and fixes) · `VISUAL_PARITY.md` (page-by-page comparison) · `TEST_REPORT.md` · `AI_USAGE.md` · `docs/recon/` (original reconnaissance and plans).

## Deployment
Standard Next.js build; no environment variables required (`NEXT_PUBLIC_SITE_URL` optionally overrides the canonical URL). **Not yet deployed** — see `FINAL_AUDIT.md`.

## Known gaps
Mascot cue choreography (gaze, woof, spin), mobile docked peek dog, curtain intro / smooth scroll / view transitions, and shorter inner pages than the reference. Details in `VISUAL_PARITY.md`.
