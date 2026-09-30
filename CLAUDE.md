# CLAUDE.md

Guide for AI assistants (and people) picking up this repo. Read this first; README.md has the
long-form, user-facing documentation, and **`docs/SEO-PLAYBOOK.md` is the SEO strategy**: what is
done, what is pending, the procedures and the results log. Keep this file current: update it in the same commit as any
change to architecture, conventions, decisions or open items.

## What this is

**growDhandha**: the marketing site of Jatin Mangla, a freelance web and mobile developer in Delhi
selling to Indian small businesses. It has one job: turn a visitor into a WhatsApp message.

- Live: https://grow-dhandha-three.vercel.app (Vercel, region `bom1`). No custom domain yet.
- Repo: https://github.com/JatinMangla/growDhandha. **Pushing to `main` deploys production.**
  Work on a branch and let the owner merge the PR (that is how the last two changes shipped).
- Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind 3, Framer Motion
  (mobile menu only). Tests: Vitest 3 (unit/route), Playwright + axe (browser), Lighthouse CI.
- Pages: `/`, `/hi` (Hindi), `/services` plus six `/services/[id]`, `/pricing`, `/blog`,
  `/blog/[slug]`, `/about`, `/privacy`, plus generated `/llms.txt`, `/llms-full.txt`, `*.md`,
  sitemap, robots, manifest, icons and OG images.

## Commands

```bash
npm run dev         # localhost:3000
npm run typecheck   # tsc --noEmit --incremental false
npm run lint        # eslint . (flat config, eslint.config.mjs; `next lint` no longer exists)
npm test            # vitest run: 52 unit, route and content-integrity tests
npm run build       # production build; run it before claiming a change works
npm run test:e2e    # playwright: 81 browser tests on port 3100 (needs a build first)
npm run lighthouse  # lhci autorun on port 3200 (needs a build first)
```

CI (`.github/workflows/ci.yml`, Node 22) runs typecheck → lint → unit → build → e2e → Lighthouse.
Lighthouse fails the build on accessibility, best practices or SEO below 95, or CLS above 0.1. It
only warns on performance.

**Windows environment notes (this machine):**
- The Bash tool's sandbox cannot run Node (`EPERM lstat C:\Users\Administrator`). Run npm and npx
  through **PowerShell**. `npx <pkg>` for a package that isn't installed fails the same way, so
  install tools as devDependencies.
- Write multi-line edits containing non-ASCII text (—, ₹, →, Devanagari) with the Write/Edit tools,
  or with a Python script saved to the scratchpad. Bash heredocs and PowerShell `Set-Content` have
  mangled text or added a BOM.
