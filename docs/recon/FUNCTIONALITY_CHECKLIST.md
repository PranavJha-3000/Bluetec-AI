# FUNCTIONALITY_CHECKLIST

Status legend: ✅ observed on reference, ◐ partially observed, ❓ not verified (needs test during build). All items are unchecked build targets.

## Global
- [ ] ✅ Fixed header, active-link paw marker, WhatsApp pill; scalloped edge on inner pages
- [ ] ✅ Mobile (<768) Menu overlay: open/close, giant links, WhatsApp + number; ❓ focus trap, Esc, scroll lock
- [ ] ✅ Mobile bottom bar (WhatsApp + Call `tel:+971500000000`)
- [ ] ✅ Skip-to-content link
- [ ] ✅ Paw cursor (`pointer:fine`); ❓ coarse-pointer fallback
- [ ] ✅ Lenis smooth scroll; ❓ options (lerp default .1 in lib; actual config not read)
- [ ] ✅ First-load curtain with running poodle + "every puppy is family"; ❓ replay on route change / sessionStorage gating
- [ ] ◐ View-transition page changes
- [ ] ◐ Fixed canvas overlay + mascot layer + paw-print trail (`pup-*`); ❓ rules
- [ ] ✅ Footer links, contact, socials (placeholders → see open question)
- [ ] ✅ Custom 404; ❓ copy
- [ ] ✅ `prefers-reduced-motion` rules exist; ❓ exact fallbacks
- [ ] ✅ Header switches to Menu overlay below **1024px**; bottom bar below **768px**
- [ ] ✅ Cursor paw-trail canvas (fine pointer only, 1s life, alpha .42, off for reduced-motion)
- [ ] ◐ Roaming mascot "actor" with speech bubble (`pup-layer`) ❓ triggers/copy
- [ ] ✅ Global footer: wavy top, stars, moon, basket mascot, link columns

## Home
- [ ] ✅ Hero: eyebrow, H1, sub, 2 CTAs (→ `/puppies`, WhatsApp), 7 arch photos + mascot + cycling breed tag; ❓ cycle timing/tag behaviour
- [ ] ✅ Meet the pups: **sticky 900px stage, vertical scroll → horizontal track translation (~1.25px/px)**, 15 doors from data, open animation; "Available" tags; video badge text ("with video"); link to detail; "See all available puppies"
- [ ] ✅ Paths: showroom → `/puppies?origin=local` (empty-state target), Imported → `/puppies?origin=imported` ("KoreaDubai" plane route)
- [ ] ✅ Chat journey: 3 steps, sequential highlight on scroll, phone with bubbles/typing dots/breed chips (chips → `/puppies?breed=…` ✅ links seen), "Say hello on WhatsApp" CTA
- [ ] ✅ Passport trust cards (3) + "Trusted by families worldwide"
- [ ] ✅ Dusk: testimonial, 8 polaroids, "See every happy family" → `/happy-families`
- [ ] ✅ Night: 3 FAQ teasers, "Read all questions" → `/faq`
- [ ] ✅ Welcome-home doorstep CTA + video/photo reveal

## /puppies
- [ ] ✅ 3 filter groups; toggle on/off; combine; URL sync (`breed`, `gender=male|female`, `origin`); ❓ origin param values for Imported / Korean Teacup buttons
- [ ] ✅ Count text ("15 puppies looking for a home" / "N puppies match"), Clear filters, empty state with CTA text "Tell us what you're hoping for…" ❓ full empty-state copy/CTA
- [ ] ✅ Cards link to detail; ✅ "Already gone home" teaser → `/gone-home`
- [ ] ✅ Header "from Teddy's sketchbook", self-portrait mascot

## /puppies/[slug]
- [ ] ✅ Breadcrumb, gallery with prev/next + counter, video play (▶), status badge, spec grid, WhatsApp CTA (prefilled message ❓ exact text — site uses agency text), "Send an enquiry" anchor scroll
- [ ] ✅ Imported vs local content variants ("Coming home from abroad" 4 steps)
- [ ] ✅ Available vs gone-home variants (badge, breadcrumb, CTA copy, eyebrow "the day they went home")
- [ ] ✅ Enquiry form (6 fields + honeypot), per-slug anchor id; ❓ validation messages, success state, submit endpoint
- [ ] ✅ Previous/Next pup ring; ✅ breadcrumb JSON-LD; ✅ per-puppy `<title>`
- [ ] ✅ Junk slugs `/puppies/puppy`, `/puppies/maltipo` exist → include or redirect (decision)

## /gone-home, /happy-families
- [ ] ✅ 27 boarding-pass tickets (route text depends on origin: "TEDDYPUPS → HOME" imported / "DUBAI SHOWROOM → HOME" local); CTA to `/puppies`; tickets link to detail ❓ (not tested)
- [ ] ✅ 404 "LOST" poster with 5 tear-off nav tabs
- [ ] ✅ 64 polaroids → lightbox with counter, Close, Previous, Next; ❓ Esc / arrows / swipe / focus return

## /how-it-works
- [ ] ✅ 4 anchor chips under H1 (→ `#two-ways`, `#promise`, `#delivery`, `#why`) ❓ scroll behaviour
- [ ] ✅ ARIA tabs (local/imported) as segmented toggle with panel swap; ❓ hash/URL sync, keyboard arrows
- [ ] ✅ `#delivery` anchor from footer; promise cards; why section

## /faq
- [ ] ✅ 9 pinned-note accordion items, aria-expanded; ❓ single vs multi-open, animation; ✅ FAQPage JSON-LD; ✅ "Ask your own question" CTA
- [ ] ✅ Search input "sniff out a question" + "9 notes on the board" count ❓ filtering behaviour/empty state

## /contact
- [ ] ✅ Letter-style inline form, select of 15 puppies, honeypot; ❓ validation, success animation (inferred from `tp-letter-fold/env-post/sent-in/flag`), server handling
- [ ] ✅ WhatsApp / tel / mailto / map cards

## SEO / platform
- [ ] ✅ Titles: `TeddyPups U.A.E. — Premium teacup puppies in Dubai` (home), `{Page} | TeddyPups U.A.E.`, `{Name}, {Breed} puppy | …`; meta description + OG/Twitter (logo.png) on home; ❓ per-page descriptions
- [ ] ✅ sitemap (49 URLs + image entries), robots, icons, `theme-color #fffdf8`, `viewport-fit=cover`
- [ ] ✅ Security headers (CSP, X-Frame DENY, etc.) — optional in clone

## Testing strategy
1. **Static parity**: Playwright at 390/768/1440, `reducedMotion:'reduce'`, `animations:'disabled'`, fonts ready, scroll-wake; compare section boxes (heights) first, then pixel diff (<~2% on art-heavy scenes; text-only sections <0.5%). Mask videos/cursor/canvas.
2. **Interaction tests** (Playwright): menu, tabs, accordion, filters + URL, lightbox, gallery, form validation + success + honeypot, anchor links, prev/next ring, 404.
3. **Data tests** (Vitest): filter logic (Pomeranian → 4, Pomeranian+Boys, origin=local → 0), slug coverage vs sitemap, prev/next wrap.
4. **A11y**: axe + keyboard walk; reduced-motion pass.
5. **Perf/SEO**: Lighthouse on `/`, `/puppies`, detail; sitemap/robots validation.
