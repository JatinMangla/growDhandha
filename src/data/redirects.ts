/**
 * Permanent (308) redirects, wired into next.config.ts.
 *
 * This is the "republish under a new URL" play from docs/SEO-PLAYBOOK.md: a
 * page that has sat in "Crawled — currently not indexed", or stalled on page
 * 2–3, gets a fresh URL so Google re-evaluates it against the site's current
 * authority instead of what the site had when the page first launched.
 *
 * To republish a post:
 *   1. In posts.ts change its `slug` (usually one or two extra words), tweak
 *      the title, and set `updatedAt` to today.
 *   2. Add `{ from: '/blog/old-slug', to: '/blog/new-slug', ... }` below, so
 *      any link the old URL earned still arrives.
 *   3. Deploy, then Search Console → URL inspection → new URL → Request indexing.
 *
 * Never chain redirects (A→B→C); point every old URL at the final one.
 * Entries stay forever — deleting one breaks every link to the old URL.
 */
export type Redirect = {
  from: string;
  to: string;
  /** Why, and when — so nobody deletes it as clutter. */
  note: string;
};

export const redirects: Redirect[] = [];