- PowerShell: `measure` is a built-in alias, so don't name a function that.
- **Local Node is 20.16.** Vitest stays on 3.x: the patched 4.1.11+ needs Vite 7, which needs Node
  20.19+. `npm install vitest@4` also hits an npm 10.8 arborist bug (`reading 'edgesOut'`, in
  vitest's optional peer set). Both go away once the owner installs Node 22 (owner checklist, step 1).
  Then run `npm install -D vitest@^4.1.11`.
- Lighthouse locally needs a Chrome: use Playwright's. In PowerShell:
  `$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright" -Recurse -Filter chrome.exe | Select-Object -First 1).FullName`

## Architecture and conventions

- **All copy lives in `src/data/*.ts`.** Components render data; they should not contain facts.
  - **Prices:** defined once in `src/data/pricing.ts` (`STARTER`, `BUSINESS`, `CUSTOM_FROM`). Use
    `startingPrice`, `lowestPrice`, `tier(id)` and `formatINR()`. Never type `₹4,999` anywhere else.
  - **The 10,500-users figure:** `headlineUsers` from `src/data/stats.ts`.
  - **Identity, contact, socials, nav:** `src/data/site.ts`. `site.startingPrice` is derived from
    pricing, so `pricing.ts` must never import `site.ts` (it would create a cycle).
  - Bump `contentUpdatedAt` in `site.ts` when real content changes; it feeds the sitemap.
- **Hindi page (`/hi`):**
  - Copy is in `src/data/hi.ts`, keyed by the English service and tier ids. Prices and figures are
    imported, never typed. The wording is hand-maintained: when English copy changes in substance
    (timelines, support days, hours), update `hi.ts` too.
  - The content wrapper is `<div lang="hi-IN" className="lang-hi">`, since the root `<html>` stays
    `en-IN`.
  - Section ids are `hi-*` so analytics labels them separately.
  - **It uses the device's system Devanagari font, on purpose.** The Noto web font was 122 KB and
    cost about 1 s of LCP, and Android's system font is the same Noto family. Font stack and line
    height are in `.lang-hi` in `globals.css`.
  - Both languages declare `hreflang` (layout metadata, `/hi` metadata and sitemap), with "हिंदी में
    पढ़ें" in the hero and footer.
- **SEO structure** (why: `docs/SEO-PLAYBOOK.md`):
  - **Service pages are the money pages.** `/services/<id>` is rendered from `services.ts` →
    `page` (headline, summary, intro, forWho, tierIds, faqIds, postSlugs). `/services` is the hub, and
    the URL to point backlinks at.
  - **The header nav links to real pages** (`/services`, `/pricing`, `/blog`), not homepage anchors,
    because it's on every page and passes authority. Homepage service cards link one hop to each
    service page.
  - **In-text links:** any content string in posts or service intros can contain
    `[anchor](/path)`. It's rendered by `RichText`, stripped for schema and made absolute in markdown
    (`src/lib/rich-text.ts`). `src/data/__tests__/content.test.ts` fails on a broken link, an
    orphaned service page or article, a bad `tierIds`/`faqIds`/`postSlugs` reference, or a
    description outside 70–160.
  - **Titles:** wrap page titles in `seoTitle()` (`src/lib/seo.ts`). It drops the "| Jatin Mangla"
    suffix when it would exceed 65 characters. The e2e "on-page SEO" test checks every indexable
    page: title ≤ 65, description 70–160, one h1, self canonical, no noindex, unique title, in the
    sitemap. **Add every new page to `INDEXABLE` in `e2e/site.spec.ts`.**
  - **Structured data reads plain strings:** never pass `metadata.title` into JSON-LD, because it
    can be an object after `seoTitle()`.
  - **Republishing a page:** follow the header of `src/data/redirects.ts`. Permanent redirects,
    never chained.
  - **`/about`** is the author page (E-E-A-T). Bylines link to it, and `Person` in `JsonLd.tsx` is
    exported and reused there.
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
- **Links and prefetch:** use `prefetch={false}` on any `<Link>` that appears on every page (header
  logo, language switch). Prefetching the whole homepage payload on every load was measured
  costing LCP.
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
    and a test guards it. `/hi` has no markdown form.
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
  the CSP.** The e2e suite fails on any CSP console error.
- **SEO:**
  - One JSON-LD `@graph` (`src/components/seo/JsonLd.tsx`, exported as `homepageGraph`).
  - It declares a service-area business: no street address or postcode. Never add a fake one.
  - FAQ and HowTo rich results no longer appear in Google; the schema is kept for other consumers.
- Next.js page and route files may only export Next's own names. Shared constants go in
  `src/data` or `src/lib`.

## Testing

- **Unit and route tests (Vitest, `src/**/__tests__`):** validation, generated markdown,
  GitHub parsing, JSON-LD shape, the `/api/contact` guards, and `/api/md` plus its rewrite rules.
- **Browser tests (Playwright, `e2e/site.spec.ts`, desktop plus Pixel 7):** every page loads with
  zero console errors (CSP included), and axe finds zero WCAG A/AA violations in light and dark mode.
  Also covered: anchors landing from other pages and in place, the mobile-menu focus trap, the
  contact hand-off, the floating button's `inert`, the Hindi page, and `.md` routes. **When adding a
  page, add it to `PAGES` in `e2e/site.spec.ts`.**
- **Performance:** local Lighthouse scores swing 20+ points between runs on this machine. Compare
  medians of 5 runs, build against build (a `git worktree` of the old commit works), before
  concluding anything. Measured on 2026-09-24:

  | Page | Performance | Accessibility / Best practices / SEO |
  |---|---|---|
  | `/` (median of 5) | 87 (pre-audit build: 81) | 100 |
  | `/hi` | 87 | 100 |
  | `/pricing`, articles | ~90 | 100 |

  Homepage LCP is about 3.4 s under simulated mobile throttling, and TBT about 210 ms.

## Environment variables

| Variable | Needed | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical URLs, sitemap, OG. Falls back to Vercel's URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | `wa.me` links |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | optional | Loads Umami; unset means no analytics script |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | optional | Email copy of enquiries; changes form and privacy wording |
| `CONTACT_FROM_EMAIL` | optional | Resend sender on a verified domain |
| `GITHUB_TOKEN` | optional | Higher GitHub API limit for "Recently shipped" |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional | Search Console meta tag (works on vercel.app, no domain needed) |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | optional | Bing Webmaster Tools `msvalidate.01` meta tag |

The homepage is static, so env changes need a redeploy.

## Decisions already made (don't re-litigate)

- **Employer work stays.** Jatin has permission from AAPNA Infotech to show Mera Monitor and the
  related stats. It is labelled "Professional work".
- The portfolio adds Kundli Predict (`predict`), Personal Vault (`personal-vault`) and CareerPilot
  AI (`CareerPilot-AI`). shuraa-tax-portal and meramonitor-mcp-server are deliberately excluded.
- **Analytics: Umami Cloud (cookieless).** PR #1 (Vercel Web Analytics, opened by the Vercel bot)
  should be closed, not merged. It duplicates Umami, can't record click events on the Hobby plan,
  would make `/privacy` inaccurate, and conflicts with `main`.
- `Accept: text/markdown` negotiation and the middleware were removed on purpose: an edge function
  on every page view wasn't worth it.
- `/hi` uses system Devanagari fonts, not a web font (measured; see above).
- **No one-page-per-FAQ stubs, and no mass city or industry pages.** Thin pages on a new,
  low-authority site end up "crawled — not indexed", and near-duplicate location pages are doorway
  pages under Google's spam policy. Reasoning is in the SEO playbook.

## History

- **PR #2** (`audit-fixes`, merged 2026-09-24): full audit fixes. Nav on sub-pages, markdown
  routing, JSON-LD address, single source for prices, Umami tracking, lead-backup email, portfolio
  projects, privacy page, CSP, Next 16, Vitest, CI.
- **PR #3** (`finish-followups`, merged): Playwright and axe browser tests, Lighthouse CI budgets,
  the Hindi page, the prefetch fix, a clean reinstall, and an honest performance section in the
  README.
- **`seo-playbook` branch** (pushed 2026-09-30): applied the PageRank and topical-authority playbook
  (Edward Sturm and David Quaid episode). Service pages and hub, nav to money pages, in-text
  cluster links, `/about`, a redirects mechanism, the title-length fix, Bing verification,
  content-integrity and on-page SEO tests, and `docs/SEO-PLAYBOOK.md`.

## Owner checklist (things only Jatin can do; ask about progress)

1. [ ] Install Node 22 LTS locally, then upgrade Vitest (see the environment notes).
2. [x] Merge the `finish-followups` PR. [ ] Merge the `seo-playbook` PR. [ ] Close PR #1.
3. [ ] Umami: create the site, set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in Vercel (Production), redeploy.
4. [ ] Optional: Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, later `CONTACT_FROM_EMAIL`), redeploy.
5. [ ] CareerPilot-AI: change the production `AUTH_PASSWORD` and remove the default from its README.
6. [ ] Vercel Hobby is non-commercial only: upgrade to Pro, or move to Cloudflare Pages or Netlify.
7. [ ] Buy a domain **before any link-building**, then follow "Needs a domain" in
   `docs/SEO-PLAYBOOK.md` (vercel.app → domain redirect, change of address).
