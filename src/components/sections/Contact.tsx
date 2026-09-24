import { Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { defaultEnquiry, site, whatsappLink } from '@/data/site';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contact" className="defer-render relative isolate overflow-hidden border-t border-line py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="ruled-paper absolute inset-0 opacity-60 dark:opacity-30"
          style={{
            maskImage: 'radial-gradient(100% 70% at 50% 100%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(100% 70% at 50% 100%, black 20%, transparent 75%)',
          }}
        />
      </div>

      <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Start here"
            title="Tell me what your business needs"
            description="No obligation, no sales pressure. Describe your problem and I will tell you what it takes, what it costs, and whether you even need it."
          />

          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center gap-3 rounded-card border border-accent/40 bg-accent/5 p-4">
              <Clock className="h-5 w-5 shrink-0 text-accent-ink" aria-hidden="true" />
              <p className="text-sm text-fg">
                <strong className="font-semibold">I reply within {site.responseTime}.</strong>{' '}
                <span className="text-muted">{site.workingHours}.</span>
              </p>
            </div>

            <ButtonLink
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </ButtonLink>

            <ButtonLink href={`tel:${site.phone}`} variant="secondary" size="lg" className="w-full">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {site.phoneDisplay}
            </ButtonLink>

            <LedgerRule className="my-2" />

            <a
              href={`mailto:${site.email}`}
              className="tap-target inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-brand-ink"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.email}
            </a>
            <p className="text-sm text-subtle">
              Based in {site.location.city}. I work with businesses across India, and I speak{' '}
              {site.languages.join(' and ')}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {/* Read on the server, so the key's presence decides the copy the
              visitor sees without the key itself ever reaching the browser. */}
          <ContactForm leadBackup={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL)} />
        </Reveal>
      </div>
    </section>
  );
}
