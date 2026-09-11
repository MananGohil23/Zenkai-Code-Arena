# Zenkai Code Arena

A Dragon Ball Z–themed marketing site for **Zenkai Code Arena**, an ICPC-style coding
competition. It opens with a retro "Dragon Radar" boot sequence, drops you into a
character-select screen where picking a fighter themes the entire site, then unfolds into
a scroll-driven, parallax single-page experience.

> Fan-made aesthetic homage. Not affiliated with Toei Animation, Bird Studio, or the
> Dragon Ball franchise.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Fighter themes](#fighter-themes)
- [Editing content](#editing-content)
- [Asset pipeline](#asset-pipeline)
- [Environment variables](#environment-variables)
- [Deployment (Vercel)](#deployment-vercel)
- [Accessibility & performance](#accessibility--performance)
- [Credits & licenses](#credits--licenses)

---

## Features

- **Boot / intro sequence** — a pixel-font "DRAGON RADAR" console with a typewriter
  monologue and a blinking cursor, plus a skip control.
- **Fighter select** — full-height character cards with hover expand/collapse, transparent
  cut-out artwork, per-fighter colour schemes, and a spinning Dragon Ball.
- **Per-fighter theming** — choosing a fighter recolours the whole site (accents, glows,
  gradients, scroll-progress bar) via CSS variables.
- **Parallax hero** — five layered background planes plus ambient ki embers, floating
  Dragon Ball, and flying Goku/Trunks cut-outs that drift on scroll.
- **Global page backdrop** — a fixed desert-horizon scene with a blueprint grid and an
  accent glow that follows the section in view.
- **Scroll-driven timeline** — a sticky "Scouter" HUD with an animated power-level readout
  and page-path progress.
- **Interactive live-arena widgets** — registration counter, countdown timer, and a
  "Guess the Saiyan" mini-game with true silhouettes and score tracking.
- **Retro sound design** — original chiptune music per fighter and UI SFX, mute-by-default.
- **Polish** — CRT scanline/vignette overlay, GSAP section reveals, Lenis smooth scroll,
  reduced-motion support, SEO metadata, `robots.txt` and `sitemap.xml`.

---

## Tech stack

### Core

| Concern | Technology | Version |
| --- | --- | --- |
| Framework | [Next.js](https://nextjs.org) (App Router) | 14.2.35 |
| UI library | [React](https://react.dev) | 18.3.1 |
| Language | [TypeScript](https://www.typescriptlang.org) | 5.9.3 |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 3.4.19 |
| PostCSS / Autoprefixer | postcss / autoprefixer | 8.5.28 / 10.5.6 |

### Animation & interaction

| Concern | Library | Version |
| --- | --- | --- |
| UI motion / micro-interactions | [Framer Motion](https://www.framer.com/motion/) | 13.2.0 |
| Scroll-linked timelines & reveals | [GSAP](https://gsap.com) + ScrollTrigger | ^3.15.0 |
| Buttery smooth scrolling | [Lenis](https://lenis.darkroom.engineering/) | ^1.3.26 |
| Icons | [lucide-react](https://lucide.dev) | 1.44.0 |

### Audio

| Concern | Library | Version |
| --- | --- | --- |
| Retro SFX + music playback | [Howler.js](https://howlerjs.com) | ^2.2.4 |
| Howler types | @types/howler | ^2.2.13 |

Music is written to disk as WAV loops; SFX are loaded lazily through Howler and gated by a
global mute flag (silent by default).

### State & tooling

| Concern | Library | Version |
| --- | --- | --- |
| Global UI state (intro, mute, active section) | [Zustand](https://zustand.docs.pmnd.rs/) | ^5.0.15 |
| Image processing (asset pipeline + optimization) | [sharp](https://sharp.pixelplumbing.com/) | ^0.35.4 |
| Linting | ESLint + eslint-config-next | 8.57.1 / 14.2.35 |

### Fonts (via `next/font/google`)

| Token | Font | Usage |
| --- | --- | --- |
| `--font-display` | Saira Condensed | Headings, buttons |
| `--font-body` | Manrope | Body copy |
| `--font-pixel` | Press Start 2P | Pixel UI, labels, dialogue |
| `--font-terminal` | VT323 | Terminal/dialogue text |

---

## Getting started

**Prerequisites:** Node.js `>=18.17.0` and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run Next.js lint |

> Note: `npm run lint` triggers an interactive ESLint setup the first time because no
> dedicated `.eslintrc` ships with this repo. Type checking is covered by `npx tsc --noEmit`.

---

## Project structure

```
.
├── public/
│   ├── audio/            # per-fighter theme loops (goku/vegeta/piccolo/gohan.wav)
│   ├── figures/          # transparent character cut-outs (*.webp)
│   ├── hero/             # desert parallax layers (sky/mesas/mountains/hills/sand)
│   ├── sfx/              # UI sound effects (blip/confirm/boot/error.wav)
│   └── *.jpg             # source artwork + logo + hero backdrop
├── scripts/              # asset generators (Node ESM, run with `node`)
│   ├── generate-sfx.mjs
│   ├── generate-themes.mjs
│   └── make-figures.mjs
├── src/
│   ├── app/              # App Router: layout, page, globals, robots, sitemap
│   ├── components/
│   │   ├── layout/       # Navbar, PageBackdrop, SmoothScroll, SectionWrapper
│   │   ├── sections/     # page sections (Hero, DragonLoader, Timeline, FAQ, …)
│   │   ├── ui/           # pixel UI kit (PixelButton, DialogueBox, CRTOverlay, …)
│   │   └── shared/       # DragonBall, AuraFigure, EnergySphere, SectionHeading
│   ├── constants/        # content.ts (copy/data) + fighters.ts (themes)
│   ├── context/          # ThemeContext (active fighter → CSS vars)
│   ├── hooks/            # useIntroGate, useSound, useTypewriter, useScrollReveal, …
│   ├── lib/              # animations, color, music, sfx, site
│   ├── store/            # useUiStore (Zustand)
│   └── types/            # shared TypeScript types
├── .opencode/skills/     # design/build spec used during development
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## How it works

### Boot sequence & fighter select (`src/components/sections/DragonLoader.tsx`)

- Rendered full-screen (`z-9999`) whenever `introSeen` is false. **Not persisted**, so a
  hard refresh replays the intro.
- Phase 1 (`intro`): a "DRAGON RADAR" console, a typewriter monologue (`useTypewriter`), a
  bobbing Goku cut-out, and a Skip control.
- Phase 2 (`selection`): a strip of fighter cards. Hovering shrinks the others and expands
  the hovered card (`flex-basis` transitions). Selecting a fighter calls `setFighter`,
  starts that fighter's theme, and marks the intro complete.

### Theming (`src/context/ThemeContext.tsx`)

`setFighter(id)` writes the fighter's `accent`, `accent-2`, and `accent-soft` to
`:root` as CSS variables and persists the choice in `sessionStorage`. Every surface that
uses `var(--accent*)` recolours instantly.

### Hero parallax (`src/components/sections/Hero.tsx`)

`useScroll` + `useTransform` map section scroll progress to per-layer `y` offsets (sky stays
fixed; mesas/mountains/hills/sand sweep at increasing rates). Ambient ki embers, a floating
Dragon Ball, and flying Goku/Trunks add motion.

### Global backdrop (`src/components/layout/PageBackdrop.tsx`)

A fixed layer behind `<main>`: dark horizon gradient, dimmed desert planes with slow
parallax, a blueprint grid, a vignette, and a blurred accent glow that animates to a
different corner per `activeSection` (tracked via `IntersectionObserver` in the Navbar).

### Sound (`src/lib/music.ts`, `src/lib/sfx.ts`, `src/hooks/useSound.ts`)

- `music.ts` is a singleton `Audio` manager with a `useThemeMusic()` hook; themes start on
  fighter selection and are toggled from the Hero.
- SFX go through `useSound` → `playSfx`, which respects the global mute flag (defaults to
  muted) and lazily imports Howler.

### Scroll system (`src/components/layout/SmoothScroll.tsx`)

Lenis is wired into GSAP's ticker and `ScrollTrigger`, paused until the intro is dismissed
and disabled entirely for `prefers-reduced-motion`.

---

## Fighter themes

Defined in `src/constants/fighters.ts`:

| Fighter | Accent | Secondary | Theme track |
| --- | --- | --- | --- |
| Goku | `#ff7a1a` (orange) | `#2f6fed` | Saiyan Spirit |
| Vegeta | `#f5c518` (gold) | `#2a3f9e` | Prince's Pride |
| Piccolo | `#9b6bff` (violet) | `#12a06f` | Namekian Vigil |
| Gohan | `#ff8c3d` (amber) | `#9b4bff` | Scholar's Resolve |

---

## Editing content

All copy, dates, and structured data live in **`src/constants/content.ts`** — event
details, stats, timeline milestones, FAQ, prizes, tracks/rules, team, sponsors, and gallery.
Fighter colours/names/quotes live in **`src/constants/fighters.ts`**.

---

## Asset pipeline

All generators are run with Node and write into `public/`. They use `sharp` where relevant.

```bash
node scripts/generate-sfx.mjs       # -> public/sfx/*.wav
node scripts/generate-themes.mjs    # -> public/audio/*.wav (per-fighter loops)
node scripts/make-figures.mjs       # -> public/figures/*.webp (white-bg keyed out)
```

- **`make-figures.mjs`** flood-fills near-white backgrounds from the image border (so
  interior whites like Vegeta's armour survive), erodes the anti-aliased fringe, strips any
  uniform edge frame from the source scan, trims, and exports transparent WebP.
- **`generate-themes.mjs`** synthesises original chiptune loops (square/saw/triangle
  oscillators, bass, arpeggio, drums) per fighter and writes 16-bit PCM WAV.
- **`generate-sfx.mjs`** synthesises the UI blip/confirm/boot/error sounds.

---

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used for `metadataBase`, OpenGraph, `robots.txt` and `sitemap.xml`. Falls back to the Vercel deployment URL, then `http://localhost:3000`. |

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. **vercel.com/new** → Import the repository (Next.js is auto-detected).
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable (your production URL).
4. Deploy. Pushes to `main` auto-deploy; pull requests get preview URLs.
5. Add a custom domain under **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` and
   redeploy.

Or via CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

---

## Accessibility & performance

- Semantic elements (`<button>`, `<nav>`, `<section>`) under the visual layer; the intro
  dialog uses `aria-modal` and the FAQ uses `aria-expanded`.
- All CSS animation and GSAP/Lenis motion respect `prefers-reduced-motion`.
- Images use `next/image` (AVIF/WebP) with sized layouts; the hero's above-the-fold art is
  `priority`-loaded.
- `sharp` powers local image optimization for the production server.

---

## Credits & licenses

- **Character art / logo / Kame House backdrop:** used as a fan homage; all rights belong
  to their respective owners.
- **Parallax hero layers:** "2d Desert Platformer Pack" by KingCreator11 — **CC0**
  (public domain), via [OpenGameArt](https://opengameart.org).
- **Sound & music:** original compositions generated in this repository.
- **Code:** built for this project; no proprietary text or assets were copied from any
  reference site.
