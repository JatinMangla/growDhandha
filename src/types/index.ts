import type { LucideIcon } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  /** One-line outcome, written for a non-technical owner. */
  promise: string;
  description: string;
  /** Plain-language deliverables — never feature jargon. */
  outcomes: string[];
  icon: LucideIcon;
  /** The page for this service, at /services/<id>. */
  page: ServicePage;
};

/**
 * A service's own landing page. These are the site's buyer-intent ("money")
 * pages: one link from the homepage, one from the nav's /services hub, so
 * authority reaches them in as few hops as possible.
 */
export type ServicePage = {
  /** The page's <h1>, phrased the way someone would search for it. */
  headline: string;
  /** Meta description, ~150 characters. */
  summary: string;
  /** Two or three paragraphs of real explanation. Supports [text](/path) links. */
  intro: string[];
  /** Who this is for, so a reader can recognise themselves. */
  forWho: string[];
  /** Pricing tiers that apply, by id, most relevant first. */
  tierIds: string[];
  /** Questions from faqs.ts that belong on this page, by id. */
  faqIds: string[];
  /** Related articles, by slug — the page's topic cluster. */
  postSlugs: string[];
};

export type Stat = {
  id: string;
  /** Numeric target for the animated counter. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Where the number comes from, so it can be defended in a sales call. */
  note: string;
};

export type PricingTier = {
  id: string;
  name: string;
  /** Display form, e.g. '₹4,999'. */
  price: string;
  /** Numeric INR value for structured data, so an assistant can quote it. */
  priceValue: number;
  /** True when `priceValue` is a floor rather than the price. */
  priceIsFrom?: boolean;
  priceNote: string;
  bestFor: string;
  includes: string[];
  timeline: string;
  featured?: boolean;
  ctaLabel: string;
  /** Pre-filled WhatsApp enquiry for this tier. */
  enquiry: string;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  /**
   * Whose work this is, shown on the card so a reader never has to guess:
   * `product` — built and shipped on my own; `client` — built for a paying
   * client; `employer` — professional work done in a job, shown with permission.
   */
  kind: 'product' | 'client' | 'employer';
  /** Public live link; omit for work under NDA or apps behind a private login. */
  href?: string;
  /** Public source repository. */
  repo?: string;
  /** Screenshot under /public, e.g. '/projects/predict.png'. Monogram art is used without one. */
  image?: { src: string; alt: string };
  /** Two-letter monogram used by the placeholder card art. */
  monogram: string;
  accent: 'brand' | 'accent' | 'gold';
};

export type ProcessStep = {
  id: string;
  title: string;
  duration: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Differentiator = {
  id: string;
  title: string;
  fear: string;
  answer: string;
  icon: LucideIcon;
};

export type TechGroup = {
  id: string;
  label: string;
  items: string[];
};

/**
 * Article body blocks.
 *
 * A flat list of paragraphs extracts badly: retrieval models look for a direct
 * answer near the top and for question-shaped headings, and find neither in a
 * wall of text. These blocks give each article real structure, and the `qa`
 * blocks are emitted as `FAQPage` structured data as well as rendered.
 */
export type PostBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  /** The direct answer, lifted out of the prose so it can be quoted alone. */
  | { kind: 'callout'; text: string }
  | { kind: 'qa'; question: string; answer: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. '2026-09-02'. */
  publishedAt: string;
  /** ISO date of the last substantive edit; feeds sitemap and dateModified. */
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  /** One-sentence answer to the title, shown first and used as the summary. */
  answer: string;
  body: PostBlock[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type Testimonial = {
  id: string;
  /** The client's own words, lightly edited for length only. */
  quote: string;
  name: string;
  /** e.g. "Hardware shop, Karol Bagh" — the reader should recognise themselves. */
  business: string;
  /** Which service it was, so the quote sits next to the right promise. */
  project: string;
};
