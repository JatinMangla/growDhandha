import { faqs } from '@/data/faqs';
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
  sameAs: [site.socials.linkedin, site.socials.github],
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.countryCode,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Galgotias University',
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
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.location.city,
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    postalCode: site.location.postalCode,
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
      minPrice: 4999,
    },
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

const graph = {
  '@context': 'https://schema.org',
  '@graph': [website, professionalService, person, faqPage],
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
