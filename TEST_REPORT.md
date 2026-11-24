# Test report

Final run (this commit), Windows 11, Chromium via Playwright, production build served on :3100.

| Check | Command | Result |
|---|---|---|
| Type check | `npx tsc --noEmit` | clean |
| Production build | `npx next build` | succeeds, static routes + puppy pages prerendered |
| Playwright | `npx playwright test` | **30 passed, 0 failed** (about 27 s) |
| Dependency audit | `npm audit --omit=dev` | 0 vulnerabilities |
| Lint | `npx eslint src tests` | clean (0 errors, 0 warnings) |

## What the 30 tests cover (`tests/smoke.spec.ts`)
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
- Curtain: idle after load; covers then lifts around an internal navigation.
- Header hides on scroll down and returns on scroll up.
- Phone (390): dog docked at x=-72 and out at x=205 for the Paths scene.
- Tapping the roaming dog cycles jump/woof acts with a speech bubble; `pup:cue` speaks.
- Wheel smoothing eases out (not a jump) and lands near 86% of the delta.
- Reduced motion: no horizontal overflow, roaming dog hidden, basket pup visible.

## Lighthouse (headless Chromium, production build, one run each, re-run after the final changes)
| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 1.1 s | 0 |
| `/puppies` | 100 | 100 | n/r | n/r | 1.1 s | 0 |
| `/faq` | 100 | 100 | 100 | 100 | 1.1 s | 0 |

(n/r = not re-run for that category after the last fix; it was 100 just before.) `/puppies` improved from 81-87 after `Img` moved to `next/image`. Other routes were not run. Lighthouse here uses the default throttling and is a diagnostic, not a guarantee.

## Not covered
Pixel-diff regression (screenshots are manual, in `docs/parity-shots/`); animation frame checks beyond the dog landing; Firefox/WebKit; real touch devices; the deployed URL (deployed by the author; not tested by me); screen-reader testing; keyboard use of the gallery and form beyond one Tab check.
