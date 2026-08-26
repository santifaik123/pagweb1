# NUVIK Project Instructions

Run the local server yourself and open the preview in the in-app browser when visual validation is needed. Do not give server-start instructions if you can run it.

Read `PROJECT_CONTEXT.md` before making NUVIK changes.

## Scope

This repository is only the NUVIK Digital website. Keep future work scoped to the public NUVIK marketing site, product pages, service pages, portfolio, SEO, AI-search, and performance.

## Durable Product Decisions

- Keep the Palantir-inspired monochrome editorial direction for NUVIK.
- Header uses dark high-contrast glassmorphism with the NUVIK white logo asset.
- Header logo symbol and "NUVIK" wordmark must stay optically centered.
- On mobile, the menu and "Cotiza ahora" controls stay in the top NUVIK header. Do not add a bottom dock.
- The homepage hero uses `public/assets/hero/nuvik-hero-cinematic-2026-06-24.webp`.
- The hero uses a pinned overlay effect: the NUVIK-owned background visual, overlay, and headline stay together while the Suite section rises above them.
- Keep the hero shell at 200vh/200svh with Suite offset by -100vh/-100svh unless intentionally redesigning that interaction.
- Do not use Palantir-sourced videos or assets.
- The hero shows a centered solid headline and a large bottom-aligned masked "nuvik digital" wordmark.
- The homepage does not render the service marquee below the hero.
- The Suite section starts directly with product tabs/carousel; do not show the large intro headline above it.
- Suite and About use the same warm white background.
- About headline is "No somos una agencia tradicional."; do not show founder/executive names.
- Services default category is "Automatizacion & software".
- Contact is not a homepage section; "Cotiza ahora" opens the shared quote panel.
- Footer starts directly with social links/navigation. Do not restore the footer logo/menu header or large CTA tiles.
- Footer navigation does not include "Volver arriba".
- Public email is `contacto@nuvik.digital`.
- Instagram: `https://www.instagram.com/nuvikdigital/`
- LinkedIn: `https://cl.linkedin.com/company/nuvikdigital`
- Terms open `/terminos`; privacy opens `/privacidad`.
- Pricing lives on `/servicios`.
- Process includes compact "Agenda una reunion" CTA linking to `https://cal.com/nuvik.digital/15min`.
- MachReach opens externally at `https://machreach.com/`.
- MachReach is a study platform for university students, not growth/prospecting software. Describe it around focus sessions, course tracking, AI flashcards, AI quizzes, Focus + XP, and Focus Guard.
- Dar.io uses `public/assets/sections/dar-io-showcase-2026-06-23.webp`.
- NexusChatBot uses `public/assets/sections/nexus-chatbot-showcase-2026-06-23.webp`.
- Dar.io and NexusChatBot visuals should render in 16:9 cover frames without letterboxing or pillarboxing.
- The Suite carousel supports touch/mouse horizontal swipe while preserving vertical page scroll.
- Suite visual stamps are dark liquid-glass and show only product name plus a 3-5 word benefit line.
- Product links open `/dar.io`, `/nexus`, `/automatizaciones`, and `/servicios`; MachReach opens externally.
- The Suite carousel closes with ITO-e (`06`), a client case that opens `https://www.ito-e.cl/` externally.
- `/portafolio` uses a Palantir Newsroom-inspired editorial portfolio grid for Dar.io, NexusChatBot, Automatizaciones, Sitios a medida, and MachReach.
- Offscreen imagery remains lazy-loaded and public raster visuals stay in `public/assets/hero`, `public/assets/sections`, and `public/assets/logos`.

## Validation

Run after meaningful changes:

```bash
npm run lint
npm run build
```
