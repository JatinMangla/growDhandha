import { formatINR } from '@/lib/utils';
import type { PricingTier } from '@/types';

/**
 * Tier prices are defined once here. Everything else — the hero, the FAQ, the
 * structured data, the OG card, llms.txt — derives its numbers from these, so
 * changing a price is a one-line edit.
 */
const STARTER = 4999;
const BUSINESS = 14999;
const CUSTOM_FROM = 39999;

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: formatINR(STARTER),
    priceValue: STARTER,
    priceNote: 'one-time, all inclusive',
    bestFor: 'Shops, clinics, coaching centres and service providers getting online for the first time.',
    timeline: 'Ready in 5–7 days',
    includes: [
      'A complete one-page website',
      'Works perfectly on every phone',
      'WhatsApp and call button on every screen',
      'Your business on Google search',
      'Photo gallery and enquiry form',
      'Free SSL certificate (the padlock)',
      '30 days of support after launch',
    ],
    ctaLabel: 'Start with Starter',
    enquiry: `Hi Jatin, I want the Starter website at ${formatINR(STARTER)}. My business is `,
  },
  {
    id: 'business',
    name: 'Business',
    price: formatINR(BUSINESS),
    priceValue: BUSINESS,
    priceNote: 'one-time, all inclusive',
    bestFor: 'Growing businesses that need more than a visiting card — catalogue, enquiries and content they control.',
    timeline: 'Ready in 2–3 weeks',
    featured: true,
    includes: [
      'Everything in Starter',
      'Up to 8 pages — services, about, catalogue, contact',
      'Product or service catalogue with search',
      'Admin panel so you can edit content yourself',
      'Enquiries delivered to your email and WhatsApp',
      'Google Analytics and Search Console set up',
      'Blog section so you rank on Google over time',
      '60 days of support after launch',
    ],
    ctaLabel: 'Choose Business',
    enquiry: 'Hi Jatin, I am interested in the Business plan. My business is ',
  },
  {
    id: 'custom',
    name: 'Complete Custom',
    price: `From ${formatINR(CUSTOM_FROM)}`,
    priceValue: CUSTOM_FROM,
    priceIsFrom: true,
    priceNote: 'quoted after we talk',
    bestFor: 'Billing, inventory, CRM, a mobile app, or internal software built exactly for how you work.',
    timeline: 'Typically 4–10 weeks',
    includes: [
      'Everything in Business',
      'Billing, inventory or CRM system',
      'Mobile app for Android and iPhone',
      'Multiple staff logins with separate access',
      'Reports and dashboards for your numbers',
      'Connects with tools you already use',
      'AI features where they genuinely save you time',
      '90 days of support after launch',
    ],
    ctaLabel: 'Discuss my project',
    enquiry: 'Hi Jatin, I need custom software. Here is what my business does: ',
  },
];

export const customOption = {
  title: 'Something else in mind?',
  body:
    'Not sure which one fits, or need something none of these covers? Tell me what is slowing your business down and I will tell you honestly what it takes — and if you do not need to build anything, I will say that too.',
  ctaLabel: 'Custom requirement? Let’s talk',
  enquiry: 'Hi Jatin, I have a custom requirement I want to discuss.',
};

export const pricingAssurances = [
  `Yes, really ${formatINR(STARTER)} — no hidden charges, no surprise bills.`,
  'Half the payment to start, half on delivery.',
  'Written quote before any work begins.',
  'You own the code, the content and the domain.',
];

/** The entry price, as a number and as display text. */
export const lowestPrice = Math.min(...pricingTiers.map((tier) => tier.priceValue));
export const startingPrice = formatINR(lowestPrice);

/** Looks up a tier by id; throws at build time if the id is ever renamed. */
export function tier(id: string): PricingTier {
  const found = pricingTiers.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown pricing tier: ${id}`);
  return found;
}
