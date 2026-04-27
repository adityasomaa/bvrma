# BVRMA Design System — MASTER

Source of truth for visual & UX decisions. Page-specific overrides live in `design-system/pages/<page>.md`.

## Product Type
B2B trade association + flagship event landing (Bali Villa Connect 2026). Audience: villa owners, operators, regulators, hospitality investors.

## Pattern
Content-first hero → high-trust storytelling → strong CTA discipline. One primary CTA per screen (skill rule `primary-action`).

## Style
**Modern editorial × premium minimalism.**
- Restrained: no glassmorphism overload, no excessive shadows, no decorative animation.
- Hero-driven photography on key landing pages.
- Bento grids for stats and speakers.

## Color
Token names live in `src/app/globals.css`.
- **Primary** — Deep teal, ocean (`oklch(0.42 0.09 195)` at 600). Bali sea & nature.
- **Accent** — Warm sand (`oklch(0.80 0.12 75)` at 400). Premium, coastal luxury.
- **Surfaces** — Paper / ink scale; light mode default, dark mode designed in tandem.
- **Semantic** — `success` green, `danger` red, `warning` amber, `info` blue.
- All text/background pairs verified ≥4.5:1 (WCAG AA).
- Functional color always paired with icon/text (skill rule `color-not-only`).

## Typography
- **Display:** Fraunces (serif, premium feel) — h1, h2, h3.
- **Body/UI:** Inter — paragraphs, labels, navigation. Excellent multilingual including Indonesian.
- **Mono:** JetBrains Mono — code/numbers; tabular figures for prices.
- Base 16px. Scale 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64.
- Line-height 1.5 body / 1.15 headings.
- `font-feature-settings: 'rlig' 1, 'calt' 1, 'ss01' 1` enabled site-wide.

## Effects
- Radius scale: `xs 0.25 / sm 0.375 / md 0.5 / lg 0.75 / xl 1 / 2xl 1.25 rem`.
- Shadows: subtle, `shadow-sm` on cards, `shadow-md` on hover. No harsh drop-shadows.
- Borders: 1px subtle borders for grouping, never decorative.

## Motion
- Micro-interactions 150–300ms (skill rule `duration-timing`).
- Spring easing for natural feel.
- Exit faster than enter.
- Always respect `prefers-reduced-motion`.
- Animations interruptible — user input cancels in-progress animation.

## Components
- shadcn/ui as the base library.
- Icons from Lucide. **No emoji icons** anywhere (skill rule `no-emoji-icons`).
- Buttons: 6 variants (primary, accent, outline, ghost, link, destructive), 4 sizes.

## Accessibility (CRITICAL)
- WCAG AA target.
- Focus ring on all interactive elements (`:focus-visible`).
- 44×44px minimum touch target.
- Alt text on every meaningful image.
- Keyboard navigation full coverage.
- Tab order matches visual order.
- Screen reader labels on icon-only buttons.

## Performance
- Image: WebP/AVIF preferred via Next.js Image + Sanity CDN.
- Lazy load below-fold media.
- Font: `display: swap` (next/font handles).
- ISR: 60s revalidate on Sanity content; on-demand revalidation via webhook.
- Bundle split per route + RSC by default.

## Layout
- Mobile-first.
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536.
- Container max-width: `max-w-7xl` (1280px) for full-width sections, `max-w-6xl` for standard, `max-w-3xl` for narrow.
- Spacing scale 4/8 multiples.

## Forms
- Visible label always (not placeholder-only).
- Inline validation on blur.
- Error message states cause + recovery path.
- Loading button states disabled during submit.
- Auto-focus first invalid field on submit error.

## Anti-patterns to Avoid
- ❌ Emoji as icon.
- ❌ Removing focus rings.
- ❌ Animating width/height (use transform/opacity).
- ❌ Color as the only signal.
- ❌ Multiple primary CTAs per screen.
- ❌ Glassmorphism overload.
- ❌ Tight letter-spacing on body text.

## Per-page Overrides
See `design-system/pages/`. None defined yet.
