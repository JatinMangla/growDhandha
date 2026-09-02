# jatinmangla.dev

Marketing site for **Jatin Mangla** — freelance web & mobile development for Indian small businesses.
Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

Its single job is to turn a visitor into a WhatsApp message.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # already present locally; set the real URL before deploying
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Development server with hot reload                |
| `npm run build`     | Production build                                  |
| `npm run start`     | Serve the production build locally                |
| `npm run lint`      | ESLint (Next.js + TypeScript rules)               |
| `npm run typecheck` | `tsc --noEmit`, strict mode, no `any`             |

---

## Editing content (no component code required)

All copy lives in typed files under [`src/data/`](src/data/). Change a value there and it updates
everywhere it appears — including the SEO structured data and the sitemap.

| File                                                        | What it controls                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| [`src/data/site.ts`](src/data/site.ts)                       | Name, phone, email, WhatsApp number, location, nav links, years of experience |
| [`src/data/stats.ts`](src/data/stats.ts)                     | The four animated counters in the trust bar                        |
| [`src/data/services.ts`](src/data/services.ts)               | The six service cards                                              |
| [`src/data/differentiators.ts`](src/data/differentiators.ts) | The "why work with me" objection answers                           |
| [`src/data/projects.ts`](src/data/projects.ts)               | Portfolio cards (problem → solution → result)                      |
| [`src/data/process.ts`](src/data/process.ts)                 | The five process steps                                             |
| [`src/data/pricing.ts`](src/data/pricing.ts)                 | The three tiers, the custom option, and the assurance strip        |
| [`src/data/tech.ts`](src/data/tech.ts)                       | The tech stack groups and the ticker                               |
| [`src/data/faqs.ts`](src/data/faqs.ts)                       | The FAQ accordion — also emitted as `FAQPage` structured data      |
| [`src/data/posts.ts`](src/data/posts.ts)                     | Blog posts (empty at launch) and the planned-topics list           |

### Adding a project

Copy any object in `src/data/projects.ts`, change the fields, keep `id` unique. The grid handles
layout, animation and the monogram card art automatically.

### Publishing a blog post

Append one object to `posts` in `src/data/posts.ts`:

```ts
{
  slug: 'what-a-business-website-costs-in-india',
  title: 'What a business website should actually cost in India',
  description: 'One-line summary used on the listing and in search results.',
  publishedAt: '2026-09-15',
  readingMinutes: 6,
  tags: ['pricing', 'websites'],
  paragraphs: ['First paragraph.', 'Second paragraph.'],
}
```

The listing page, the post page, the sitemap entry and the metadata all pick it up with no other
changes. Until the array has entries, `/blog` shows a deliberate empty state listing what is coming.

---

## Design system

The identity is **"Ledger & Light"** — the warm ivory paper and indigo ink of a *bahi-khata*, lit
with saffron. It deliberately avoids the default dark-background-plus-neon-accent look.

| Token          | Light     | Dark      | Used for                              |
| -------------- | --------- | --------- | ------------------------------------- |
| `bg`           | `#FBF7F0` | `#090C1C` | Page ground                           |
| `surface`      | `#FFFDFA` | `#11162F` | Cards                                 |
| `fg`           | `#0E1330` | `#F0EEE8` | Body and heading text                 |
| `brand`        | `#FF7A18` | `#FF8A33` | Saffron — primary CTAs, the accent    |
| `brand-ink`    | `#B84A00` | `#FFA863` | Saffron used as text (WCAG AA on both)|
| `accent`       | `#10A37A` | `#2DC89B` | Jade — trust ticks and icons          |
| `whatsapp`     | `#0A7C5C` | `#2DC89B` | WhatsApp button fill (AA under its text) |
| `subtle`       | `#616987` | `#858DA6` | Small print — both tuned to pass AA at 12px |
| `gold`         | `#E8B325` | `#F0C54A` | Pricing and highlight moments         |

