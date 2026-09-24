import type { Metadata } from 'next';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { privacyUpdatedAt, site } from '@/data/site';
import { umamiWebsiteId } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `What ${site.name}'s website collects, why, and how to have it deleted.`,
  alternates: { canonical: '/privacy' },
};

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * A notice in plain language, written to be true of this deployment: the
 * analytics and email-copy paragraphs appear only when those features are
 * actually switched on, so the page never describes processing that is not
 * happening. Satisfies the notice duty under India's DPDP Act, 2023.
 */
export default function PrivacyPage() {
  const leadBackup = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

  return (
    <article className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <div className="shell flex max-w-prose flex-col gap-6">
        <p className="eyebrow">Privacy</p>
        <h1 className="text-display-lg">What this website collects, and why</h1>
        <LedgerRule className="max-w-[140px]" />
        <p className="text-lead font-medium text-fg">
          Very little. No accounts, no advertising, no tracking cookies, and nothing is ever sold or
          shared.
        </p>
        <p className="font-mono text-eyebrow uppercase text-subtle">
          Last updated <time dateTime={privacyUpdatedAt}>{dateFormatter.format(new Date(privacyUpdatedAt))}</time>
        </p>

        <div className="flex flex-col gap-6 border-t border-line pt-8 text-base leading-relaxed text-muted">
          <h2 className="text-display-sm">When you contact me</h2>
          <p>
            The contact form does not save anything on this website. It prepares a WhatsApp message
            with the details you typed and opens WhatsApp; nothing is sent until you press send
            there, and from then on WhatsApp&apos;s own privacy policy applies to that chat.
          </p>
          {leadBackup ? (
            <p>
              When you submit the form, a copy of the same details is also emailed to me, so your
              enquiry is not lost if the WhatsApp step does not complete. It goes to my inbox through
              an email delivery service (Resend) and is not stored anywhere else.
            </p>
          ) : null}
          <p>
            I use your details only to reply to you and, if we work together, to deliver your
            project. I keep them only for as long as that takes.
          </p>

          {umamiWebsiteId ? (
            <>
              <h2 className="text-display-sm">Visitor statistics</h2>
              <p>
                I count visits with Umami, a privacy-focused analytics service that sets no cookies
                and does not identify you. It records which pages are viewed and which contact buttons
                are tapped, as totals, so I can tell which parts of this site are useful.
              </p>
            </>
          ) : null}

          <h2 className="text-display-sm">Stored on your device</h2>
          <p>
            If you switch between light and dark mode, that choice is saved in your own browser so the
            site remembers it. It never leaves your device.
          </p>

          <h2 className="text-display-sm">Your rights</h2>
          <p>
            You can ask what I hold about you, ask me to correct it, or ask me to delete it. Email{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-ink underline underline-offset-2"
            >
              {site.email}
            </a>{' '}
            and I will reply within 7 days.
          </p>
        </div>
      </div>
    </article>
  );
}
