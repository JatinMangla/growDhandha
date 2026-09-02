import type { NavLink } from '@/types';

/**
 * Single source of truth for identity, contact details and URLs.
 * Change a phone number or headline here and it updates everywhere,
 * including the JSON-LD structured data and the sitemap.
 */

/**
 * Resolves the canonical origin, in order of trust:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — set this in production; it is the only value
 *    that knows about a custom domain.
 * 2. Vercel's own production URL — a safety net so that forgetting step 1
 *    still yields a real origin rather than publishing canonical tags, a
 *    sitemap and OG image URLs that all point at localhost.
 * 3. localhost, for development.
 *
 * The Vercel variables are server-only, which is fine: `siteUrl` is read
 * exclusively from server components, metadata, the sitemap and robots.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return 'http://localhost:3000';
}

export const siteUrl = resolveSiteUrl().replace(/\/+$/, '');

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919540151718';

export const site = {
  name: 'Jatin Mangla',
  role: 'Web & Mobile App Developer',
  tagline: 'Websites and apps for Indian businesses, starting at ₹4,999',
  shortDescription:
    'Delhi-based developer building websites, mobile apps, billing and inventory systems for small businesses across India. Fixed pricing from ₹4,999.',
  startingPrice: '₹4,999',
  location: {
    city: 'Delhi',
    region: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    postalCode: '110001',
  },
  phone: '+919540151718',
  phoneDisplay: '+91 95401 51718',
  email: 'jatinmangla123@gmail.com',
  currentEmployer: 'AAPNA Infotech',
  yearsExperience: 5,
  responseTime: 'a few hours',
  workingHours: 'Mon–Sat, 10am – 8pm IST',
  socials: {
    linkedin: 'https://www.linkedin.com/in/jatin-mangla-22435060',
    github: 'https://github.com/JatinMangla',
  },
  languages: ['English', 'Hindi'],
} as const;

/** Builds a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * When the static pages last changed in substance. Bump this by hand when you
 * edit real content — copy, pricing, services.
 *
 * It exists because the sitemap previously sent `new Date()`, so every deploy
 * claimed the homepage had just changed. Crawlers learn to discount a sitemap
 * that always says everything is new, which costs credibility on exactly the
 * freshness signal we want to be trusted on.
 */
export const contentUpdatedAt = '2026-09-02';

export const defaultEnquiry =
  'Hi Jatin, I saw your website. I want to discuss a project for my business.';

export const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];