Type: **Sora** for display, **Plus Jakarta Sans** for body, both self-hosted through `next/font`.

**Signature element — the Ledger Rule.** A hairline with a travelling bead of light (`.ledger-rule`
in [`globals.css`](src/app/globals.css)). It marks every section the way a ruled ledger line marks an
entry, and it turns vertical to become the filling spine of the process timeline. Everything else on
the page stays deliberately quiet so it carries the boldness alone.

Tokens live as RGB triplets in [`src/app/globals.css`](src/app/globals.css) and are wired to Tailwind
in [`tailwind.config.ts`](tailwind.config.ts), so `bg-brand/10`-style opacity modifiers work in both
themes from one set of classes.

### Motion

Three techniques, chosen by what each costs the page.

**1. Scroll-driven CSS timelines — the bulk of it, at zero JavaScript.**
`animation-timeline: view()` and `scroll()` let the browser link an animation to scroll position
itself, off the main thread: no observer, no listener, nothing to hydrate. They drive the section
reveals (which genuinely scrub — drag the scrollbar and the content tracks it), the process spine
filling, the hero's parallax depth layers, the drift on project card art, and the scroll progress
bar. Chromium 115+, which is most of the Android traffic this site is built for; wrapped in
`@supports`, so Safari and Firefox fall back to the IntersectionObserver reveals and get a simpler
version of the same choreography.

**2. Pointer-reactive surfaces — desktop only.**
[`PointerFX`](src/components/ui/PointerFX.tsx) is one delegated listener that writes CSS custom
properties; every pixel of movement happens in CSS. Cards tilt in 3D and carry a light that tracks
the cursor, and the primary CTA leans toward the pointer. Gated on
`(hover: hover) and (pointer: fine)`, so a phone never executes a line of it. The element's rect is
cached on enter rather than measured per move — writing custom properties invalidates layout, and
re-measuring every frame is the usual way an effect like this turns into jank.

**3. Ambient loops.** A conic-gradient aurora ring travelling around the featured price tier and the
availability badge, driven by an `@property`-registered angle so it can actually interpolate; a band
of light crossing the hero grid; two counter-scrolling tech lanes.

The headline assembles word by word out of per-word clipping masks
([`SplitWords`](src/components/ui/SplitWords.tsx)) on CSS `animation-delay` — transform only, no
blur, and no waiting for hydration.

**Framer Motion** is left with exactly one job: the mobile menu
([`MobileMenu`](src/components/layout/MobileMenu.tsx)), which needs a real enter *and* exit sequence
with staggered children. It is code-split via `next/dynamic` and downloaded only when a visitor first
opens the menu, so it never touches the initial page load.

Everything animates transform and opacity only, on one easing curve
(`cubic-bezier(0.16, 1, 0.3, 1)`). Two effects were cut after measuring rather than kept for show: a
`scale(0.985)` on the reveals, which re-rasterised every glyph on each scroll frame and left text
soft while it moved, and a letter-spacing animation on headings, which would have forced layout on
every frame.

`prefers-reduced-motion` stops every loop, parallax, pointer reaction and entrance, resolving the
page to its finished state. With JavaScript disabled entirely nothing is hidden, because the hidden
states are scoped to a `.js` class set before first paint.

---

## How the contact form works

The form validates on the client ([`src/lib/validation.ts`](src/lib/validation.ts)), sanitises every
field, then opens WhatsApp with the enquiry pre-filled. **There is no backend and no third-party form
service**, so nothing a visitor types is stored anywhere, and there are no API keys to leak. An email
address is offered as a fallback.

If you later want enquiries in your inbox as well, add a route handler at `src/app/api/contact/` and
POST the same validated payload to it before the WhatsApp hand-off.

---

## SEO

Handled in-repo, nothing to configure:

