import { describe, expect, it } from 'vitest';
import { faqs } from '@/data/faqs';
import { posts } from '@/data/posts';
import { pricingTiers } from '@/data/pricing';
import { redirects } from '@/data/redirects';
import { services } from '@/data/services';
import { linkTargets } from '@/lib/rich-text';

/**
 * Internal links are an SEO asset only while they resolve. These tests fail
 * the build the moment a slug is renamed, a service removed, or a FAQ id
 * changed without updating everything that points at it.
 */

const HOMEPAGE_SECTIONS = ['services', 'work', 'pricing', 'process', 'faq', 'contact'];

const pages = new Set([
  '/',
  '/services',
  '/pricing',
  '/blog',
  '/about',
  '/privacy',
  '/hi',
  ...services.map((service) => `/services/${service.id}`),
  ...posts.map((post) => `/blog/${post.slug}`),
  ...HOMEPAGE_SECTIONS.map((id) => `/#${id}`),
]);

const postTexts = posts.flatMap((post) =>
  post.body.flatMap((block) => {
    switch (block.kind) {
      case 'heading':
      case 'paragraph':
      case 'callout':
        return [block.text];
      case 'list':
        return block.items;
      case 'qa':
        return [block.question, block.answer];
    }
  }),
);

describe('internal links in content', () => {
  const texts = [...postTexts, ...services.flatMap((service) => service.page.intro)];

  it('every [text](/path) link points at a page that exists', () => {
    const broken = texts.flatMap(linkTargets).filter((href) => !pages.has(href));
    expect(broken).toEqual([]);
  });

  it('every service page and every article is linked from at least one article or service page', () => {
    const linked = new Set(texts.flatMap(linkTargets));
    const orphans = [...services.map((service) => `/services/${service.id}`), ...posts.map((post) => `/blog/${post.slug}`)].filter(
      (path) => !linked.has(path),
    );
    // Crawlers find pages through links; a page nothing links to in-content is the
    // first to end up "crawled — currently not indexed".
    expect(orphans).toEqual([]);
  });
});

describe('service pages', () => {
  it.each(services.map((service) => [service.id, service] as const))('%s references real tiers, FAQs and articles', (_id, service) => {
    const tierIds = new Set(pricingTiers.map((item) => item.id));
    const faqIds = new Set(faqs.map((faq) => faq.id));
    const slugs = new Set(posts.map((post) => post.slug));

    expect(service.page.tierIds.filter((id) => !tierIds.has(id))).toEqual([]);
    expect(service.page.faqIds.filter((id) => !faqIds.has(id))).toEqual([]);
    expect(service.page.postSlugs.filter((slug) => !slugs.has(slug))).toEqual([]);
    expect(service.page.tierIds.length).toBeGreaterThan(0);
  });

  it('meta descriptions fit in a search result (70–160 characters)', () => {
    const outOfRange = services
      .map((service) => [service.id, service.page.summary.length] as const)
      .filter(([, length]) => length < 70 || length > 160);
    expect(outOfRange).toEqual([]);
  });

  it('headlines are unique', () => {
    const headlines = services.map((service) => service.page.headline);
    expect(new Set(headlines).size).toBe(headlines.length);
  });
});

describe('redirects', () => {
  it('never chain, and never point at themselves', () => {
    const sources = new Set(redirects.map((redirect) => redirect.from));
    for (const redirect of redirects) {
      expect(redirect.to).not.toBe(redirect.from);
      expect(sources.has(redirect.to)).toBe(false);
    }
  });
});
