# growDhandha

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
| `npm run lint`      | ESLint (Next.js + TypeScript rules, flat config)  |
| `npm run typecheck` | `tsc --noEmit`, strict mode, no `any`             |
| `npm test`          | Vitest unit and route tests                        |
| `npm run test:e2e`  | Playwright browser tests against a production build (run `build` first) |
| `npm run lighthouse`| Lighthouse CI budgets from `lighthouserc.json` (run `build` first) |

Every push and pull request runs typecheck → lint → unit tests → build → browser tests → Lighthouse
in GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)). Failed browser tests upload
a trace; Lighthouse reports are always uploaded as a build artifact.

First time running the browser tests locally: `npx playwright install chromium`. For Lighthouse
locally, point it at that browser, e.g. in PowerShell
`$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright" -Recurse -Filter chrome.exe | Select-Object -First 1).FullName`.

---

## Editing content (no component code required)

All copy lives in typed files under [`src/data/`](src/data/). Change a value there and it updates
everywhere it appears — including the SEO structured data and the sitemap.

| File                                                        | What it controls                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| [`src/data/site.ts`](src/data/site.ts)                       | Name, phone, email, WhatsApp number, location, nav links, years of experience |
| [`src/data/pricing.ts`](src/data/pricing.ts)                 | **Every price on the site** — hero, FAQ, structured data and OG card all derive from it |
| [`src/data/stats.ts`](src/data/stats.ts)                     | The trust-bar counters, and `headlineUsers` quoted elsewhere       |
| [`src/data/services.ts`](src/data/services.ts)               | The six service cards                                              |
| [`src/data/differentiators.ts`](src/data/differentiators.ts) | The "why work with me" objection answers                           |
| [`src/data/projects.ts`](src/data/projects.ts)               | Portfolio cards (problem → solution → result), labelled by `kind`  |
| [`src/data/testimonials.ts`](src/data/testimonials.ts)       | Client quotes — the section stays hidden while this is empty       |
| [`src/data/process.ts`](src/data/process.ts)                 | The five process steps                                             |
| [`src/data/tech.ts`](src/data/tech.ts)                       | The tech stack groups and the ticker                               |
| [`src/data/faqs.ts`](src/data/faqs.ts)                       | The FAQ accordion — also emitted as `FAQPage` structured data      |
| [`src/data/posts.ts`](src/data/posts.ts)                     | The five published articles and the planned-topics list            |

### Adding a project

Copy any object in `src/data/projects.ts`, change the fields, keep `id` unique. The grid handles
layout, animation and the monogram card art automatically. Set `kind` honestly (`product`, `client`
or `employer`) — it is printed on the card. Drop a screenshot in `public/projects/` and set `image` to
replace the monogram. Apps behind a private login should link `repo`, not `href`.

### Recently shipped (automatic, from GitHub)

Add the **`showcase`** topic to any public repo on GitHub (repo page → ⚙ next to *About* → Topics).
Within a day it appears in the "Recently shipped" strip under the portfolio, and in `llms-full.txt`
([`src/lib/github.ts`](src/lib/github.ts), revalidated daily). Repos that already have a full card in
`projects.ts` are not repeated. If GitHub is unreachable the section simply does not render.

### The Hindi page (`/hi`)

A single-page pitch in Hindi, for owners more at ease reading Hindi: services, pricing, process,
FAQ and contact, with WhatsApp messages pre-filled in Hindi. Copy lives in
[`src/data/hi.ts`](src/data/hi.ts); **prices and the users figure are pulled from `pricing.ts` and
`stats.ts`**, so it can never quote a different number. The wording itself is hand-maintained — when
English copy changes in substance (a timeline, a support period), update the matching line there,
and have a native speaker read new text before it goes live.

It uses the device's own Devanagari font (Noto Sans Devanagari on Android, Nirmala UI on Windows,
Kohinoor Devanagari on Apple) instead of downloading one; a web font cost 122 KB and about a second of
LCP. Both language versions link to each other with `hreflang`, and "हिंदी में पढ़ें" appears in the
hero and footer.

### Publishing a blog post

Append one object to `posts` in `src/data/posts.ts`:

```ts
{
  slug: 'url-safe-slug',
  title: 'The question, asked the way a customer would ask it',
  description: 'One-line summary for the listing and search results.',
  publishedAt: '2026-09-15',
  updatedAt: '2026-09-15',
  readingMinutes: 6,
  tags: ['pricing', 'websites'],
  // The direct answer. Rendered first on the page and used as the summary
  // everywhere else — extraction models take the first answer they find, so
  // burying it under preamble is the usual reason a page gets passed over.
  answer: 'A one-sentence answer to the title.',
  body: [
    { kind: 'paragraph', text: '…' },
    { kind: 'heading', text: 'A question-shaped heading' },
    { kind: 'list', items: ['…'], ordered: false },
    { kind: 'callout', text: 'The line worth quoting on its own.' },
    { kind: 'qa', question: '…', answer: 'A self-contained answer.' },
  ],
}
```