- Per-page `<title>` and meta description; one `<h1>` per page.
- Open Graph and Twitter Card tags, with a 1200×630 preview card generated at build time
  ([`src/lib/og.tsx`](src/lib/og.tsx)) for WhatsApp and LinkedIn link previews.
- JSON-LD `@graph` with `ProfessionalService` / `LocalBusiness`, `Person`, `Service` offers and
  `FAQPage` ([`src/components/seo/JsonLd.tsx`](src/components/seo/JsonLd.tsx)).
- `sitemap.xml` and `robots.txt` generated from the route tree.
- [`public/llms.txt`](public/llms.txt) for AI search crawlers.
- `/blog` exists and is indexable from day one — it is the long-term organic strategy.

After the first deploy: add the domain to Google Search Console, submit `/sitemap.xml`, and set
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if you verify by meta tag.

---

## Deploying to Vercel

The repo is Vercel-ready — [`vercel.json`](vercel.json) pins the Mumbai region (`bom1`) so the site is
fast for Indian visitors, and security headers are set in [`next.config.mjs`](next.config.mjs).

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). No build settings to change.
3. Add the environment variables below under **Settings → Environment Variables**.
4. Deploy. Every push to `main` then deploys automatically, and every pull request gets a preview URL.

### Environment variables

| Name                                   | Required | Value                                                    |
| -------------------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | yes      | The live URL, e.g. `https://www.jatinmangla.dev` — no trailing slash |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`          | yes      | International format, digits only: `919540151718`        |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no       | Google Search Console token                              |

`NEXT_PUBLIC_SITE_URL` must be set correctly in production — canonical tags, the sitemap, `robots.txt`
and OG image URLs are all built from it. If it is missing, the site falls back to Vercel's own
production URL rather than to localhost, so a forgotten variable degrades instead of breaking; set it
anyway once a custom domain is attached, because only this value knows the real domain.

### Custom domain

Vercel → **Settings → Domains** → add the domain, then point the registrar at Vercel's nameservers or
add the `A` / `CNAME` records Vercel shows. HTTPS is issued automatically.

---

## Accessibility & performance

Measured with Lighthouse (mobile preset) against `npm run build && npm start`:

| Category       | Score  |
| -------------- | ------ |
| Performance    | 93     |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | 100    |

Performance is a median of five warm runs; it varies a few points with machine load, and should read
higher on Vercel's CDN than on a local server. Total blocking time is ~100ms and CLS is 0.005.

Accessibility is also verified separately with axe-core against the **resting** state in both themes
(zero WCAG A/AA violations). That matters here: Lighthouse samples mid-animation, so a fade-in caught
in flight reports contrast that the settled element does not actually have.

What is in place:

- Semantic landmarks, a skip link, logical heading order, exactly one `h1` per page.
- Visible focus rings on every interactive element.
- Touch targets 44×44px minimum, and no horizontal scroll — both verified in a real browser at
  360 / 390 / 414 / 768 / 820 / 1280 / 1440 / 1920px.
- WCAG AA contrast in both themes (`brand-ink` and `accent-ink` exist specifically so the accent
  colours are safe as text).
- Theme applied before first paint by a tiny inline script — no flash of the wrong palette.

### One thing worth knowing before you edit sections

Sections below the fold carry a `defer-render` class, which is
`content-visibility: auto` — worth about 20 Lighthouse points here, because the browser skips layout
and paint for a very long page until each section is near the viewport.

The catch is that a deferred section stands in at a placeholder height, so a jump to an anchor deep in
the page would land in the wrong place on a cold load — clicking "Pricing" landed on the process
timeline instead. [`AnchorScroll`](src/components/layout/AnchorScroll.tsx) fixes that: it removes the
deferral the moment a visitor navigates to an anchor, lets layout settle, then scrolls. The
initial-load win is already banked by that point.

**If you add a new section with an `id` that something links to, give it the `defer-render` class only
if it sits below the fold, and re-check that the anchor still lands correctly.**
