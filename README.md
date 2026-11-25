# Northlight Studio

A production-ready marketing + portfolio site for **Northlight Studio**, a
Copenhagen design practice. Twelve case studies with filtering, live search,
detail views, engagement state and a full design system — built to deploy for
free on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)

---

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Indigo | `#4F46E5` | Anchor hue, focus, primary accent |
| Magenta | `EC4899` | Mid gradient, likes, validation |
| Amber | `#F59E0B` | Warm gradient end, highlights |
| Neutrals | `#000` / `#FFF` | All surfaces, rules and text — black/white with alpha steps only |

- **Gradients are the signature.** One linear `115deg` three-colour gradient
  (`.grad`, `.grad-text`) plus a three-blob radial mesh (`.mesh`). Exactly one
  gradient animates slowly: the 26s aurora drift on the hero wordmark
  (`.grad-text-animated`).
- **Three fonts only**, loaded with `next/font` (zero layout shift):
  **Sora** headings · **Inter** body · **DM Mono** labels, numbers and
  catalogue micro-copy.
- **Catalogue grid.** Every section is numbered `[ 04 / SELECTED WORK ]`, and
  the gallery tiles as 12 / 7+5 / 5+7 so the asymmetric grid always resolves.

## Features

- Sticky navigation that changes from transparent → glass on scroll, with a
  spring active-section indicator driven by `IntersectionObserver`
- Category filters (Branding · Web · Mobile Apps · Illustration · Motion) with
  animated layout reflow, and live search across title, client, tools and tags
- Full-screen project detail: large preview, write-up, tools, year, tags and
  prev/next navigation (`Esc`, `←`, `→` supported)
- Like + save counters persisted in `localStorage` between visits
- Dark / light mode persisted, applied before first paint to avoid a flash
- Scroll reveals, parallax imagery, desktop cursor-following gradient glow
- Animated stat counters, autoplaying testimonial slider with swipe and
  pause-on-hover, contact form with live validation + loading + success states,
  newsletter with validation and a confirmation toast
- Page-load wipe, hover micro-interactions on every button and card
- `prefers-reduced-motion` honoured globally; skip link, focus rings, ARIA
  labelling and keyboard paths throughout

## Getting started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev        # http://localhost:3000

# 3. type-check + production build
npm run typecheck
npm run build
```

**No environment variables are required.** There is no paid service, no API key
and no backend: all content lives in `src/data/site.ts`, engagement state lives
in `localStorage`, and forms are front-end only. Set `DATABASE_URL` only if you
choose to wire up the optional Postgres/Drizzle example in `src/db`.

## Deploy (free)

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects
   **Next.js**. No configuration, no environment variables.
3. Click **Deploy**. Every push to `main` creates a new preview/production
   deployment.

Or from the CLI:

```bash
npm i -g vercel
vercel          # link the repo and deploy
vercel --prod   # production
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts (Sora/Inter/DM Mono), metadata, theme script
    page.tsx          # section composition
    globals.css       # tokens, gradients, glass, grain, motion
  components/
    Navbar.tsx        # sticky nav + mobile sheet + theme toggle
    Hero.tsx          # black cover plate, parallax, aurora wordmark
    Marquee.tsx       # service ticker
    Stats.tsx         # animated counters
    Work.tsx          # filters, search, gallery, detail routing
    ProjectCard.tsx   # card + like/save controls
    ProjectDetail.tsx # full-screen case study sheet
    Studio.tsx        # about, overlapping imagery, services
    Testimonials.tsx  # autoplay slider
    Contact.tsx       # validated form
    Footer.tsx        # newsletter, links, © 2026 MahmudDesigns
  data/site.ts        # projects, stats, testimonials, copy
  lib/store.ts        # theme + likes/saves stores (localStorage)
```

## Notes on imagery

Project visuals use free **Unsplash** CDN URLs. `SmartImage` renders a
three-colour mesh gradient underneath every photo, so a failed or slow request
degrades to an on-brand gradient rather than a broken frame.

---

© 2026 MahmudDesigns. All rights reserved.
