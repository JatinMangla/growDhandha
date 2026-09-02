import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/site';

/**
 * AI crawlers come in two kinds, and naming them makes the policy explicit and
 * gives one place to change it later:
 *
 * - **Training** — GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
 *   CCBot, meta-externalagent, Amazonbot. These build the model's background
 *   knowledge, which is how a business gets mentioned without a live fetch.
 * - **Search / answering** — OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
 *   Claude-User, PerplexityBot, Perplexity-User. These fetch pages while
 *   answering someone's question, and are what produce a citation.
 *
 * Everything is allowed here, deliberately: this is a business that wants to be
 * found, and blocking training crawlers would cost ambient recall for no gain.
 *
 * IMPORTANT: a crawler obeys only the single most specific group that matches
 * its name — it does not fall back to `*`. So every named group must repeat the
 * `/api/` disallow, or naming a bot would silently grant it more access than
 * the wildcard group allows. `apiDisallow` exists so that cannot drift.
 */
const AI_CRAWLERS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google, Apple, Meta, Amazon, Common Crawl
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'CCBot',
  // Conventional search engines whose indexes AI answers draw on
  'Googlebot',
  'Bingbot',
];

/** Never public, and must be repeated in every named group. */
const apiDisallow = ['/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: apiDisallow,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: apiDisallow,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
