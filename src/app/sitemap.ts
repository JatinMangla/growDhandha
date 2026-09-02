import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';
import { contentUpdatedAt, siteUrl } from '@/data/site';

/**
 * Every `lastModified` here is a real content date, never build time. Two
 * builds with no content change produce a byte-identical sitemap, which is what
 * makes the dates worth anything to a crawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticUpdated = new Date(contentUpdatedAt);

  /** The newest article date, or the static date if there are no posts yet. */
  const newestPost = posts.reduce<Date>((latest, post) => {
    const updated = new Date(post.updatedAt);
    return updated > latest ? updated : latest;
  }, staticUpdated);

  return [
    { url: `${siteUrl}/`, lastModified: staticUpdated, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${siteUrl}/pricing`,
      lastModified: staticUpdated,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${siteUrl}/blog`, lastModified: newestPost, changeFrequency: 'weekly', priority: 0.6 },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
