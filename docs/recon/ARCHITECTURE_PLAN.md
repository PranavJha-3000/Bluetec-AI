# ARCHITECTURE_PLAN (proposal — nothing built)

Principle: match the reference's proven stack where it buys fidelity, otherwise keep it boring. [I] = recommendation, not observed fact.

## Stack [I]
- **Next.js 15/16 App Router + React 19 + TypeScript + Tailwind CSS v4** (reference uses the same; `@theme` tokens port 1:1). Static generation (`generateStaticParams`) for all 49 routes.
- **motion** (Framer Motion) for component reveals, **lenis** for smooth scroll — both confirmed in the reference bundle [O]. CSS keyframes for the ~46 `tp-*` animations (re-authored in a single `animations.css`).
- `next/font/google`: Fraunces (**axes `SOFT`, `WONK`, `opsz`; headings `font-variation-settings:"SOFT" 100,"WONK" 1,"opsz" 144`**), Figtree, Shantell Sans. `next/image` with focal-point + blur placeholders.
- Data: **typed static TS/JSON files** (`data/puppies.ts`, etc.) seeded from `recon/data/`. No CMS/DB (avoid complexity).
- Form: Next **Server Action** + `useActionState` (as the reference does [O: useActionState in 2 chunks]). Back end target **[needs decision]**: log-only / email via Resend / WhatsApp deep-link fallback.
- Testing: Playwright (screenshot parity at 390/768/1440 + interaction tests), Vitest for filter/data logic.

## Folder layout [I]
```
src/
  app/
    layout.tsx            # fonts, shell, curtain, mascot layer, Lenis provider
    page.tsx              # home (scenes)
    puppies/page.tsx      # listing + filters
    puppies/[slug]/page.tsx
    gone-home/ happy-families/ how-it-works/ faq/ contact/ not-found.tsx
    sitemap.ts robots.ts icon.png apple-icon.png
  components/
    shell/   Header, MobileMenu, MobileBottomBar, Footer, Curtain, SkipLink, PawCursor
    mascot/  Mascot (SVG poses), MascotLayer, PawTrail (canvas)
    scenes/  Hero, MeetPups(Doors), Paths, ChatJourney(PhonePanel), Passport, Dusk, Night, HomeDoor
    ui/      Button(primary|ghost|whatsapp), Pill, Tag, Taped(Card), Polaroid, Ticket, StickyNote, Lightbox
    puppies/ PuppyCard, FilterBar, Gallery, InfoCard, EnquiryForm, PrevNext
    forms/   LetterForm
  data/      puppies.ts, gone-home.ts, families.ts, faq.ts, journeys.ts, site.ts (contact constants)
  lib/       filters.ts (parse/serialize URL), media.ts, whatsapp.ts
  styles/    tokens.css (@theme), animations.css
```

## Reusable components (from audit) [I]
`Button` (primary/ghost/whatsapp with hard shadow + press), `Pill` filter toggle, `StatusTag` (rotated "Available"), `TapedCard`, `Polaroid`, `Ticket`, `StickyNote`, `PhoneFrame`, `Door` (open on in-view), `PuppyCard`, `Accordion` (FAQ), `Tabs` (how-it-works, ARIA tablist), `Lightbox` (dialog + prev/next + counter), `Scallop` (SVG edge), `Mascot` (SVG poses prop), `SectionHeading` (eyebrow in hand font + Fraunces H2).

## Data structures [O fields → proposed TS]
```ts
type Media = { id; url; kind:'image'|'video'; width; height; alt; focalX; focalY; color; blur?; durationS?; poster?: Media }
type Puppy = { slug; name?; breed; gender:'male'|'female'; age; status:'available'|'gone-home'; origin:'imported'|'local'; media: Media[]; cover: Media }
type Faq = { question; answer };  type Journey = { key:'local'|'imported'; label; hint; heading; body; note?; steps:{title;text}[] }
```
Derived: filter state `{origin?, breed?, gender?}` ⇄ URL (`?breed=pomeranian&gender=male`), count text, prev/next ring.

## Key technical decisions
1. **Client filtering** with `useSearchParams` + `history.replaceState`; SSR renders all cards (matches reference, SEO-safe).
2. **Mascot/canvas layer** isolated in `components/mascot`, behind a `prefers-reduced-motion` and `pointer:fine` gate; built last (highest risk).
3. **Scroll choreography**: Lenis provider + `IntersectionObserver`/motion `useInView` per scene; scroll-pinned chat via sticky + progress-mapped step index.
4. **Curtain/route transition**: first-load curtain via CSS keyframes (+ `startViewTransition` if time) — keep simple, behind a flag.
5. Re-author CSS rather than port compiled `tp-*` classes (cleaner, ownership-safe) — tokens/keyframe names mirrored for traceability. **[confirm]**
6. SEO parity: titles/descriptions per route (patterns above), OG image = logo, JSON-LD Breadcrumb + FAQPage, sitemap incl. all slugs, 404 page.
7. Accessibility parity+: skip link, ARIA tabs/accordion/dialog, focus rings, reduced-motion fallbacks, alt text from data.
