# Visual parity

Method: Playwright (Chromium) against https://puppy.instabizweb.com/ and the local build at 1440x900 and 390x844. Section heights and geometry come from `getBoundingClientRect`; the reference's own CSS and markup were dumped and transcribed (no guessed values). Screenshot pairs (ref / mine, after the fixes) are in `docs/parity-shots/`. REA was run on the reference bundle only as a module inventory, as it targets native/Electron apps.

Caveat for every height below: headless Chromium draws a 15px scrollbar on the reference, but not on this site. That shifts wrapping and grid column counts, so some height gaps are measurement artifacts (notably 390px Meet: ref 1 column, mine 2).

## Findings and status

| # | Section | Reference behaviour | Was | Measured gap (1440) | Sev | Fix | Status |
|---|---|---|---|---|---|---|---|
| 1 | Meet | Pinned track (translateX = -progress x travel), planks move with doors, door open at < 0.36 x viewport, floor-seated doors, 4126px tall | gap under doors, doors not revealing the image, small dog | height matched after fix (4126) | P0 | Rebuilt from reference rules (`.md-*`) | Done |
| 2 | Meet dog | Docked at 14vw, width clamp(11rem,min(14vw,24vh),14rem), walks on the spot | too small, wandering | n/a | P0 | Roamer pinned mode | Done |
| 3 | Paths | Signpost: post, two wooden arrow signs, awning window + skyline, dotted flight route with plane | two cards (different design) | 939 -> 1119 vs 1107 | P0 | Rebuilt (`.tpw-*`), showroom photo self-hosted | Done |
| 4 | Passport | Tilted open book, dotted page pattern, 4 scroll-in ink stamps, sunset skyline | cream cards | 688 -> 922 (exact) | P0 | Rebuilt (`.tpb-*`) | Done |
| 5 | Hero | min-height 100svh - header, lineup seats positioned by % and peek, quilt scallop edge, sunrise glow | stacked arches, 954px | 954 -> 824 (exact) | P0 | Rebuilt (`.tph-*`) | Done |
| 6 | Night FAQ | Sky gradient, 11 sparkle stars, 5fr/7fr grid, narrower answers, no in-section dog on desktop | flat colour, dots, second dog | 512 -> 582 vs 636 | P1 | Rebuilt (`.tpn-*`) | Done (remaining 54px is wrap difference from scrollbar) |
| 7 | Home (welcome door) | House scene: wood wall, arched doorway with scroll-driven door (`rotateY` 0 to -102deg, `view()` timeline), lamp, plants, mat, bowing dog | +44px, different art | 1065 -> 1027 vs 1021 | P1 | Rebuilt (`.tph2-*`) from the reference's computed rules | Done (mobile 978 vs 992) |
| 8 | Dusk | Street scene | -13px | 1562 vs 1575 | P2 | - | Open |
| 9 | Chat | - | -5px | 1692 vs 1697 | P2 | - | Open |
| 10 | Mascot extras | Gaze to cursor, woof, spin, hop, cue choreography, per-stop poses | sit/walk only | n/a | P1 | Rig ported; cues not | Open |
| 11 | Mobile dog | Large peeking dog docked bottom-left | walker | n/a | P2 | - | Open |
| 12 | Page-level motion | Curtain intro, Lenis smooth scroll, view transitions | absent | n/a | P2 | - | Open |
| 13 | Meet name weight | font-plush lighter weight | slightly bolder | n/a | P2 | - | Open |

## Verification
- `npx tsc --noEmit`: clean. Playwright smoke suite: 14/14 pass, including no horizontal overflow at 390/768/1440 (scene sections clip `overflow-x`, as the reference does).
- Section height comparison at 1440 (ref / mine): hero 824/824, meet 4126/4126, paths 1107/1119, chat 1697/1692, passport 922/922, dusk 1575/1562, night 636/582, home 1021/1065.
- Reduced motion: stamp-in, pinned Meet, plane route and card rise all fall back to static.

## Remaining discrepancies, ranked
1. (P1) Home welcome-door section +44px and its art differ from the reference scene.
2. (P1) Mascot cue choreography (gaze, woof, spin, hop) and per-scene seated dogs.
3. (P1) Night section 54px short at 1440 (scrollbar-driven wrapping; not re-verified with a matching scrollbar).
4. (P2) Mobile docked peek dog, curtain intro, smooth-scroll and view transitions.
5. (P2) Dusk/Chat few-pixel differences; Meet name font weight.
6. Hero puppy order inside the lineup is reference-seeded, but the reference reshuffles it at runtime; not replicated.

## Page-by-page (coarse, from `scripts/parity.mjs`)
Inner pages were rebuilt from the reference's DOM/CSS (Playwright dump, `tp-` classes renamed per page). Full-page heights, ours / reference, measured with `scrollHeight` against a production build; the coarse pixel-diff numbers from the earlier run are dropped because they predate the rebuild.

| Page | 1440 (ours / ref) | 390 (ours / ref) |
|---|---|---|
| /how-it-works | 4471 / 4544 | n/m |
| /gone-home | 3053 / 3071 | 7297 / 7253 |
| /contact | 1964 / 1956 | 3654 / 3580 |
| /faq | 2385 / 2383 | 3136 / 3088 |
| /happy-families | 8872 / 8793 | 10792 / 32337 |
| /puppies | 3851 / 3679 | 5948 / 5656 |
| /puppies/maltipoo-max-male | 3080 / 3277 | not re-measured |

Notes: the reference's /happy-families 390 height is a headless-capture artifact (its CSS `columns: 10.5rem 2` collapses to one column once a 15px scrollbar is subtracted); ours renders two columns. /puppies cards reuse one hand-drawn outline/wash shape instead of the reference's per-card shapes. /puppies/[slug] has the "Every Teddy Pup comes" and "Coming home from abroad" sections but not the reference's full header block. 404, home and 768px were not re-measured. n/m = not measured.

## Motion summary
| Scene | Mechanism | Reduced motion |
|---|---|---|
| Hero entrance | `tp-rise` keyframes, staggered `--i` | static |
| Meet | pinned track, translateX from scroll progress, doors open by position, dog walks on the spot | unpinned, doors open |
| Home door | `animation-timeline: view()`, range `entry 80% cover 52%` (reference values) | door stays open |
| Passport stamps | `view()` timeline scale-in | static |
| Roaming dog | position = scroll progress, rig stride by distance, hop arc driven by the footer basket's position, one layout read per frame | hidden; basket pup stays |
| Paw trail | canvas, fine pointers only | off |

## Not reproduced
Mascot gaze/woof/spin cues; mobile docked peek dog; curtain intro, Lenis smooth scroll and view transitions; hero lineup reshuffle at runtime. The "mobile heights" artifact (15px reference scrollbar changing wraps and grid columns) explains some, not all, mobile gaps.