`qa` blocks are rendered *and* emitted as `FAQPage` structured data, so write answers that stand
alone without the surrounding article. The listing, the post page, the sitemap entry, the metadata,
the JSON-LD and the markdown representation all pick the new post up with no other changes.

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
availability badge, driven by an `@property`-registered angle so it can actually interpolate. That one
repaints every frame, so it runs three laps and rests (another lap on hover) instead of looping
forever. Also a band of light crossing the hero grid, and two counter-scrolling tech lanes. The two
large blurred hero washes hold still below the `sm` breakpoint.

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
field, then opens WhatsApp with the enquiry pre-filled. The phone field is optional — WhatsApp already
shows the sender's number. Nothing a visitor types is stored anywhere.

**Lead backup (optional).** Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` and each submission is also
beaconed to [`/api/contact`](src/app/api/contact/route.ts) and emailed to you, so an enquiry is not lost
when someone opens WhatsApp and never presses send. The route re-validates server-side, rejects
cross-origin posts, drops honeypot submissions and rate-limits per IP. The form's privacy line and
[`/privacy`](src/app/privacy/page.tsx) change their wording automatically when this is on.
Redeploy after setting the variables — the homepage is static.

## Measuring conversions

Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (Umami Cloud, free, cookieless) and every WhatsApp, call and email
tap is recorded as `whatsapp_click` / `call_click` / `email_click`, labelled with where on the page it
happened (`hero`, `header`, `floating`, `tier-business`, `faq`, …). One delegated listener in
[`ConversionTracking`](src/components/layout/ConversionTracking.tsx) does this — buttons need no
analytics code. To label a new CTA explicitly, add `data-cta="name"`; otherwise the id of its section
is used. Unset, no script loads at all.

---

## SEO and AI search

Handled in-repo, nothing to configure:

- Per-page `<title>` and meta description; exactly one `<h1>` per page.
- Open Graph and Twitter Card tags, with a 1200×630 preview card generated at build time
  ([`src/lib/og.tsx`](src/lib/og.tsx)) for WhatsApp and LinkedIn link previews.
- A consolidated JSON-LD `@graph` ([`JsonLd.tsx`](src/components/seo/JsonLd.tsx)) holding
  `ProfessionalService`/`LocalBusiness`, `Person`, `Service` offers with **real INR prices**, a
  `HowTo` built from the five process steps, and `FAQPage`. Articles add `BlogPosting`,
  `BreadcrumbList` and their own `FAQPage` ([`ArticleJsonLd.tsx`](src/components/seo/ArticleJsonLd.tsx)).
  Every entity cross-references by `@id`, so there is one business and one person across the site.
- `sitemap.xml` and `robots.txt` generated from the route tree.
- `/blog` with five published guides, a dedicated `/pricing` page, and `/privacy`.
- The business is declared as a **service-area business**: no street address or postcode is published,
  because there is no shopfront and an invented one breaks Google's local guidelines.
- Expect no FAQ or HowTo *rich results* from Google (restricted to government/health sites and retired,
  respectively, since 2023). The markup still helps other engines and AI answers read the page.

### AI crawlers

[`src/app/robots.ts`](src/app/robots.ts) names every significant AI crawler explicitly — training
(`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, …) and answering (`OAI-SearchBot`,
`Claude-SearchBot`, `PerplexityBot`, …) — all currently allowed.

**If you change that policy, read the comment in that file first.** A crawler obeys only the single
most specific group matching its name and does not fall back to `*`, so every named group has to
repeat `Disallow: /api/`. Adding a bot without that would grant it *more* access than the wildcard.

### Markdown representations

`/llms.txt` and `/llms-full.txt` are generated from `src/data/*` by
[`content-markdown.ts`](src/lib/content-markdown.ts), so they cannot drift the way the previous
hand-written file did. Any page is also available as markdown with a `.md` suffix (`/pricing.md`,
`/blog/<slug>.md`, `/index.md`), through static rewrites in [`next.config.ts`](next.config.ts) to
[`/api/md`](src/app/api/md/[[...path]]/route.ts); each page advertises its own `.md` alternate.

Two things worth knowing before you invest more here:

- **Calibrate the expectation.** The best public measurement of markdown variants found they receive
  a negligible share of AI citations, and Google has stated `llms.txt` does not influence ranking.
  What they reliably do is cut an agent's token cost. Treat them as cheap insurance, not a lever.
- **The path travels as route segments, never a query string.** A query added by a rewrite does not
  reliably reach the handler, and every `.md` URL once silently returned the homepage with a 200. A
  test in [`routes.test.ts`](src/app/api/__tests__/routes.test.ts) guards both the handler and the
  rewrite rules against that coming back.
- `Accept: text/markdown` negotiation was removed with the middleware: it ran an edge function on
  every human page view for a format that earns almost no citations.

### Freshness

`lastModified` in the sitemap comes from real content dates — `contentUpdatedAt` in
[`site.ts`](src/data/site.ts) for static pages, and each post's `updatedAt`. It previously sent
`new Date()`, so every deploy claimed the homepage had just changed; crawlers discount a sitemap that
always says everything is new. **Bump `contentUpdatedAt` when you edit real content.**

