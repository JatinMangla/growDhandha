export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. '2026-01-14'. */
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  /** Body paragraphs. Add a new post by appending an object to `posts`. */
  paragraphs: string[];
};

/**
 * The blog is the long-term organic ranking strategy. It ships empty on
 * purpose — the route, the listing, the empty state and the per-post page all
 * work, so publishing is a matter of adding one object to this array.
 */
export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Topics queued for publication — shown on the empty listing as a promise. */
export const plannedTopics: string[] = [
  'What a business website should actually cost in India in 2026',
  'Website or mobile app: which one does your shop really need first?',
  'How to get your shop on Google Maps and Google Search for free',
  'Billing software vs. an Excel sheet: when it is worth switching',
  'Six questions to ask any developer before you pay them anything',
];
