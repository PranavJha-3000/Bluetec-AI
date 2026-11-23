# TeddyPups U.A.E. — rebuild

Next.js 16 (App Router) + TypeScript + Tailwind v4. No backend; the contact form is log-only. Photos are hotlinked from the reference origin.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm test           # Playwright smoke tests (builds, serves on :3100)
```

Docs: `REFERENCE_AUDIT.md`, `ARCHITECTURE_PLAN.md`, `IMPLEMENTATION_PLAN.md`, `FUNCTIONALITY_CHECKLIST.md`, `ASSET_MANIFEST.md`, `HOME_PLAN.md`.

Known gaps: no pixel diff yet; Meet fallback height is exact at 1440 only; `/puppies` "where" filter differs from the reference; gone-home origins are guessed.
