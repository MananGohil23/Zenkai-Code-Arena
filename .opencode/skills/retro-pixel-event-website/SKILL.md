---
name: retro-pixel-event-website
description: Build a retro pixel-art / terminal-themed single-page event website with a game-style boot/intro sequence (inspired by DJSCE Code UnCode 2026), using Next.js, TypeScript, Tailwind CSS, and GSAP. Use this whenever building, extending, or reviewing this project's intro loader, page sections, animation system, or design tokens.
---

# Retro Pixel Event Website — Build Spec

## 0. Read this first

This spec is modeled on `codeuncode.djscodestars.in` (DJS CodeStars' "Code UnCode 2026"
ICPC-style coding competition site). The reference site is a JS-rendered single-page app
gated behind an animated boot sequence, so only the **intro/loader layer** below is
confirmed from direct inspection. Everything under "Page Sections" (§7) is a best-effort
reconstruction based on (a) the confirmed intro assets/aesthetic and (b) the standard
section set for this genre of competitive-programming / hackathon fest site. Treat §7 as
a strong starting scaffold, not gospel — swap section order, copy, and specifics once
you've walked through the live reference yourself. Section §11 lists exactly what's
confirmed vs. assumed.

**Do not copy any proprietary text, imagery, or branding from the reference site.**
This spec captures structure, mood, and technique only — all copy, art, and sprites in
the build should be original to this project.

---

## 1. Vision & Aesthetic Pillars

A coding-competition landing page styled as a **retro 8-bit / GameBoy-era RPG intro**
crossed with a **hacker terminal**. Think: the "Welcome to the world of [X]" lab-intro
scene from a Pokémon game, rendered with CRT scanlines and a blinking cursor, that then
unfolds into a modern, smoothly-animated single-page site once the user "boots in."

Core mood words: *retro, pixelated, nostalgic, terminal, playful, competitive, nerdy-cool.*

- Pixel-art sprites and flat illustration, not photorealism
- Monospace / bitmap fonts throughout
- CRT/scanline overlay, subtle screen-flicker, chromatic-aberration-on-hover accents
- A visible "boot sequence" gate before the real site is revealed
- Scroll-driven cinematic reveals rather than static sections
- Game-UI conventions repurposed for real UI: dialogue boxes, health-bar-style progress
  indicators, 8-bit button presses (with sound), a blinking `▮` cursor as a recurring motif

---

## 2. Tech Stack

| Concern | Library | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)**, TypeScript | SSR/SEO for a marketing site, file-based routing, `next/image` + `next/font` optimization |
| Styling | **Tailwind CSS** | Fast utility styling; pair with a custom pixel-theme config (see §5) |
| Scroll/cinematic animation | **GSAP + ScrollTrigger** | Industry standard for scroll-linked reveals, pinning sections, timeline sequencing — this is almost certainly what drives the reference site's intro and section transitions |
| UI micro-interactions | **Framer Motion** | Button presses, accordion (FAQ), modal/dialogue-box transitions, `AnimatePresence` for the intro→site handoff |
| Smooth scrolling | **Lenis** (`@studio-freight/lenis`) | Buttery scroll feel to sell the "cinematic" quality; pair with GSAP's ScrollTrigger scroller-proxy |
| Sound effects | **Howler.js** | Retro blip/boot/click SFX — mute-by-default with a persistent mute toggle |
| Fonts | **Press Start 2P** (headers/pixel display) + **VT323** or **JetBrains Mono** (body/terminal text) via `next/font/google` | Matches the pixel-boot aesthetic while keeping body copy readable |
| Icons | **lucide-react** or hand-drawn pixel icon set | Keep icon style consistent with pixel theme — avoid generic rounded icon packs |
| State (intro-seen, mute, theme) | **Zustand** or React Context + `sessionStorage` | Lightweight; persists "already saw intro" so returning/scrolling users aren't re-gated |
| Forms (registration/newsletter) | **React Hook Form + Zod** | Validation for the register/CTA section if it collects emails directly rather than deep-linking to Unstop/Google Form |
| Deployment | **Vercel** | Native Next.js hosting, image optimization, analytics |
| Optional 3D/parallax flourish | **React Three Fiber + drei** | Only if you want a pseudo-3D parallax on the boot scene or hero; skip if 2D sprite animation is enough — don't over-engineer |

