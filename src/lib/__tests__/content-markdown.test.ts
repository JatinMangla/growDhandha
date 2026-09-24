import { describe, expect, it } from 'vitest';
import { posts } from '@/data/posts';
import { pricingTiers, startingPrice } from '@/data/pricing';
import { siteUrl } from '@/data/site';
import { homepageMarkdown, llmsTxt, markdownPagePath, pricingMarkdown } from '@/lib/content-markdown';

describe('markdownPagePath', () => {
  it('maps route segments back to the page path', () => {
    expect(markdownPagePath(undefined)).toBe('/');
    expect(markdownPagePath(['index'])).toBe('/');
    expect(markdownPagePath(['pricing'])).toBe('/pricing');
    expect(markdownPagePath(['blog', 'some-post'])).toBe('/blog/some-post');
  });
});

describe('generated markdown', () => {
  it('llms.txt states the starting price and links every article', () => {
    const text = llmsTxt();
    expect(text).toContain(startingPrice);
    for (const post of posts) expect(text).toContain(`${siteUrl}/blog/${post.slug}`);
  });

  it('pricing markdown carries every tier price from the pricing data', () => {
    const text = pricingMarkdown();
    for (const tier of pricingTiers) expect(text).toContain(tier.price);
  });

  it('lists GitHub showcase repos only when there are some', () => {
    expect(homepageMarkdown()).not.toContain('## Recently shipped');
    const withRepos = homepageMarkdown([
      {
        name: 'demo',
        description: 'A demo.',
        url: 'https://github.com/x/demo',
        homepage: null,
        language: 'TypeScript',
        pushedAt: '2026-09-20T00:00:00Z',
      },
    ]);
    expect(withRepos).toContain('## Recently shipped');
    expect(withRepos).toContain('[demo](https://github.com/x/demo): A demo.');
  });
});