### After deploying

1. Submit the sitemap to **Bing Webmaster Tools** first — ChatGPT search uses the Bing index — then
   Google Search Console. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if you verify by meta tag.
2. Create a **Google Business Profile** for Delhi. For "web developer in Delhi" style questions this
   is what assistants reach for, and it is free.
3. Run `node scripts/indexnow.mjs https://your-domain.com` after a content deploy to notify Bing and
   Yandex immediately. It reads the URL list from the live `sitemap.xml`, so there is no list to keep
   in sync. The key file in `public/` must stay published; it is not a secret.

---

## Deploying to Vercel

The repo is Vercel-ready — [`vercel.json`](vercel.json) pins the Mumbai region (`bom1`) so the site is
fast for Indian visitors, and security headers — including a Content-Security-Policy — are set in
[`next.config.ts`](next.config.ts). Adding any third-party script or service means adding its origin to
that policy; the browser console names anything it blocks.

> **Plan note.** Vercel's free Hobby plan is for non-commercial use only. A business site — this one, or
> a client's — belongs on Vercel Pro, or on Cloudflare Pages / Netlify, whose free tiers allow
> commercial use.

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repository.
2. Framework preset: **Next.js** (auto-detected). No build settings to change.
3. Add the environment variables below under **Settings → Environment Variables**.
4. Deploy. Every push to `main` then deploys automatically, and every pull request gets a preview URL.

### Environment variables

| Name                                   | Required | Value                                                    |
| -------------------------------------- | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | yes      | The live URL, e.g. `https://grow-dhandha-three.vercel.app` — no trailing slash |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`          | yes      | International format, digits only: `919540151718`        |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | no       | Google Search Console token                              |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`         | no       | Turns on conversion analytics (Production only)          |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`   | no       | Both set = contact-form enquiries are also emailed       |
| `CONTACT_FROM_EMAIL`                   | no       | Sender on a Resend-verified domain                       |
| `GITHUB_TOKEN`                         | no       | Lifts the GitHub rate limit for "Recently shipped"       |

`NEXT_PUBLIC_SITE_URL` must be set correctly in production — canonical tags, the sitemap, `robots.txt`
and OG image URLs are all built from it. If it is missing, the site falls back to Vercel's own
production URL rather than to localhost, so a forgotten variable degrades instead of breaking; set it
anyway once a custom domain is attached, because only this value knows the real domain.

### Custom domain

Vercel → **Settings → Domains** → add the domain, then point the registrar at Vercel's nameservers or
add the `A` / `CNAME` records Vercel shows. HTTPS is issued automatically.

---

## Accessibility & performance

Measured with Lighthouse CI (default mobile emulation, simulated throttling) against
`npm run build && npm start`, on 2026-09-24:

| Page                       | Performance | Accessibility | Best practices | SEO |
| -------------------------- | ----------- | ------------- | -------------- | --- |
| `/` (median of 5 runs)     | 87          | 100           | 100            | 100 |
| `/hi`                      | 87          | 100           | 100            | 100 |
| `/pricing`                 | 90          | 100           | 100            | 100 |
| `/blog/…` (an article)     | 90          | 100           | 100            | 100 |

Homepage LCP is ~3.4 s and total blocking time ~210 ms under that throttling; CLS is 0. An earlier
version of this README claimed 93 for the homepage; on the same machine the pre-audit build measured a
median of 81, so treat single numbers with suspicion. **Local performance scores swing by 20+ points
between runs** — compare medians of several runs, build against build, before concluding anything.
CI enforces accessibility, best practices and SEO ≥ 95 and CLS ≤ 0.1 as hard failures, and only warns
on performance for that reason.

Accessibility is verified with axe-core in the Playwright suite against the **resting** state in both
themes (zero WCAG A/AA violations, desktop and phone). That matters here: Lighthouse samples
mid-animation, so a fade-in caught in flight reports contrast that the settled element does not
actually have.

Two measured lessons worth keeping:

- **Don't prefetch from links that appear on every page.** The header logo's `<Link>` prefetched the
  whole homepage payload on every page load; `prefetch={false}` removed ~43 KB of requests per view.
- **Don't download a Devanagari web font.** See the Hindi page section above.

What is in place:

- Semantic landmarks, a skip link, logical heading order, exactly one `h1` per page.
- Visible focus rings on every interactive element.
- Touch targets 44×44px minimum, and no horizontal scroll — both verified in a real browser at
  360 / 390 / 414 / 768 / 820 / 1280 / 1440 / 1920px.
- WCAG AA contrast in both themes (`brand-ink` and `accent-ink` exist specifically so the accent
  colours are safe as text).
- Theme applied before first paint by a tiny inline script — no flash of the wrong palette.
- Hidden elements are genuinely hidden: the floating WhatsApp button and collapsed FAQ answers are
  `inert` while not visible, and the mobile menu traps focus and returns it to the toggle.

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
