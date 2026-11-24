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
Earlier coarse run (mean per-channel difference of 200px-wide downscales, plus page height). Not pixel-exact; it ranks pages only. Heights are ours vs the reference screenshot:

| Page | 1440 height (ours / ref) | 390 height (ours / ref) | Coarse diff d / m |
|---|---|---|---|
| Home hero | viewport | viewport | 13.9% / 16.1% |
| /faq | 2183 / 2372 | 2871 / 3082 | 37.4% / 33.4% |
| /contact | 1788 / 1952 | 2834 / 3579 | 19.9% / 38.6% |
| /how-it-works | 2323 / 4506 | 3843 / 7972 | 34.7% / 34.2% |
| /puppies | 3514 / 3673 | 4545 / 5643 | 24.4% / 45.6% |
| /happy-families | 8075 / 8787 | 9287 / 32314 | 33.8% / 33.8% |
| /gone-home | 2579 / 3063 | 5761 / 7234 | 32.7% / 36.9% |
| /puppies/[slug] | 2656 / 3274 | 3700 / 5223 | 38.6% / 44.0% |
| 404 | 1319 / 1606 | 1811 / 2099 | 29.0% / 26.5% |

These numbers predate the home-page rebuilds and were not re-run in the final pass. **Inner pages are 5-50% shorter than the reference, with /how-it-works (about half) and mobile /happy-families (about 30%) the largest gaps.** The cause was not investigated; part of it may be reference content that only appears after scroll-triggered animations, part may be missing sections. This is the biggest known remaining discrepancy.

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
