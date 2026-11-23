# Visual parity report

Method: `node scripts/parity.mjs` (needs `npm run build && npx next start -p 3100`). It screenshots our page at each reference screenshot's size, downscales both to 200px wide and reports mean per-channel difference (0% = identical), plus page height. Images land in `recon/parity/` (git-ignored).

This is a coarse score, not a pixel-exact diff: photos, text wrapping and different page heights all inflate it. Use it to rank pages, not to claim a match.

| Page | Reference | Our height | Diff |
|---|---|---|---|
| Home hero 1440 / 390 (viewport) | 1440x900 / 390x844 | viewport | 13.9% / 16.1% |
| /faq d / m | 2372 / 3082 | 1962 / 2689 | 44.6% / 38.2% |
| /contact | 1952 / 3579 | 1567 / 2651 | 28.4% / 43.2% |
| /how-it-works | 4506 / 7972 | 2103 / 3661 | 32.6% / 33.0% |
| /puppies | 3673 / 5643 | 3325 / 10277 | 28.0% / 38.8% |
| /happy-families | 8787 / 32314 | 7854 / 9105 | 32.3% / 33.8% |
| /gone-home | 3063 / 7234 | 2358 / 5579 | 39.0% / 35.5% |
| /puppies/maltipoo-max-male | 3274 / 5223 | 2435 / 3518 | 39.1% / 42.6% |
| 404 | 1606 / 2099 | 1098 / 1628 | 40.3% / 33.7% |

## Findings
- The home hero is the closest match. Every inner page is 15–55% shorter than the reference (spacing and decorative sections are lighter), so the next fidelity pass should be inner-page vertical rhythm and the missing decorative blocks.
- Mobile `/puppies` is 10277px against 5643px: our cards are too tall on a phone (the reference uses a denser 2-column grid).
- Mobile `/happy-families` reference is 32314px; its photo wall is far taller than ours.
- Not compared: home scroll scenes (reference screenshots were taken mid-scroll at offsets that depend on its own page height).
