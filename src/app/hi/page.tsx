import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Check, Clock, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { Reveal } from '@/components/ui/Reveal';
import {
  hiContact,
  hiEnquiry,
  hiFaqs,
  hiHero,
  hiPrice,
  hiProcess,
  hiServices,
  hiTiers,
} from '@/data/hi';
import { pricingTiers, startingPrice } from '@/data/pricing';
import { services } from '@/data/services';
import { site, whatsappLink } from '@/data/site';
import { cn } from '@/lib/utils';

const TITLE = `दिल्ली में वेबसाइट और ऐप डेवलपमेंट — ${startingPrice} से`;
const DESCRIPTION = `छोटे बिज़नेस के लिए वेबसाइट, मोबाइल ऐप, बिलिंग और स्टॉक सॉफ़्टवेयर। तय कीमत, ${startingPrice} से। सीधे डेवलपर से WhatsApp पर बात करें।`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/hi',
    languages: { 'en-IN': '/', 'hi-IN': '/hi', 'x-default': '/' },
  },
  openGraph: { type: 'website', locale: 'hi_IN', url: '/hi', title: TITLE, description: DESCRIPTION },
};

const assuranceIcons = [BadgeCheck, MessageCircle, Clock];

/**
 * The Hindi landing page: the whole pitch on one page — what I build, what it
 * costs, how it works, the common questions — and the same WhatsApp hand-off,
 * with the pre-filled message in Hindi.
 *
 * Section ids are distinct (`hi-*`) so conversion events from this page are
 * labelled separately from the English homepage in analytics.
 */
