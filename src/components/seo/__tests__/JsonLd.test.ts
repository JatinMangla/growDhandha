import { describe, expect, it } from 'vitest';
import { homepageGraph } from '@/components/seo/JsonLd';
import { pricingTiers } from '@/data/pricing';
import { site, siteUrl } from '@/data/site';

type Node = Record<string, unknown>;
const nodes = homepageGraph['@graph'] as Node[];
const byId = (id: string) => nodes.find((node) => node['@id'] === id) as Node;
const business = byId(`${siteUrl}/#business`);
const person = byId(`${siteUrl}/#person`);

describe('homepage structured data', () => {
  it('publishes no invented street address or postcode', () => {
    const address = business.address as Node;
    expect(address.streetAddress).toBeUndefined();
    expect(address.postalCode).toBeUndefined();
    expect(address.addressLocality).toBe(site.location.city);
  });

  it('quotes exactly the prices the pricing cards show', () => {
    const catalog = business.hasOfferCatalog as { itemListElement: Node[] };
    expect(catalog.itemListElement.map((offer) => offer.price)).toEqual(
      pricingTiers.map((tier) => tier.priceValue),
    );
  });

  it('links every public profile, including the developer portfolio', () => {
    expect(person.sameAs).toEqual(
      expect.arrayContaining([site.socials.linkedin, site.socials.github, site.socials.portfolio]),
    );
  });
});
