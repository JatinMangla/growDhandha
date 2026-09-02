import { differentiators } from '@/data/differentiators';
import { faqs } from '@/data/faqs';
import { posts } from '@/data/posts';
import { customOption, pricingAssurances, pricingTiers } from '@/data/pricing';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site, siteUrl } from '@/data/site';
import { stats } from '@/data/stats';
import { techGroups } from '@/data/tech';
import type { Post } from '@/types';

/**
 * Markdown renderings of the site, generated from the same typed data the HTML
 * uses.
 *
 * This exists so `llms.txt` can never drift from the site the way a
 * hand-maintained file does — change a price in `src/data/pricing.ts` and every
 * representation updates together.
 *
 * A calibration note, since this is easy to over-invest in: the best public
 * measurement of markdown variants found they receive a negligible share of AI
 * citations, and Google has said `llms.txt` does not influence ranking. What
 * these do reliably is cut an agent's token cost, and cost nothing to maintain
 * once generated. Treat them as cheap insurance, not as a ranking mechanism.
 */

const bullet = (lines: string[]) => lines.map((line) => `- ${line}`).join('\n');

/** Shared identity block, so every representation states the same facts. */
function identityLines(): string[] {
  return [
    `Contact: ${site.phoneDisplay} · ${site.email} · WhatsApp preferred`,
    `Location: ${site.location.city}, ${site.location.country}. Works with businesses across India. Speaks ${site.languages.join(' and ')}.`,
    `Availability: ${site.workingHours}. Replies within ${site.responseTime}.`,
    `Website: ${siteUrl}`,
  ];
}

function pricingSection(): string {
  const tiers = pricingTiers
    .map(
      (tier) =>
        `- **${tier.name} — ${tier.price}** (${tier.priceNote}). ${tier.bestFor} ${tier.timeline}.\n` +
        tier.includes.map((item) => `  - ${item}`).join('\n'),
    )
    .join('\n');

  return `## Pricing\n\n${tiers}\n\n${bullet(pricingAssurances)}\n\n${customOption.body}`;
}

function servicesSection(): string {
  return `## Services\n\n${services
    .map((service) => `- **${service.title}** — ${service.promise} ${service.description}`)
    .join('\n')}`;
}

function faqSection(): string {
  return `## Frequently asked questions\n\n${faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join('\n\n')}`;
}

function credibilitySection(): string {
  return `## Track record\n\n${bullet(stats.map((stat) => `${stat.label}: ${stat.prefix ?? ''}${stat.value}${stat.suffix ?? ''} — ${stat.note}`))}`;
}

/** The homepage, as markdown. */
export function homepageMarkdown(): string {
  return [
    `# ${site.name} — ${site.role}`,
    '',
    `> ${site.shortDescription}`,
    '',
    bullet(identityLines()),
    '',
    servicesSection(),
    '',
    pricingSection(),
    '',
    `## Why work with me\n\n${differentiators
      .map((item) => `### ${item.title}\n\n${item.answer}`)
      .join('\n\n')}`,
    '',
    `## Selected work\n\n${projects
      .map(
        (project) =>
          `### ${project.name} — ${project.category} (${project.year})\n\n` +
          `**Problem:** ${project.problem}\n\n**What I did:** ${project.solution}\n\n**Result:** ${project.result}\n\n` +
          `Stack: ${project.stack.join(', ')}`,
      )
      .join('\n\n')}`,
    '',
    `## How a project runs\n\n${processSteps
      .map(
        (processStep, index) =>
          `${index + 1}. **${processStep.title}** (${processStep.duration}) — ${processStep.description} ${processStep.detail}`,
      )
      .join('\n')}`,
    '',
    credibilitySection(),
    '',
    `## Technology\n\n${techGroups
      .map((group) => `- **${group.label}:** ${group.items.join(', ')}`)
      .join('\n')}`,
    '',
    faqSection(),
    '',
  ].join('\n');
}

/** A single article, as markdown. */
export function postMarkdown(post: Post): string {
  const body = post.body
    .map((block) => {
      switch (block.kind) {
        case 'heading':
          return `## ${block.text}`;
        case 'paragraph':
          return block.text;
        case 'callout':
          return `> ${block.text}`;
        case 'list':
          return block.items
            .map((item, index) => (block.ordered ? `${index + 1}. ${item}` : `- ${item}`))
            .join('\n');
        case 'qa':
          return `### ${block.question}\n\n${block.answer}`;
      }
    })
    .join('\n\n');

  return [
    `# ${post.title}`,
    '',
    `> ${post.answer}`,
    '',
    `Published ${post.publishedAt}${post.updatedAt !== post.publishedAt ? ` · Updated ${post.updatedAt}` : ''} · ${post.readingMinutes} min read · by ${site.name}`,
    '',
    body,
    '',
    '---',
    '',
    `${site.name} — ${site.role}, ${site.location.city}. ${site.phoneDisplay} · ${site.email}`,
    `Source: ${siteUrl}/blog/${post.slug}`,
    '',
  ].join('\n');
}