export default function HindiPage() {
  return (
    <div lang="hi-IN" className="lang-hi">
      <section id="hi-hero" className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div
          aria-hidden="true"
          className="ruled-paper pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-30"
          style={{
            maskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, black 30%, transparent 78%)',
          }}
        />
        <div className="shell flex flex-col items-start gap-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="eyebrow">{hiHero.eyebrow}</p>
            <Link
              href="/"
              prefetch={false}
              lang="en"
              hrefLang="en-IN"
              className="tap-target inline-flex items-center text-sm font-medium text-muted underline underline-offset-2 hover:text-brand-ink"
            >
              Read in English
            </Link>
          </div>

          <h1 className="max-w-[18ch] text-display-xl">
            {hiHero.titleLead} <span className="text-gradient-brand">{hiHero.titlePrice}</span>
          </h1>
          <LedgerRule className="max-w-md" />
          <p className="max-w-[52ch] text-lead text-muted">{hiHero.lead}</p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink
              href={whatsappLink(hiEnquiry.default)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              data-cta="hi-hero"
              className="w-full sm:w-auto"
            >
              {hiHero.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#hi-pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              {hiHero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {hiHero.assurances.map((label, index) => {
              const Icon = assuranceIcons[index] ?? BadgeCheck;
              return (
                <li key={label} className="inline-flex items-center gap-2 text-sm text-muted">
                  <Icon className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                  {label}
                </li>
              );
            })}
          </ul>

          <p className="inline-flex items-start gap-2.5 rounded-card border border-line bg-surface/70 p-4 text-sm text-muted">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
            <span>{hiHero.honestPrice}</span>
          </p>
        </div>
      </section>

      <section id="hi-services" className="border-y border-line bg-sunken py-16 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <HiHeading eyebrow="मैं क्या बनाता हूँ" title="छोटे बिज़नेस के काम की छह चीज़ें" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const copy = hiServices[service.id];
              if (!copy) return null;
              const Icon = service.icon;
              return (
                <Reveal as="li" key={service.id} delay={(index % 3) * 0.08}>
                  <article className="surface-card flex h-full flex-col gap-3 p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-soft bg-brand/10 text-brand-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-display-sm">{copy.title}</h3>
                    <p className="text-base leading-relaxed text-muted">{copy.promise}</p>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="hi-pricing" className="py-16 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <HiHeading
            eyebrow="कीमत"
            title="एक कीमत, पहले से तय। बाद में कोई सरप्राइज़ नहीं।"
            description="जो प्लान आज आपके बिज़नेस के लिए सही है, वो चुनें। बाद में कभी भी और जोड़ सकते हैं।"
          />
          <ul className="grid items-start gap-5 lg:grid-cols-3">
            {pricingTiers.map((item, index) => {
              const copy = hiTiers[item.id];
              if (!copy) return null;
              return (
                <Reveal as="li" key={item.id} delay={index * 0.08} className="h-full">
                  <article
                    className={cn(
                      'surface-card flex h-full flex-col gap-5 p-6 sm:p-8',
                      item.featured && 'border-brand shadow-lift',
                    )}
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-display-md font-semibold text-fg">{hiPrice(item)}</p>
                      <p className="text-sm text-subtle">{copy.priceNote}</p>
                      <p className="text-base leading-relaxed text-muted">{copy.bestFor}</p>
                      <p className="text-sm font-medium text-accent-ink">{copy.timeline}</p>
                    </div>
                    <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                      {copy.includes.map((line) => (
                        <li key={line} className="flex items-start gap-2.5 text-sm text-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonLink
                      href={whatsappLink(copy.enquiry)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant={item.featured ? 'primary' : 'secondary'}
                      size="lg"
                      data-cta={`hi-tier-${item.id}`}
                      className="mt-auto w-full"
                    >
                      {copy.ctaLabel}
                    </ButtonLink>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="hi-process" className="border-y border-line bg-sunken py-16 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <HiHeading eyebrow="काम कैसे होता है" title="पाँच क़दम — और हर क़दम पर आपको पता रहता है कि काम कहाँ है" />
          <ol className="flex flex-col gap-6">
            {hiProcess.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.05} className="relative pl-16">
                <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface font-mono text-sm font-semibold text-brand-ink">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-display-sm">{step.title}</h3>
                    <span className="rounded-pill border border-line px-2.5 py-1 text-xs text-subtle">
                      {step.duration}
                    </span>
                  </div>
                  <p className="max-w-prose text-base leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="hi-faq" className="py-16 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <HiHeading eyebrow="सवाल" title="हाँ कहने से पहले लोग ये पूछते हैं" />
          <dl className="flex max-w-prose flex-col gap-6">
            {hiFaqs.map((faq) => (
              <Reveal key={faq.question} className="flex flex-col gap-2 border-t border-line pt-6">
                <dt className="text-lg font-semibold text-fg">{faq.question}</dt>
                <dd className="text-base leading-relaxed text-muted">{faq.answer}</dd>
              </Reveal>
            ))}
          </dl>
          <ButtonLink
            href={whatsappLink(hiEnquiry.question)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="self-start"
          >
            अपना सवाल पूछें
          </ButtonLink>
        </div>
      </section>

      <section id="hi-contact" className="border-t border-line bg-sunken py-16 sm:py-24">
        <div className="shell flex max-w-3xl flex-col gap-6">
          <HiHeading eyebrow="शुरुआत यहाँ से" title={hiContact.title} description={hiContact.text} />
          <p className="flex items-center gap-3 rounded-card border border-accent/40 bg-accent/5 p-4 text-sm text-fg">
            <Clock className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
            {hiContact.hours}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappLink(hiEnquiry.default)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {hiHero.primaryCta}
            </ButtonLink>
            <ButtonLink href={`tel:${site.phone}`} variant="secondary" size="lg" className="w-full sm:w-auto">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {hiContact.call} <span lang="en">{site.phoneDisplay}</span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function HiHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <Reveal className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">{eyebrow}</span>
        <LedgerRule className="max-w-[140px]" />
      </div>
      <h2 className="max-w-[24ch] text-display-md">{title}</h2>
      {description ? <p className="max-w-prose text-lead text-muted">{description}</p> : null}
    </Reveal>
  );
}
