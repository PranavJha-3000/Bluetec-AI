# Test report

Final run (this commit), Windows 11, Chromium via Playwright, production build served on :3100.

| Check | Command | Result |
|---|---|---|
| Type check | `npx tsc --noEmit` | clean |
| Production build | `npx next build` | succeeds, static routes + puppy pages prerendered |
| Playwright | `npx playwright test` | **25 passed, 0 failed** (about 30 s) |
| Dependency audit | `npm audit --omit=dev` | 0 vulnerabilities |
| Lint | — | **not run**: no ESLint config in the project |

## What the 25 tests cover (`tests/smoke.spec.ts`)
- 9 routes return 200 and show a heading; unknown route returns 404.
- No horizontal overflow on `/` at 390, 768, 1440.
- `/puppies?breed=pomeranian` shows 4 puppies; back/forward keeps the filter; refresh on a nested puppy URL works.
- No console or page errors across all 9 routes.
- FAQ search narrows the list and the accordion toggles.
- Puppy gallery "Next photo" changes the image.
- Enquiry form: required fields block submit; a valid submit shows "This demo doesn't send messages yet" and never "Letter posted".
- Mobile menu opens and navigates.
- Keyboard: Tab reaches a link/button/input.
- Roaming dog reaches the footer basket (`data-basket="in"`) at 390, 768, 1440.
- Reduced motion: no horizontal overflow, roaming dog hidden, basket pup visible.

## Lighthouse (headless Chromium, simulated mobile, production build, one run each, noisy)
| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 99 | 100 (after a contrast fix; 96 before) | 100 | 100 | 1.1 s | 0 |
| `/puppies` | 81-87 (60 before) | 98 | 100 | 100 | 4-5 s | 0 (0.75 before) |
| `/faq` | 99 | 100 | 100 | 100 | 0.9 s | 0 |

Lighthouse was run before the inner-page rebuilds (`/puppies`, `/faq`, 404 and others changed since) and was not re-run. `/puppies` was limited by unresized ~250 KB JPEG covers in plain `<img>` tags; converting `Img` to `next/image` would fix it and was not done. Other routes were not run through Lighthouse.

## Not covered
Pixel-diff regression (screenshots are manual, in `docs/parity-shots/`); animation frame checks beyond the dog landing; Firefox/WebKit; real touch devices; the deployed URL (deployed by the author; not tested by me); screen-reader testing; keyboard use of the gallery and form beyond one Tab check.
