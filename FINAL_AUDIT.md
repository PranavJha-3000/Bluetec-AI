# Final audit

Scope: whole repo, final QA pass. Evidence for each fix is in `TEST_REPORT.md` and `VISUAL_PARITY.md`.

## Fixed in this pass
| # | Sev | Finding | Fix | Verified by |
|---|---|---|---|---|
| 1 | P0 | Enquiry form showed "Letter posted!" but sent nothing | Now says "This demo doesn't send messages yet" with WhatsApp/email links; `console.log` removed | Playwright form test |
| 2 | P0 | Four required docs missing, README wrong (said photos are hotlinked, no deploy/test info) | Wrote this file, `VISUAL_PARITY.md`, `TEST_REPORT.md`, `AI_USAGE.md`, new README; old plans moved to `docs/recon/` | files exist |
| 3 | P1 | Unused `lenis` and `motion` dependencies | `npm remove` | `package.json`, build passes |
| 4 | P1 | Roamer ran layout reads on every scroll event | One run per animation frame; resize handled; listeners cleaned up | tests, visual check |
| 5 | P1 | Dog flew off-screen on mobile and never visibly landed (hop was keyed to the footer top) | Hop now keyed to the basket's own position; verified landing at 390, 768, 1440 | 3 Playwright tests + screenshots |
| 6 | P1 | Static dog stayed on screen forever under reduced motion | Roamer hidden; basket pup stays | reduced-motion test |
| 7 | P0 | `/puppies` had 0.75 layout shift (grid only appeared after JS) | Grid server-rendered; URL filters applied after mount | Lighthouse CLS 0.75 to 0 |
| 8 | P1 | Home welcome-door scene had different art and +44px height | Rebuilt from the reference's rules (`.tph2-*`), scroll-driven door | height 1027 vs 1021 at 1440 |
| 9 | P1 | Contrast failure on the Dusk paragraph | Text opacity raised | Lighthouse a11y 96 to 100 |
| 10 | P1 | Thin tests (14) | 25 tests: console errors, FAQ, gallery, form, mobile menu, back/forward, keyboard, dog landing, reduced motion | `npx playwright test` |
| 11 | P2 | Scraped reference HTML/CSS tracked in git, scratch files in root | Untracked `recon/mascot`, deleted `*.tmp.*` scratch, ignore rules added | `git status` |

## Closed in the completion pass
| Item | Change | Evidence |
|---|---|---|
| `/puppies` performance | `Img` now uses `next/image` (resized AVIF/WebP) | Lighthouse `/puppies` perf 100, a11y 100, CLS 0 |
| No lint | ESLint 9 + `eslint-config-next`; `npm run lint` clean (TypeScript pinned to 6.x because typescript-eslint does not support 7) | `npx eslint src tests` exits 0 |
| /puppies cards shared one outline | Seeded per-card wash/ink shapes | visual check |
| Detail page 768 height, markers 2-4 | Numbered scrapbook sheets | 4412 vs 4490 at 768 |
| Page curtain | Ported from the reference CSS: plays on load, covers and lifts on internal navigation (capture-phase click, 4 s fail-safe, off under reduced motion) | Playwright curtain test |
| Smooth scroll | Small wheel lerp (0.1) on fine pointers, no library; touch/keyboard native | manual |
| Header | Hides on scroll down, returns on scroll up (reference `data-hidden`) | Playwright test |
| Phone dog | Reference "lane" mode: docked at x=-72px, out at x=205px for Paths/Passport/Night at 390 wide | Playwright test (values measured on the reference) |
| Mascot gaze | Eyes follow the mouse pointer | code only, not frame-compared |
| Link without text (a11y) | Gone-home strip falls back to breed | Lighthouse a11y 100 |

## Known gaps (not fixed)
1. Mascot woof/spin cues: the reference exposes no cue markers I could read, so only gaze, blink, ear twitch and the walk/hop/sit poses exist.
2. View Transitions API is not used: Next 16's `experimental.viewTransition` is not in the config types here; the curtain is the page transition. Native `startViewTransition` was not reproduced.
3. Smooth scroll is a small custom lerp, not Lenis; feel was not frame-compared with the reference.
4. Door scene: open angle at a given scroll not compared frame by frame.
5. JSON-LD uses `dangerouslySetInnerHTML` with static trusted data (escape `<` if data becomes dynamic).
6. WhatsApp number/email are the reference's placeholders. Media (65 MB) and saved reference data are committed.
7. Pixel-diff parity is by height/screenshots, not an automated visual-regression suite. 390px detail page is ~3% taller than the reference.

## Deployment status
**Deployed by the author to Vercel (reported by the author; I have not opened the deployed URL or compared its commit with `main`).** Latest pushed commit on `main` is the one to match. No env vars are needed. After deploy run `npx playwright test` with `baseURL` set to the deployed URL to confirm.

## Technical-interviewer view
| Area | Assessment |
|---|---|
| Visual accuracy | Home scenes transcribed from reference rules and close in height (hero, Meet, passport exact); inner pages rebuilt from reference DOM/CSS and within ~0-6% of reference height at 1440/768/390 (exceptions in `VISUAL_PARITY.md`). Per-pixel diff not automated. 8/10 overall |
| Motion fidelity | Scroll-driven doors, pinned Meet, stamps, walking dog with hop; mascot cues missing. 7/10 |
| Functionality | All routes, filters, gallery, FAQ, nav work and are tested; form is honestly a demo. 8/10 |
| Responsiveness | No overflow at 390/768/1440; mobile heights differ partly from a scrollbar artifact. 7/10 |
| Code quality | Typed, small components, no unused deps; one large `globals.css` of transcribed scene CSS. 7/10 |
| Accessibility | Lighthouse 98-100 on tested pages; screen readers and full keyboard flows not tested. 7/10 |
| Performance | Fine on `/`, `/faq`; `/puppies` limited by image sizes. 7/10 |
| Testing | 25 Playwright tests; no visual regression, no lint. 6/10 |
| Deployment | Build ready, not deployed. 4/10 until deployed |

These are my estimates from the evidence above, not measurements. What an interviewer will notice first: the shorter inner pages, no live URL, a 65 MB media folder, and a very long `globals.css`.
