# SEO playbook

What actually moves rankings for this site, where each idea came from, what is already done in the
code, and what is still to do. Keep it current: tick items off, add dates, record results.

## Source, and how much to trust it

Main source: **"The SEO Playbook That Actually Works: PageRank, Topical Authority & Real Results"**.
This is *The Edward Show* E846 (YouTube `9eK5-TpaiPw`, 28 Oct 2025, 1h53m), Edward Sturm with
**David Quaid**, who has 26 years in technical SEO and runs the Primary Position agency.

YouTube blocked automated access to the video and its transcript. These notes therefore come from:
- the episode's show notes;
- Edward Sturm's companion articles on each tactic:
  [PageRank decay](https://edwardsturm.com/articles/pagerank-decay-rank-buyer-intent-pages/),
  [topical authority and republishing](https://edwardsturm.com/articles/magic-pill-seo-topical-authority/),
  and [the 1-hour update](https://edwardsturm.com/articles/1-hour-seo-update-boost-best-worst-pages/);
- a [third-party summary of the episode](https://seobotai.com/blog/pagerank-topical-authority-insights/);
- David Quaid's published position on "crawled — currently not indexed".

If someone watches the episode and finds a point that contradicts this, the episode wins; update
this file.

Treat these as practitioner claims with case studies, not laws. Where Google's own documentation
says otherwise (e.g. on doorway pages or scaled content), Google's guidelines win.

## The ideas, in plain terms

1. **PageRank still runs Google.** Authority enters a site through backlinks and flows along links.
   Each internal hop keeps roughly 85% of it, and a page's authority is split across all the links on
   that page. A page far from where authority lands, or linked only from crowded pages, gets little.
2. **Point authority at money pages, not just the homepage.** A link to a hub such as `/services/`
   reaches every service page in one hop. A link to the homepage gets shared across dozens of links
   first.
3. **Topical authority.** Google judges a page by how authoritative the whole site is *on that
   topic*, at the moment it evaluates the page. Build it with clusters: several pages on one topic,
   linked to each other, around a hub.
4. **Use-case pages beat generic pages.** Pages for a specific, concrete need ("billing software for
   shops") attract buyers and face less competition than broad pages.
5. **"Crawled — currently not indexed" is usually an authority problem, not a technical one.**
   Sitemaps and tweaks don't reliably fix it. Real links do. A page that nothing links to looks
   unimportant and is the first to be skipped.
6. **Republish under a new URL.** A page that stalled when the site had less authority can be moved
   to a new, slightly longer URL with a tweaked title, the old URL redirected, and indexing requested.
   Google then re-evaluates it against today's authority. Edward's case: a page that had been
   "crawled, not indexed" for about 2 years ranked #1 within 2 weeks.
7. **Link from your strong pages to your weak ones.** Clicks and authority from a page that already
   ranks force Google to re-evaluate the page it links to.
8. **The 1-hour update.** Take your best page's Search Console queries and add H2 sections for query
   clusters that get impressions but aren't covered. Add one internal link from it to a weak page,
   update its date, and request indexing.
9. **Word count is a myth.** Short, direct answers rank fine outside affiliate content; clarity beats
   length. Bounce rate and dwell time aren't direct ranking factors. **Click-through rate is**, so
   titles and descriptions must survive the search result.
10. **Schema helps, but it isn't a primary factor.** Organise the content first.
11. **E-E-A-T is shown, not declared.** A real author, real experience and real content quality.
12. **Earn links; never buy them.** Partnerships with non-competing businesses (e.g. an electrician
    and a plumber recommending each other), and look at where competitors get theirs (Bing Webmaster
    Tools, Semrush).
13. **One page per question.** Separate pages for distinct questions catch more long-tail searches
    than one big FAQ page.
14. **Fundamentals over tricks.** Long-term performance comes from structure, content and links, not
    churn-and-burn shortcuts.

## Done in the code (2026-09-30)

| # | Idea | What was done | Where |
|---|---|---|---|
| 1, 2 | PageRank flow to money pages | The header nav (on every page) now links to `/services`, `/pricing` and `/blog` as real pages instead of homepage anchors. The homepage service cards link to each service page (one hop). Footer service links go to the service pages. | `src/data/site.ts` (`navLinks`), `Services.tsx`, `Footer.tsx` |
| 2, 4 | Money pages and a hub for backlinks | `/services` hub plus six buyer-intent pages at `/services/<id>`. Each has what it is, who it suits, what you get, price and timeline, process, FAQs, related guides and sibling services, plus `Service` and `BreadcrumbList` schema. | `src/app/services/`, `src/data/services.ts` (`page`) |
| 3 | Topic clusters | Articles and service pages carry contextual in-text links (`[text](/path)`) to each other. "Read next" ranks articles by shared tags. | `src/lib/rich-text.ts`, `src/data/posts.ts`, `src/data/services.ts` |
| 5 | No orphan pages | A unit test fails if any service page or article isn't linked from at least one article or service page, or if any in-text link is broken. | `src/data/__tests__/content.test.ts` |
| 6 | Republish play, ready to use | `src/data/redirects.ts` feeds permanent redirects into `next.config.ts`. The file header has the step-by-step, and a test prevents redirect chains. | `src/data/redirects.ts` |
| 9 | CTR: titles that fit | `seoTitle()` drops the " \| Jatin Mangla" suffix when it would push a title past 65 characters. Every page is checked in e2e (title ≤ 65, description 70–160, one h1, self canonical, indexable, unique title, in the sitemap). | `src/lib/seo.ts`, `e2e/site.spec.ts` |
| 11 | E-E-A-T | `/about` author page (`ProfilePage` + `Person`). Every article byline links to it, and the Person schema points at it. Facts come only from `src/data`. | `src/app/about/page.tsx` |
| — | Search engines without a domain | Google and Bing verification by meta tag (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`) works on the `vercel.app` address. | `src/app/layout.tsx` |
| — | Agents and crawlers | New pages are in the sitemap, `llms.txt`, `llms-full.txt` and `.md` form. | `content-markdown.ts`, `sitemap.ts` |

Already in place before this: fast static pages, a clean JSON-LD graph, a service-area business
with no fake address, `hreflang` for `/hi`, answer-first articles, and IndexNow.

## Not done yet, and why

### Needs a domain (the owner hasn't bought one yet)

**Buy the domain before any link-building.** Every backlink earned now points at
`grow-dhandha-three.vercel.app`, and has to survive a redirect later.

When the domain arrives:
1. In Vercel, go to **Settings → Domains**. Add the domain, then edit `grow-dhandha-three.vercel.app`
   to **Redirect to** the new domain (308).
2. Set `NEXT_PUBLIC_SITE_URL` to the new origin and redeploy. Canonicals, the sitemap, OG images and
   JSON-LD all follow it.
3. In Search Console, add the new domain property and use **Settings → Change of address** from the
   old property. Resubmit the sitemap. Bing has a similar site-move tool.
4. Update the links you control (LinkedIn, GitHub, the Life portfolio, Google Business Profile) to
   the new domain.
5. Run `node scripts/indexnow.mjs https://<domain>`.

### Needs Search Console data (weeks of it)

These only work once Search Console has collected some data:
- **1-hour update (idea 8):** monthly, on the best page by clicks.
- **Strong → weak links (idea 7):** find pages with impressions but a position of 8–30. Add one
  contextual link to each from a page that already gets clicks.
- **Republish (idea 6):** for any page still "Crawled — currently not indexed" or stuck on page 2–3
  after about 8 weeks, follow the steps in `src/data/redirects.ts`. Log it below.

### Needs links, which the owner has to earn (ideas 5, 12)

Point links at `/services` or a specific `/services/<id>` where it makes sense, not only at the
homepage.

| Source | Status | Notes |
|---|---|---|
| Life portfolio (life-puce-kappa.vercel.app) | ☐ | Owner controls it. Link to `/services` with anchor text like "websites and software for small businesses". |
| GitHub profile README and showcased repo READMEs | ☐ | "Built by Jatin Mangla — [web & app development](…/services)". |
| LinkedIn (Featured section and About) | ☐ | Mostly nofollow, but it sends people and helps entity recognition. |
| Google Business Profile website field | ☐ | Service area, no address. |
| Every client site's footer | ☐ | A small "Website by Jatin Mangla" link to `/services/business-website`, with the client's agreement. |
| Local directories (Justdial, IndiaMART, Sulekha, Clutch) | ☐ | Name, phone and area must match the site exactly. |
| Partnerships with non-competing local businesses | ☐ | CAs and accountants, printers, photographers, digital marketers. Mutual "who we recommend" pages. |
| Competitor backlink research (Bing Webmaster Tools → Backlinks) | ☐ | Find where Delhi web developers get their links, and go after the same ones. |

**Never buy links.** Idea 12 says so, and so do Google's spam policies.

### Deliberately not done

- **One page per FAQ (idea 13).** On a site this new, eight 60-word pages would most likely be the
  first thing Google skips (idea 5). The articles already follow "one question per page". Revisit
  once the site has links and indexing is healthy. Then turn only questions with real search demand
  into full articles, never thin stubs.
- **City and industry landing pages** ("website for clinics in Karol Bagh"). These are high intent
  (idea 4), but mass-produced near-duplicates are "doorway pages" under Google's spam policy. Only
  add one when there's something real and specific to say, ideally a client case study in that
  industry.
- **More schema.** Idea 10 says it isn't a lever, and the graph is already complete.

## Content plan (topical authority)

The site's topic is *websites and software for Indian small businesses*. There are three clusters,
each with a money page as its hub.

| Cluster | Hub (money page) | Existing articles | Next articles (from `plannedTopics` and search demand) |
|---|---|---|---|
| Websites | `/services/business-website` | Cost in India · Website vs app · Google Business Profile · 6 questions | The real cost of a "free" website builder · Designer or developer? |
| Business software | `/services/inventory-billing`, `/services/crm`, `/services/custom-software` | Billing software vs Excel | What a CRM actually is, in shopkeeper language · GST invoicing software: what to check |
| Apps and AI | `/services/mobile-app`, `/services/ai-features` | Website vs app | When an app is worth it for a small shop · Where AI actually saves a small business time |

Rules for every new article:
- Publish on its own date, one every 1–2 weeks. Never batch.
- Link to its hub, and to at least one sibling article, with descriptive anchor text.
- Link to it from its hub's `postSlugs` and from one older article. The test checks the new page
  isn't orphaned.
- Answer first. Short is fine; unclear is not.

## Results log

Record every republish, 1-hour update and link win here, with the date and before/after position,
so the playbook is tested against this site and not just believed.

| Date | Page | Action | Before | After (2–4 weeks) |
|---|---|---|---|---|
| — | — | — | — | — |
