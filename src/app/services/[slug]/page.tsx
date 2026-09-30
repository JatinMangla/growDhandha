import type { Metadata } from 'next';
import { seoTitle } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { RichText } from '@/components/ui/RichText';
import { faqs } from '@/data/faqs';
import { posts } from '@/data/posts';
import { pricingTiers } from '@/data/pricing';
import { processSteps } from '@/data/process';
import { getService, services } from '@/data/services';
import { site, siteUrl, whatsappLink } from '@/data/site';
import { plainText } from '@/lib/rich-text';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const path = `/services/${service.id}`;
  return {
    title: seoTitle(service.page.headline),
    description: service.page.summary,
    alternates: { canonical: path, types: { 'text/markdown': `${path}.md` } },
    openGraph: { type: 'website', url: path, title: service.page.headline, description: service.page.summary },
  };
}

/**
 * A service's own landing page — the page someone searching for exactly this
 * should arrive on. One click from the homepage and from the /services hub,
 * linked to its related guides and sibling services, so it sits inside a
 * topic cluster rather than on its own.
 */
export default async function ServicePage({ params }: PageProps) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const { page } = service;
  const url = `${siteUrl}/services/${service.id}`;
  const tiers = page.tierIds.flatMap((id) => pricingTiers.filter((item) => item.id === id));
  const questions = page.faqIds.flatMap((id) => faqs.filter((faq) => faq.id === id));
  const guides = page.postSlugs.flatMap((slug) => posts.filter((post) => post.slug === slug));
  const siblings = services.filter((item) => item.id !== service.id);
  const enquiry = `Hi Jatin, I want to know more about: ${service.title}.`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: plainText(page.intro.join(' ')),
    url,
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: [
      { '@type': 'City', name: site.location.city },
      { '@type': 'Country', name: site.location.country },
    ],
    offers: tiers.map((item) => ({
      '@type': 'Offer',
      name: item.name,
      price: item.priceValue,
      priceCurrency: 'INR',
      url: `${siteUrl}/pricing`,
      ...(item.priceIsFrom
        ? { priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: item.priceValue } }
        : {}),
    })),
  };

  return (
    <article className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="shell flex flex-col gap-14">
        <header className="flex max-w-3xl flex-col gap-6">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path: `/services/${service.id}` },
            ]}
          />
          <h1 className="text-display-lg">{page.headline}</h1>
          <LedgerRule className="max-w-[140px]" />
          <p className="text-lead font-medium text-fg">{service.promise}</p>
          {page.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
              <RichText text={paragraph} />
            </p>
          ))}
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(enquiry)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              data-cta={`service-${service.id}`}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Ask about this on WhatsApp
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              See all prices
            </ButtonLink>
          </div>
        </header>

        <section aria-labelledby="for-who" className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 id="for-who" className="text-display-sm">
              Who it is for
            </h2>
            <ul className="flex flex-col gap-3">
              {page.forWho.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-base text-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-display-sm">What you get</h2>
            <ul className="flex flex-col gap-3">
              {service.outcomes.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-base text-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="price" className="flex flex-col gap-6">
          <h2 id="price" className="text-display-sm">
            Price and timeline
          </h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {tiers.map((item) => (
              <li key={item.id} className="surface-card flex flex-col gap-3 p-6">
                <p className="font-display text-lg font-semibold">{item.name}</p>
                <p className="font-display text-display-sm font-semibold">{item.price}</p>
                <p className="text-sm text-subtle">{item.priceNote}</p>
                <p className="text-sm font-medium text-accent-ink">{item.timeline}</p>
                <ul className="flex flex-col gap-2 border-t border-line pt-4">
                  {item.includes.slice(0, 5).map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Link
            href="/pricing"
            prefetch={false}
            className="tap-target inline-flex items-center gap-1.5 self-start text-sm font-semibold text-fg hover:text-brand-ink"
          >
            Full pricing breakdown, and what is genuinely extra
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="how" className="flex flex-col gap-6">
          <h2 id="how" className="text-display-sm">
            How it works
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.id} className="surface-card flex flex-col gap-2 p-5">
                <span className="font-mono text-sm font-semibold text-brand-ink">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-semibold">{step.title}</span>
                <span className="text-sm text-muted">{step.description}</span>
              </li>
            ))}
          </ol>
        </section>

        {questions.length > 0 ? (
          <section aria-labelledby="questions" className="flex max-w-3xl flex-col gap-6">
            <h2 id="questions" className="text-display-sm">
              Questions people ask
            </h2>
            <dl className="flex flex-col gap-6">
              {questions.map((faq) => (
                <div key={faq.id} className="flex flex-col gap-2 border-t border-line pt-6">
                  <dt className="font-display text-lg font-semibold">{faq.question}</dt>
                  <dd className="text-base leading-relaxed text-muted">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
          {guides.length > 0 ? (
            <nav aria-labelledby="guides" className="flex flex-col gap-4">
              <h2 id="guides" className="eyebrow">
                Read before you decide
              </h2>
              <ul className="flex flex-col gap-2">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      prefetch={false}
                      className="tap-target inline-flex items-center gap-2 font-display font-semibold text-fg hover:text-brand-ink"
                    >
                      {post.title}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <nav aria-labelledby="other-services" className="flex flex-col gap-4">
            <h2 id="other-services" className="eyebrow">
              Other services
            </h2>
            <ul className="flex flex-col gap-2">
              {siblings.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/services/${item.id}`}
                    prefetch={false}
                    className="tap-target inline-flex items-center gap-2 text-fg hover:text-brand-ink"
                  >
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-sunken p-6 sm:p-8">
          <p className="max-w-prose text-base leading-relaxed text-muted">
            Tell me what your business does and what is slowing it down. I reply within {site.responseTime}, and
            if you do not need to build anything, I will say so.
          </p>
          <ButtonLink
            href={whatsappLink(enquiry)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            data-cta={`service-${service.id}-footer`}
            className="w-full sm:w-auto sm:self-start"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Chat on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
