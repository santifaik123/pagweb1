# NUVIK Project Context

Last updated: 2026-08-04

This repository is the clean NUVIK Digital website export named `pagweb1`.
It contains only the public NUVIK marketing site, product pages, service pages,
portfolio, SEO, AI-search, and performance files.

## Stack

- Next.js 16 App Router
- React 19
- CSS Modules for the NUVIK visual system
- `next/image` with static export compatibility
- Local public assets in WebP/SVG/PNG

## Local Development

```bash
npm run dev -- --port 4173
```

Preview:

```text
http://127.0.0.1:4173/
```

Validation:

```bash
npm run lint
npm run build
```

`next.config.ts` uses `output: "export"`, so `npm run build` also creates the
static HTML export in `out/`.

## Important Routes

- `/`: homepage.
- `/servicios`: services and pricing entry page.
- `/servicios/[slug]`: complete service detail pages.
- `/contacto`: NUVIK contact/entity page.
- `/nuvik-digital`: brand/entity page for search and AI answer engines.
- `/dar.io`: Dar.io product page.
- `/nexus`: NexusChatBot product page.
- `/automatizaciones`: Automatizaciones product page.
- `/portafolio`: editorial portfolio grid.
- `/terminos`: terms and conditions.
- `/privacidad`: privacy policy.
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/llms.txt`, and
  `/llms-full.txt`: crawler, SEO, and AI-search support files.

## Key Files

- `components/marketing/NuvikHome.tsx`: homepage, header, hero, Suite carousel,
  About, Services, Process, FAQ, footer, and quote-panel triggers.
- `components/marketing/NuvikHome.module.css`: main responsive visual system.
- `components/marketing/NuvikContactPanel.tsx`: shared quote/contact panel.
- `components/marketing/NuvikServices.tsx`: services/pricing overview.
- `components/marketing/NuvikServicePage.tsx`: service detail template.
- `components/marketing/NuvikProductPage.tsx`: product page template.
- `components/marketing/NuvikPortfolio.tsx`: portfolio grid.
- `components/marketing/NuvikTerms.tsx`: terms page.
- `components/marketing/NuvikInfoPage.tsx`: reusable legal/entity/contact page.
- `lib/nuvik-services.ts`: service list and groups.
- `lib/nuvik-service-content.ts`: detailed service-page copy.
- `lib/seo.ts`: metadata, canonical URLs, JSON-LD helpers, and brand constants.
- `components/seo/JsonLd.tsx` and `components/seo/Analytics.tsx`: SEO scripts.
- `components/integrations/NuvikNexusChat.tsx`: non-intrusive NUVIK chat client connected to NexusChat on Render.
- `netlify/functions/create-lead.mjs`: validated, rate-limited contact persistence in Neon.
- `netlify.toml`: Netlify static export, functions, redirects, cache, and security headers.

## Production Integrations

- Microsoft Clarity and PostHog are initialized globally from public project IDs; environment variables can override them.
- Contact forms POST to `/.netlify/functions/create-lead` and require the private `DATABASE_URL` Netlify runtime variable.
- The lead function creates or extends the `leads` table safely, applies honeypot/content checks, Netlify rate limiting, database rate limiting, and stores only a salted IP hash.
- Nuvi connects directly to the public NexusChat API on Render with tenant `nuvik`. The Groq API key remains only in the Render service environment and must never use a `NEXT_PUBLIC_` variable.

## Assets

- Hero: `public/assets/hero/nuvik-hero-cinematic-2026-06-24.webp`
- Dar.io: `public/assets/sections/dar-io-showcase-2026-06-23.webp`
- NexusChatBot: `public/assets/sections/nexus-chatbot-showcase-2026-06-23.webp`
- Automatizaciones: `public/assets/sections/automations.webp`
- Sitios a medida: `public/assets/sections/sites.webp`
- Interoperability/service visual: `public/assets/sections/interoperability.webp`
- ITO-e (caso de cliente en `/portafolio`): `public/assets/sections/ito-e-showcase.webp`
- NUVIK logo assets: `public/assets/logos/nuvik-symbol.webp` and
  `public/assets/logos/nuvik-symbol-white.png`
- MachReach mark: `public/assets/logos/machreach.svg` (flame + libro, sin squircle morado — igual al logo vigente de machreach.com)
- MachReach (tarjeta de `/portafolio`): `public/assets/sections/machreach-showcase.svg`

## Current Experience

The homepage follows this order:

1. Diagnostic announcement bar at the top.
2. Fixed liquid-glass header.
3. Pinned cinematic hero with NUVIK-owned background and headline.
4. Suite carousel starting directly with product tabs.
5. About section: "No somos una agencia tradicional."
6. Services section.
7. Process section with Cal meeting CTA.
8. FAQ.
9. Footer with social links, navigation, and legal links.
10. Shared quote panel mounted at page root.

## Clean Export Notes

- The repo is prepared to publish as source and as static HTML via `out/`.
- Keep future work scoped to NUVIK marketing, product, service, portfolio, SEO,
  AI-search, and performance tasks.
