# BVRMA — Website (Next.js 16 + Sanity + Supabase)

Bilingual (EN/ID) marketing & member site for the **Bali Villa Rental Management Association**, including the **Bali Villa Connect 2026** event landing.

## Stack
- **Next.js 16** (App Router, RSC, Turbopack), React 19, TypeScript
- **Tailwind v4** + custom design tokens (see `design-system/MASTER.md`)
- **shadcn/ui** style primitives (in-tree, customized)
- **next-intl** for EN/ID routing
- **Sanity v3** headless CMS, Studio mounted at `/studio`
- **Supabase** for forms, applications, auth (Phase 4)
- **Resend** transactional email
- **Vercel** hosting (ISR + Edge)
- Hosted at `bvrma.org`. Staging at `staging.bvrma.org`. DNS at Domainesia.

## Quick start (local)

```bash
# 1. Install deps
npm install

# 2. Fill in .env.local (already pre-filled with public values).
#    For local Sanity writes/migration, also add SANITY_API_WRITE_TOKEN.

# 3. Run dev
npm run dev          # Next.js -> http://localhost:3000
npm run sanity:dev   # Sanity Studio (also accessible at /studio after `next dev`)

# 4. Type-check
npm run typecheck
```

## Env vars

See `.env.example` for full list. Categories:
- `NEXT_PUBLIC_*` — safe in client; commit-style.
- Server-only (Sanity write token, Supabase service role, Resend key, DB URL) — set in **Vercel dashboard -> Settings -> Environment Variables**, not in repo.

## Deployment (Vercel)

```bash
# Option A: connect GitHub repo to Vercel via dashboard.
# Option B: CLI
npm i -g vercel
vercel link
vercel env pull .env.local
vercel --prod
```

Custom domain: add `bvrma.org` (or `staging.bvrma.org`) in Vercel -> Settings -> Domains. Vercel will give CNAME / A records to set at Domainesia DNS.

## Sanity setup

```bash
# First time only:
npx sanity init --project tmmb51ho --dataset production
# Choose "yes" to add config to existing project.

# Mount Studio (already done in src/app/studio):
npm run dev
# -> http://localhost:3000/studio   (auth via Sanity)

# Deploy Studio to Sanity-hosted URL:
npm run sanity:deploy
```

CORS: in Sanity dashboard -> API -> CORS Origins, add `http://localhost:3000`, `https://staging.bvrma.org`, `https://bvrma.org`.

## Migrate from WordPress

```bash
# 1. Set SANITY_API_WRITE_TOKEN in .env.local (Editor token from sanity.io/manage)
# 2. Dry run first:
npm run migrate:wp-to-sanity -- --dry --types=member,sponsor

# 3. Real migration:
npm run migrate:wp-to-sanity -- --types=member,news,job,sponsor,committee,update
```

Source CPTs in WP:
- `our-member` (68 entries) -> `member`
- `news` (20) -> `news`
- `job` (20) -> `job`
- `our-sponsor` (4) -> `sponsor`
- `commitee` (10, sic) -> `committeeMember`
- `update` (1) -> `update`

After migration, manually:
1. Open Sanity Studio.
2. Translate any Indonesian fields (script copies EN to ID as initial value).
3. Re-upload high-quality logos for sponsors/members.
4. Set `orderRank` on speakers and committee members.

## Supabase setup

Open Supabase Dashboard -> SQL Editor -> paste & run `supabase/schema.sql`.

Creates: `contact_submissions`, `membership_applications`, `verification_submissions`, `job_applications`, `newsletter_subscribers` — all with RLS enabled.

## Project structure

```
bvrma-web/
├── src/
│   ├── app/
│   │   ├── [locale]/            # next-intl routes
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx         # Home
│   │   │   ├── (marketing)/     # about, sponsors, sustainability, contact
│   │   │   ├── (event)/         # bali-villa-connect, hotels, gallery
│   │   │   ├── (members)/       # directory, profile
│   │   │   ├── (content)/       # news, updates, job-ads, events
│   │   │   ├── board-committee/
│   │   │   ├── join-now/
│   │   │   └── ...
│   │   ├── api/contact/         # contact form handler
│   │   ├── studio/              # Sanity Studio mount
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css          # design tokens
│   ├── components/
│   │   ├── ui/                  # shadcn primitives
│   │   ├── site/                # navbar, footer, etc.
│   │   └── blocks/              # hero, stat-grid, pricing-tiers, etc.
│   ├── i18n/
│   ├── lib/
│   │   ├── sanity/
│   │   ├── supabase/
│   │   └── utils.ts
│   └── middleware.ts
├── messages/                    # en.json, id.json
├── sanity/schemas/              # Sanity schemas
├── sanity.config.ts
├── scripts/migrate/
├── supabase/schema.sql
└── design-system/MASTER.md
```

## Phase plan

- **Phase 0** — Setup (this commit). Repo, design system, env wiring.
- **Phase 1** — Marketing site (Home, BVC 2026, About, Sponsors, Sustainability, Contact).
- **Phase 2** — Editorial: News + Updates + Events + Job Ads (Sanity-driven).
- **Phase 3** — Member directory (Sanity), filtering & search.
- **Phase 4** — Auth + Member portal + Verification flow + Join Now form (Supabase).
- **Phase 5** — Cutover: bvrma.org DNS swap, redirects validated, Search Console resubmit.

Target launch: **20 May 2026** (BVC 2026 = 26 May 2026).

## Brand & content notes
- All marketing copy currently English; Indonesian fields auto-mirror EN at migration time and are translated via Sanity Studio.
- BVRMA logo: SVG not yet provided — placeholder (teal square) used; replace when SVG arrives.
- Sponsor & member logos: imported from WP via migration script; consider re-uploading hi-res versions.

## Security
- Never commit secrets. `.env*` is gitignored except `.env.example`.
- Service role keys go directly in Vercel env, not in repo.
- WP admin & cPanel passwords used during audit/migration must be rotated post-launch.
- All form endpoints rate-limited via Vercel + Supabase RLS.
