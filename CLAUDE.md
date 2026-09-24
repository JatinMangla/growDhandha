# CLAUDE.md

Guide for AI assistants (and people) picking up this repo. Read this first; README.md has the
long-form, user-facing documentation.

## What this is

**growDhandha**: the marketing site of Jatin Mangla, a freelance web and mobile developer in Delhi
selling to Indian small businesses. It has one job: turn a visitor into a WhatsApp message.

- Live: https://grow-dhandha-three.vercel.app (Vercel, region `bom1`). No custom domain yet.
- Repo: https://github.com/JatinMangla/growDhandha. Pushing to `main` deploys production.
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind 3, Framer Motion
  (mobile menu only), Vitest 3.

## Commands

```bash
npm run dev         # localhost:3000
npm run typecheck   # tsc --noEmit --incremental false
npm run lint        # eslint . (flat config, eslint.config.mjs; `next lint` no longer exists)
npm test            # vitest run
npm run build       # production build; run it before claiming a change works
```

CI (`.github/workflows/ci.yml`) runs typecheck → lint → test → build on every push and PR.

**Windows environment notes:**
- The Bash tool's sandbox cannot run Node (`EPERM lstat C:\Users\Administrator`). Run npm and npx
  through **PowerShell**.
- Write multi-line edits containing non-ASCII text (—, ₹, →) with the Write/Edit tools. Bash heredocs
  have mangled them.
- Local Node is 20.16. Vitest is pinned to 3.x because Vitest 4.1.11+ and 5 need a newer Node or a
  native binding that failed to install here. `npm install` of new packages hit an npm arborist bug
  (`reading 'edgesOut'`); a clean `node_modules` + lockfile reinstall should fix it (not yet done).

## Architecture and conventions

- **All copy lives in `src/data/*.ts`.** Components render data; they should not contain facts.
  - **Prices:** defined once in `src/data/pricing.ts` (`STARTER`, `BUSINESS`, `CUSTOM_FROM`). Use
    `startingPrice`, `lowestPrice`, `tier(id)` and `formatINR()`. Never type `₹4,999` anywhere else.
  - **The 10,500-users figure:** `headlineUsers` from `src/data/stats.ts`.
  - **Identity, contact, socials, nav:** `src/data/site.ts`. `site.startingPrice` is derived from
    pricing, so `pricing.ts` must never import `site.ts` (it would create a cycle).
  - Bump `contentUpdatedAt` in `site.ts` when real content changes; it feeds the sitemap.
- **Projects** (`src/data/projects.ts`) have `kind: 'product' | 'client' | 'employer'`, shown on
  the card. Own products come first. Apps behind a private login link `repo`, not `href`. Setting
  `image` swaps the monogram art for a screenshot from `public/projects/`.
- **"Recently shipped"** (`src/lib/github.ts`) lists public repos tagged with the GitHub topic
  `showcase`, revalidated daily. It never throws; on failure the section doesn't render. Repos that
  already have a project card are excluded.
- **Testimonials** (`src/data/testimonials.ts`) must be real quotes only. The section is hidden
  while the file is empty.
- **Motion is CSS-first.** `Reveal` is a *server* component that only stamps `data-reveal`; one
  `RevealObserver` drives all of them. Scroll-driven timelines live in `globals.css`. Framer Motion
  is used only in the lazily loaded `MobileMenu`.
- **Anchors:**
  - Section links are root-relative (`/#pricing`) so they work from every page. `AnchorScroll`
    handles same-page clicks and releases `content-visibility` deferral (`.defer-render`) before
    scrolling.
  - Cross-page section links stay plain `<a>` on purpose, because a full load lands exactly. They
    carry an `eslint-disable` with the reason.
  - A new below-the-fold section gets `defer-render`.
- **Markdown for agents:**
  - `/llms.txt` and `/llms-full.txt`, plus `<page>.md` via rewrites in `next.config.ts` to
    `src/app/api/md/[[...path]]/route.ts`.
  - **The path must travel as route segments, never `?path=`.** Query strings from rewrites don't
    reach the handler, and every `.md` URL silently served the homepage. This has regressed twice,
    and a test guards it.
  - Each page declares its own `alternates.types['text/markdown']`.
- **Conversion tracking:**
  - `ConversionTracking` (one delegated listener) sends Umami events `whatsapp_click`,
    `call_click`, `email_click` for `wa.me`, `tel:` and `mailto:` links.
  - The label comes from the nearest `data-cta`, otherwise the section `id`.
  - The contact form calls `track()` itself, since it uses `window.open` rather than a link.
- **Contact form:**
  - WhatsApp hand-off; the phone field is optional.
  - If `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, it also `sendBeacon`s to `/api/contact`,
    which emails a copy. That route checks same-origin, drops honeypot (`company`) submissions,
    re-validates, and rate-limits per IP (in-memory, best effort).
  - Nothing is stored.
- **Security:** CSP and other headers are in `next.config.ts`. `script-src` keeps `'unsafe-inline'`
  deliberately; a nonce would force dynamic rendering. **Any new third-party origin must be added to
  the CSP.**
- **SEO:**
  - One JSON-LD `@graph` (`src/components/seo/JsonLd.tsx`, exported as `homepageGraph`).
  - It declares a service-area business: no street address or postcode. Never add a fake one.
  - FAQ and HowTo rich results no longer appear in Google; the schema is kept for other consumers.
- Next.js page files may only export Next's own names. Shared constants go in `src/data` or
  `src/lib`, not in `page.tsx` or `route.ts`.

## Environment variables

| Variable | Needed | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical URLs, sitemap, OG. Falls back to Vercel's URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | `wa.me` links |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | optional | Loads Umami; unset means no analytics script |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | optional | Email copy of enquiries; changes form and privacy wording |
| `CONTACT_FROM_EMAIL` | optional | Resend sender on a verified domain |
| `GITHUB_TOKEN` | optional | Higher GitHub API limit for "Recently shipped" |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional | Search Console meta tag |

The homepage is static, so env changes need a redeploy.

## Decisions already made (don't re-litigate)

- **Employer work stays.** Jatin has permission from AAPNA Infotech to show Mera Monitor and the
  related stats. It is labelled "Professional work".
- The portfolio adds Kundli Predict (`predict`), Personal Vault (`personal-vault`) and CareerPilot
  AI (`CareerPilot-AI`). shuraa-tax-portal and meramonitor-mcp-server are deliberately excluded.
- Analytics: **Umami Cloud** (cookieless).
- `Accept: text/markdown` negotiation and the middleware were removed on purpose: an edge function
  on every page view wasn't worth it.

## Open items (as of 2026-09-24)

These depend on the owner: a custom domain, a photo of Jatin, real testimonials, project
screenshots, and moving off the Vercel Hobby plan (non-commercial only; client sites too). Also:
the CareerPilot-AI README exposes a default password; the "Most chosen" and "Available" badges are
unverified claims; the Mon–Sat hours conflict with a day job; and the brand is split between
"growDhandha" (manifest) and "Jatin Mangla".

Code follow-ups not yet done:
- Playwright plus axe end-to-end tests, and Lighthouse CI budgets.
- Clean reinstall to move Vitest to a patched 4.1.11+ (dev-only advisory).
- A browser-level check of the CSP console, the menu focus trap and anchor landing.
- A Hindi or Hinglish landing page.
- Staggering future blog post dates; all five current posts share 2026-09-02.
