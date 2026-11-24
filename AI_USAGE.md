# AI usage

Everything was built with Claude Code (Claude Sonnet 5.5) in one long session, with Playwright for reference capture and screenshots. Exact prompts live in the session transcript on the author's machine (`~/.claude/projects/.../*.jsonl`); only the two below are reproduced from it. The others are paraphrased and marked so.

## Tools
- Claude Code: recon, implementation, tests, docs.
- Playwright (Chromium): reference and local capture, geometry measurement, regression tests.
- REA (reverse-engineer-anything): attempted for static analysis of the reference's JS bundle; it needed a newer Node and only gave a module inventory, so most work used Playwright DOM/CSS dumps instead.
- Lighthouse: run once per page in the final pass.
- Vercel: deployed by the author; the assistant did not perform or verify the deployment.

## Prompts (in order)
1. *(verbatim, abridged)* "I am completing a 48-hour technical hiring assignment for Blutec AI. Reference: https://puppy.instabizweb.com/ … recreate the complete website with maximum visual fidelity, responsiveness, and functional accuracy. We will use REA … FIRST TASK: RECONNAISSANCE ONLY … Do not implement anything yet."
2. *(paraphrased)* Approve the plan and build the site (routes, data from the reference, components).
3. *(paraphrased)* Animations are missing versus the screen recording; add the scroll scenes, mascot and door behaviour.
4. *(paraphrased)* One dog that walks from hero to footer in both directions; fix the Meet doors; remove the duplicate dog.
5. *(paraphrased)* Visual audit: transcribe the reference's own CSS/markup for hero, Meet, paths, passport, night FAQ, footer instead of approximating; no animation libraries.
6. *(paraphrased)* Make the roaming dog bigger and make it hop into the footer basket.
7. *(verbatim, abridged)* "FINAL MISSION: Complete Website Audit, Correction & Production Verification … Audit → Prioritize → Fix → Test → Compare → Refine → Verify … Do not claim deployment, recording, or external verification succeeded unless actually performed."
8. *(paraphrased)* Fix the audit findings: honest demo form, the four deliverable docs, README, remove unused dependencies, add tests, verify and fix the mobile basket landing, fix the home door section.
9. *(paraphrased)* Fix the remaining gaps and push to main; the author had already deployed to Vercel.
10. *(verbatim, abridged)* "I do not want not done anymore finish everything. It is time for final submission no cutting corners … Nothing should be left to do except pushing to main." This round added the tap acts and cues for the dog, a native View Transition around the curtain swap, wheel easing fitted to the reference's measured scroll trajectory, and the detail-page restructure.

## Significant AI-assisted decisions
- Port the reference's mascot rig (`rig.ts`) rather than invent a walk cycle.
- Transcribe scene CSS from the reference's computed rules; own class prefixes (`.md-`, `.tpw-`, `.tpb-`, `.tpn-`, `.tph-`, `.tph2-`, `.tpf-`).
- Smooth-scroll constants are fitted to per-frame scrollY samples taken on the reference, not copied from its code.
- No backend: the form says it sends nothing instead of faking success.
- Roamer hop driven by the basket's own position (an earlier footer-based version flew off-screen on mobile).
- `/puppies` renders the full grid on the server and applies URL filters after mount (fixed a 0.75 layout shift).

A human should be able to explain each of these; the Loom walkthrough has **not** been recorded by this tooling.
