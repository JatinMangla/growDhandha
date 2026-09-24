import { faqs } from '@/data/faqs';
import { lowestPrice, pricingTiers } from '@/data/pricing';
import { processSteps } from '@/data/process';
import { services } from '@/data/services';
import { site, siteUrl } from '@/data/site';

type Schema = Record<string, unknown>;

const businessId = `${siteUrl}/#business`;
const personId = `${siteUrl}/#person`;

const person: Schema = {
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  jobTitle: site.role,
  description: `${site.role} with ${site.yearsExperience}+ years of professional experience, building websites, mobile apps and business software for Indian small businesses.`,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  knowsLanguage: site.languages,
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.portfolio],
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: site.education,
  },
  worksFor: {
    '@type': 'Organization',
    name: site.currentEmployer,
  },
  knowsAbout: [
    'Web development',
    'Mobile app development',
    'React',
    'Next.js',
    'TypeScript',
    'Inventory management software',
    'Billing software',
    'CRM development',
  ],
};

const professionalService: Schema = {
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': businessId,
  name: `${site.name} — ${site.role}`,
  description: site.shortDescription,
  url: siteUrl,
  telephone: site.phone,
  email: site.email,
  priceRange: '₹₹',
  founder: { '@id': personId },
  /* A service-area business: there is no shopfront, so no street address or
     postcode. Publishing an invented one (this used to send the city name as
     the street and Connaught Place's PIN) is exactly what Google's local
     guidelines prohibit. `areaServed` carries the geography instead. */
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  areaServed: [
    { '@type': 'City', name: 'Delhi' },
    { '@type': 'Country', name: 'India' },
  ],
  availableLanguage: site.languages,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  image: `${siteUrl}/opengraph-image`,
  logo: `${siteUrl}/icon.svg`,
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.promise,
      provider: { '@id': businessId },
      areaServed: { '@type': 'Country', name: 'India' },
      serviceType: service.title,
    },
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'INR',
      minPrice: lowestPrice,
    },
  })),
  /* Real per-tier prices, so an assistant can state a figure and attribute it
     rather than paraphrasing "affordable". `priceValue` comes from the same
     data that renders the pricing cards, so the two cannot disagree. */
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    '@id': `${siteUrl}/#pricing`,
    name: 'Website and software packages',
    itemListElement: pricingTiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: tier.bestFor,
      price: tier.priceValue,
      priceCurrency: 'INR',
      ...(tier.priceIsFrom
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'INR',
              minPrice: tier.priceValue,
            },
          }
        : {}),
      availability: 'https://schema.org/InStock',
      seller: { '@id': businessId },
      url: `${siteUrl}/pricing`,
      deliveryLeadTime: tier.timeline,
    })),
  },
};

/** The five delivery steps are a genuine HowTo, and nothing else competes for it. */
const howTo: Schema = {
  '@type': 'HowTo',
  '@id': `${siteUrl}/#process`,
  name: 'How a website or app project runs, start to finish',
  description:
    'The five steps from first conversation to launch, including what you pay when and what you see at each stage.',
  inLanguage: 'en-IN',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    minValue: lowestPrice,
  },
  step: processSteps.map((processStep, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: processStep.title,
    text: `${processStep.description} ${processStep.detail}`,
    url: `${siteUrl}/#process`,
  })),
};

const faqPage: Schema = {
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const website: Schema = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: `${site.name} — ${site.role}`,
  inLanguage: 'en-IN',
  publisher: { '@id': businessId },
};

export const homepageGraph = {
  '@context': 'https://schema.org',
  '@graph': [website, professionalService, person, faqPage, howTo],
};

/**
 * One consolidated @graph rather than several loose blocks, so every entity
 * can reference the others by @id and search engines see a single business.
 */
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageGraph) }}
    />
  );
}