Install baseline:
```bash
npx create-next-app@latest . --typescript --tailwind --app
npm install gsap framer-motion @studio-freight/lenis howler zustand
npm install -D @types/howler
```

---

## 3. Project Structure

```
project-root/
├── app/
│   ├── layout.tsx              # root layout, font loading, metadata, mute/intro providers
│   ├── page.tsx                # composes IntroLoader + all sections
│   ├── globals.css             # Tailwind base + pixel-theme CSS vars, CRT overlay keyframes
│   └── favicon.ico
├── components/
│   ├── intro/
│   │   ├── IntroLoader.tsx     # orchestrates boot sequence, owns "skip" state
│   │   ├── BootSequence.tsx    # sprite reveal, scripted animation timeline
│   │   ├── SkipIntroButton.tsx
│   │   └── TerminalCursor.tsx  # reusable blinking ▮ component
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── Timeline.tsx        # Prelims → Regionals → Grand Final roadmap
│   │   ├── Tracks.tsx          # format/rules/eligibility
│   │   ├── Prizes.tsx
│   │   ├── Sponsors.tsx
│   │   ├── FAQ.tsx
│   │   ├── Team.tsx            # organizing committee
│   │   ├── RegisterCTA.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── PixelButton.tsx     # bordered, chunky, press-animation button
│   │   ├── DialogueBox.tsx     # game-textbox-style container, reused for FAQ/testimonials
│   │   ├── CRTOverlay.tsx      # fixed-position scanline/vignette layer
│   │   ├── PixelCard.tsx
│   │   └── MuteToggle.tsx
│   └── layout/
│       ├── Navbar.tsx          # sticky, appears only after intro is skipped/finished
│       └── SectionWrapper.tsx  # shared scroll-reveal wrapper (GSAP hook-in point)
├── hooks/
│   ├── useIntroGate.ts         # reads/writes sessionStorage "hasSeenIntro"
│   ├── useScrollReveal.ts      # GSAP ScrollTrigger wrapper hook
│   └── useSound.ts             # Howler wrapper respecting global mute state
├── lib/
│   ├── constants.ts            # event dates, stats, copy strings, external links
│   ├── animations.ts           # shared GSAP timeline configs/easing presets
│   └── sfx.ts                  # sound file registry
├── store/
│   └── useUiStore.ts           # zustand: introSeen, muted, activeSection
├── public/
│   ├── loader/
│   │   ├── background.webp
│   │   ├── mascot.webp         # your project's own mascot sprite (do not reuse reference art)
│   │   └── platform.webp
│   ├── sprites/                # section-specific pixel illustrations
│   ├── sfx/                    # .mp3/.ogg blip/boot/click sounds
│   └── og-image.png
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 4. Design System

**Color palette** — high-contrast, limited palette like an 8-bit console (define as
Tailwind theme extension + CSS variables):
```
--bg-void:        #0a0a12   (near-black background)
--bg-terminal:     #0d1f17   (secondary panel bg, CRT-green tinted)
--accent-primary:  #39ff14   (terminal green — cursor, links, highlights)
--accent-secondary:#ff2e63   (retro magenta/pink — CTAs, alerts)
--accent-tertiary: #ffd93d   (pixel-yellow — badges, stats)
--fg-primary:      #eaffea
--fg-muted:        #7a8f7a
```
(Swap to your event's actual brand colors — this is a placeholder retro-terminal palette.)

**Typography**
- Display/headers: `Press Start 2P` — use sparingly (large tracking, short strings only;
  it breaks readability at body-copy lengths)
- Body/UI/terminal text: `VT323` or `JetBrains Mono`
- Maintain a strict type scale (e.g., 12/16/24/32/48px) to keep the pixel grid feeling
  intentional rather than arbitrary

**Motion principles**
- Snap/stepped easing (`steps()` or GSAP `power1.inOut` with short duration) for anything
  meant to feel "8-bit" — avoid buttery ease-outs on pixel elements, they read as
  "off-brand smooth"
- Reserve buttery smooth easing (Lenis + Framer Motion default springs) for whole-page
  scroll and large section transitions — the contrast between snappy micro-interactions
  and smooth macro-scroll is what sells the "retro game, modern engineering" feel
- Every interactive element gets a pressed/hover state with a 1-2px offset "chunky button"
  shadow, like classic pixel UI kits

**CRT overlay**
- Fixed, `pointer-events: none`, full-viewport `<div>` with a repeating scanline
  `background-image` (thin horizontal lines, low opacity) + a subtle radial vignette
- Optional: very slight flicker animation on opacity (2-4% variance, slow interval) —
  keep it subtle enough to not trigger motion sensitivity; respect `prefers-reduced-motion`

---

## 5. Intro / Boot Sequence (Confirmed Layer)

This is the one part of the reference site we could directly confirm, so implement it
closely:

1. **Full-screen gate on first load** (`background.webp` fills viewport)
2. **Mascot sprite** animates/fades in (reference used a Professor-Oak-style character —
   use your own original mascot art)
3. **"Platform" sprite** — a ground/stage element the mascot appears to stand on,
   reinforcing the "game intro cutscene" read
4. **Blinking terminal cursor (`▮`)** rendered as a persistent motif, likely simulating a
   "press any key" or dialogue-advance prompt
5. **"Skip Intro" button** — always available, top-corner or bottom-corner, low-emphasis
   styling so it doesn't compete with the cutscene but is easy to find
6. **Gate logic**: on skip (or on sequence completion), `AnimatePresence`/GSAP timeline
   transitions the loader out and reveals `Navbar` + `Hero`. Store `hasSeenIntro` in
   `sessionStorage` so navigating back or refreshing mid-session doesn't replay the whole
   cutscene (re-arriving fresh in a new session should still show it — it's a feature).

```tsx
// hooks/useIntroGate.ts — sketch
export function useIntroGate() {
  const [showIntro, setShowIntro] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('hasSeenIntro')) setShowIntro(false);
  }, []);
  const completeIntro = () => {
    sessionStorage.setItem('hasSeenIntro', '1');
    setShowIntro(false);
  };
  return { showIntro, completeIntro };
}
```

Play a short boot/chime SFX on sequence start and a distinct "confirm" blip on skip —
respect the global mute toggle and default to muted (autoplay-audio best practice).

---

## 6. Global Layout

- **Navbar**: hidden during intro, slides/fades in once gated content is revealed.
  Sticky, pixel-bordered, contains logo, in-page anchor links (About, Timeline, Prizes,
  FAQ), and a persistent "Register" pixel-button (accent color, always visually distinct).
- **MuteToggle**: fixed corner, small speaker-icon pixel button.
- **CRTOverlay**: mounted once in root layout, sits above all content (z-index top, but
  `pointer-events: none`).
- **Footer**: present on all views (see §7.10).

---

## 7. Page Sections

Each section should be its own component, entering via a GSAP ScrollTrigger reveal
(fade + slight upward translate + a "pixel dissolve" or clip-path wipe for extra flavor).

### 7.1 Hero
- Event name + year, large `Press Start 2P` treatment
- One-line tagline (e.g., positioning as a premier ICPC-style competition)
- Key headline stat(s) as a badge (e.g., "X participants · Y institutes")
- Primary CTA: "Register Now" pixel-button
- Animated background: subtle pixel starfield, scrolling grid, or parallax sprite layer

### 7.2 About
- 2-3 short paragraphs: what the event is, format (ICPC-style team competition), who it's for
- Presented inside a `DialogueBox` component for thematic consistency

### 7.3 Stats Counter
- 3-4 count-up stats on scroll-into-view (participants, institutes, prize pool, cities/regions)
- Each stat in its own `PixelCard`

### 7.4 Timeline / Rounds
- Visualize as a **level-map / road path** (classic RPG world-map path connecting nodes):
  Prelims → Regional(s) → Grand Final
- Each node: round name, format (online/on-site), date, brief description
- On scroll, path "draws" progressively (GSAP `DrawSVGPlugin` or stroke-dashoffset trick)

### 7.5 Tracks / Format & Rules
- Team size/eligibility rules
- Round structure specifics (duration, platform used, qualification cutoffs)
- Keep this scannable — short bullet cards, not dense paragraphs

### 7.6 Prizes
- Cash prizes / goodies / certificates / any job-referral or internship incentives
- Tiered display (1st/2nd/3rd + participation perks) as pixel "treasure chest" or
  "trophy" cards

### 7.7 Sponsors / Partners
- Logo grid, grayscale-to-color on hover
- Separate tier if sponsors are tiered (title/gold/silver)
- Include any collaborating clubs/committees as a distinct "in association with" row

### 7.8 FAQ
- Accordion using `DialogueBox` + Framer Motion height animation
- 5-8 common questions (eligibility, team size, cost, what to bring, contact)

### 7.9 Organizing Team
- Grid of committee members/core team, styled like a retro "character select" screen
  (portrait, name, role) — nice place for a hover "select" sound blip

### 7.10 Register CTA + Footer
- Final full-width CTA block, possibly with a live countdown timer to the next round date
- Footer: social links (Instagram, LinkedIn, etc.), contact email, college/organizer
  branding, credits line

---

## 8. Animation & Interaction Guidelines

- Initialize Lenis in root layout and sync it to GSAP's `ScrollTrigger.update` via
  `lenis.on('scroll', ScrollTrigger.update)` and a `requestAnimationFrame` loop
- Batch entrance animations per section using a shared `useScrollReveal` hook so timing/
  easing stays consistent site-wide instead of ad hoc per component
- Keep GSAP timelines section-scoped (`gsap.context()` inside each component, revert on
  unmount) to avoid animation leaks across route changes
- Always provide a `prefers-reduced-motion` branch that swaps scroll-triggered animation
  for simple opacity fades, and disables screen-flicker/CRT flicker entirely
- Sound: every SFX call routes through `useSound`, which checks the global mute flag —
  never play audio directly from a component

---

## 9. Performance, Accessibility, SEO

- Use `next/image` for all sprites/webp assets; predefine width/height to avoid layout shift
- Lazy-load below-the-fold sections' heavier assets; keep the intro's assets preloaded/priority
- Semantic HTML under the pixel skin: real `<button>`/`<nav>`/`<section>` elements, not
  all-`<div>` soup — the retro visual layer shouldn't compromise a11y
- Ensure sufficient contrast between accent colors and background (the neon-on-black
  palette usually passes, but check the yellow/magenta specifically)
- Metadata: replicate the reference's good practice of thorough `<head>` metadata — title,
  description, keywords, OG tags, `viewport` — via Next.js `generateMetadata` in `app/layout.tsx`
- `robots: index, follow` unless this is a staging deploy

---

## 10. Content Placeholders

Centralize all copy/dates/numbers in `lib/constants.ts` so content updates don't require
touching component code:
```ts
export const EVENT = {
  name: 'YOUR EVENT NAME',
  year: 2026,
  tagline: 'Your one-line positioning statement',
  stats: { participants: '0+', institutes: '0+', prizePool: '₹0' },
  rounds: [
    { name: 'Prelims', date: 'TBD', format: 'Online' },
    { name: 'Regionals', date: 'TBD', format: 'On-site, multiple cities' },
    { name: 'Grand Final', date: 'TBD', format: 'On-site' },
  ],
  registerUrl: 'https://...',
};
```

---

## 11. What's Confirmed vs. Assumed (read before deviating)

**Confirmed from direct inspection of the reference site:**
- Built on Next.js
- Boot/intro sequence gating the homepage, with a "Skip Intro" control
- Pixel/retro-game mascot + "platform" sprite as intro visuals, served as `.webp`
- A blinking terminal-style cursor character as a recurring UI motif
- Thorough SEO metadata (title, description, keywords, OG tags)
- The event itself: an ICPC-style team coding competition run by a DJSCE student
  committee, with a multi-round structure (online prelims → regional on-site rounds →
  a grand final), scaling to a large multi-institute participant base

**Assumed / reconstructed (verify against the live site and adjust):**
- Exact section order, count, and copy beyond the intro (§7 is a genre-standard
  scaffold, not a scrape)
- Specific animation library choice (GSAP is a strong, common inference for this style
  of site, not a confirmed fact)
- Color palette (the reference's actual palette wasn't visible in the static fetch —
  swap §4's placeholder colors for whatever you observe/prefer)
- Whether a level-map timeline, character-select team grid, etc. are actually present
  on the reference — these are suggested treatments consistent with the aesthetic, not
  observed elements

Recommend a quick pass where you (or the agent, if it has browser access) actually click
through the live reference end-to-end and diff its real sections/order against §7 before
locking in the build plan.
