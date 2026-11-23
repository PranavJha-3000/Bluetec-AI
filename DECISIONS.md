# Prompts and engineering decisions (Loom notes)

## Prompts that drove the work
1. Brief: recreate https://puppy.instabizweb.com/ with maximum visual fidelity, responsiveness and functional accuracy; use REA selectively; **first task reconnaissance only**, produce five docs, wait for approval.
2. Plan approval with 10 modifications: Next.js + TS + Tailwind v4, no backend/DB/extra deps; re-author CSS; keep agency placeholder contacts; log-only form; keep junk slugs `/puppies/puppy` and `/puppies/maltipo`; paw trail accurate, roaming mascot optional; priority route coverage > function > fidelity > responsive > decoration; small verifiable phases; Vercel early; reserve end buffer.
3. "Yes, build the home page" via subagent-driven development: fresh implementer per task, task review, fix loop, whole-branch review.
4. "Merge to main", "finish it", "complete those gaps" (self-host media, parity report, this log).

## Decisions
| Decision | Why | Cost if wrong |
|---|---|---|
| Next.js App Router, static (`generateStaticParams`, `dynamicParams=false`) | 55 prerendered pages, no server, trivial Vercel deploy | none |
| Data from the reference's RSC payload, trimmed to `src/data/*.json` | Exact copy and breeds, no scraping at runtime | stale if the reference changes |
| Media self-hosted in `public/media` (`scripts/fetch-media.mjs`, 67 MB) | Site survives the reference going down | larger repo |
| Form is log-only with a honeypot | No backend allowed; spam trap kept | submissions are not delivered |
| REA skipped | Needs Node >= 24.22.1, machine has 24.12.0; curl/Playwright recon sufficed | none for output |
| Hero: 6 arches + mascot | Screenshot shows 6; audit's "7" counted the mascot | easy tweak |
| Meet: sticky stage, one passive scroll listener, ~1.25px per px | Matches measured reference travel; grid fallback < 768px and reduced motion | CLS at 768/1024 (height exact at 1440 only) |
| Paw trail: canvas, fine pointer only, prints every 36px | Matches observed reference behaviour; zero cost on touch | none |
| No Lenis/motion in use, though listed in package.json | Native sticky is enough | unused deps could be removed |
| Fidelity gaps deferred: Paths art, Passport book spread, poodle mascot, curtain intro, roaming mascot | Priority order puts decoration last | home less faithful in those areas |
| `gone-home` origins guessed by breed regex | Reference does not expose origin | wrong filter results |
| `/puppies` "where" filter built as In Dubai / Imported | Reference audit differs (Everywhere / Imported / Korean Teacup) | filter mismatch |

## Process
Per-task review caught: wrong arch count, Meet resize/reduced-motion/focus bugs, hidden-but-focusable chat bubbles, paw toes joined by stray lines, unlayered `.btn` beating utilities, header pill wrapping. See git log on `feat/home`.
