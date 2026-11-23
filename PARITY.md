# Visual parity report

Method: `node scripts/parity.mjs` (needs `npm run build && npx next start -p 3100`). It screenshots our page at each reference screenshot's size, downscales both to 200px wide and reports mean per-channel difference (0% = identical), plus page height. Images land in `recon/parity/` (git-ignored).

This is a coarse score, not a pixel-exact diff: photos, text wrapping and different page heights all inflate it. Use it to rank pages, not to claim a match.

| Page | Reference | Our height | Diff |
|---|---|---|---|
| vp-d-hero (/) | 1440x900 | viewport | 13.9% |
| vp-m-hero (/) | 390x844 | viewport | 16.1% |
| d-faq (/faq) | 1425x2372 | 2183 | 37.4% |
| m-faq (/faq) | 375x3082 | 2871 | 33.4% |
| d-contact (/contact) | 1425x1952 | 1788 | 19.9% |
| m-contact (/contact) | 375x3579 | 2834 | 38.6% |
| d-how (/how-it-works) | 1425x4506 | 2323 | 34.7% |
| m-how (/how-it-works) | 375x7972 | 3843 | 34.2% |
| d-puppies (/puppies) | 1425x3673 | 3514 | 24.4% |
| m-puppies (/puppies) | 375x5643 | 4545 | 45.6% |
| d-families (/happy-families) | 1425x8787 | 8075 | 33.8% |
| m-families (/happy-families) | 378x32314 | 9287 | 33.8% |
| d-gone (/gone-home) | 1425x3063 | 2579 | 32.7% |
| m-gone (/gone-home) | 375x7234 | 5761 | 36.9% |
| d-detail (/puppies/maltipoo-max-male) | 1425x3274 | 2656 | 38.6% |
| m-detail (/puppies/maltipoo-max-male) | 375x5223 | 3700 | 44.0% |
| d-notfound (/nope) | 1425x1606 | 1319 | 29.0% |
| m-notfound (/nope) | 375x2099 | 1811 | 26.5% |

## Findings
- Latest run after the footer, passport book, signpost and mobile 2-column puppies grid. Inner pages are still 10-35% shorter than the reference and score 20-46% on the coarse metric, so they are close in structure but not pixel-matched.
- Home hero is the closest match (14% / 16%).
- Remaining known differences: reference decorative blocks on inner pages, exact copy and spacing, tall mobile photo wall on /happy-families (reference 32314px vs ours ~9300px).
- Not compared: home scroll scenes (reference screenshots depend on its own page height).