/** The blog index, as markdown. */
export function blogIndexMarkdown(): string {
  return [
    '# Blog — plain advice for Indian small businesses',
    '',
    '> Short guides on what a website should cost, whether you need an app, and how to get found on Google.',
    '',
    posts
      .map(
        (post) =>
          `## ${post.title}\n\n${post.answer}\n\nRead: ${siteUrl}/blog/${post.slug} (published ${post.publishedAt})`,
      )
      .join('\n\n'),
    '',
  ].join('\n');
}

/** The pricing page, as markdown. */
export function pricingMarkdown(): string {
  return [
    '# Website and app pricing',
    '',
    `> Websites start at ${site.startingPrice} one-time. Fixed price agreed in writing before work starts.`,
    '',
    pricingSection(),
    '',
    faqSection(),
    '',
    `Contact: ${site.phoneDisplay} · ${site.email}`,
    '',
  ].join('\n');
}

/**
 * `/llms.txt` — the short index. Per the convention: a title, a blockquote
 * summary, then linked sections an agent can choose to fetch.
 */
export function llmsTxt(): string {
  return [
    `# ${site.name} — ${site.role}`,
    '',
    `> ${site.shortDescription} Based in ${site.location.city}, working with businesses across India.`,
    '',
    bullet(identityLines()),
    '',
    '## Key facts',
    '',
    bullet([
      `Websites and mobile applications start at ${site.startingPrice}, one-time.`,
      `${site.yearsExperience}+ years of professional experience; currently at ${site.currentEmployer}, an enterprise fintech software firm.`,
      'Builds the frontend of a fintech platform with 10,500+ active users.',
      'Fixed price agreed in writing before work starts; 50% to begin, 50% on delivery.',
      'Clients own the code, the content and the domain.',
      'Services: business websites, mobile apps for Android and iPhone, CRM, inventory and billing systems, custom business software, AI features.',
    ]),
    '',
    '## Pages',
    '',
    bullet([
      `[Home](${siteUrl}/): services, work, process and contact details.`,
      `[Pricing](${siteUrl}/pricing): three fixed-price plans from ${site.startingPrice}, with what each includes.`,
      `[Blog](${siteUrl}/blog): guides on cost, choosing between a website and an app, and getting found on Google.`,
    ]),
    '',
    '## Articles',
    '',
    bullet(posts.map((post) => `[${post.title}](${siteUrl}/blog/${post.slug}): ${post.answer}`)),
    '',
    '## Optional',
    '',
    bullet([
      `[Full site as markdown](${siteUrl}/llms-full.txt): every page inlined in one file.`,
      `[LinkedIn](${site.socials.linkedin})`,
      `[GitHub](${site.socials.github})`,
    ]),
    '',
  ].join('\n');
}

/** `/llms-full.txt` — everything inlined, for an agent that wants one fetch. */
export function llmsFullTxt(): string {
  return [
    homepageMarkdown(),
    '',
    '---',
    '',
    blogIndexMarkdown(),
    '',
    ...posts.flatMap((post) => ['---', '', postMarkdown(post)]),
  ].join('\n');
}