8. [ ] Search Console and Bing now, on the vercel.app URL, via the meta-tag variables. Then a Google
   Business Profile (service area, no address).
8b. [ ] Earn the first links, following the backlink table in `docs/SEO-PLAYBOOK.md` (the Life
   portfolio and GitHub READMEs first; he controls those).
9. [ ] Add `showcase` topics on GitHub, and project screenshots in `public/projects/`.
10. [ ] A photo of Jatin (then add it to the hero or WhyMe section), and real testimonials in
    `src/data/testimonials.ts`.
11. [ ] A native Hindi speaker should read `/hi`.
12. [ ] Decide whether the "Most chosen" and "Available for new projects" badges are true, what the
    Mon–Sat 10–8 hours should be, and on one brand name ("growDhandha" in the manifest vs "Jatin
    Mangla").
13. [ ] Publish new blog posts on different dates, one every 1–2 weeks. All five current posts
    share 2026-09-02.

## Code follow-ups (none blocking)

- A photo slot in the hero, once the owner provides a photo.
- A Hindi version of the blog or FAQ, only if `/hi` traffic justifies it (check Umami's `hi-*`
  labels).
- Once Search Console has 4–8 weeks of data, the monthly routine in `docs/SEO-PLAYBOOK.md`: the
  1-hour update, strong → weak links, and republishing stuck pages. Log each one in its results
  table.
- New articles from the content plan in the playbook, each linked into its cluster.
- If Umami shows agent traffic to `.md` URLs, consider restoring `Accept` negotiation, with a
  narrow matcher.
