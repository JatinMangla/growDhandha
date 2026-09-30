import type { Metadata } from 'next';
import { seoTitle } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Github, Globe, Linkedin, MessageCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { person } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { differentiators } from '@/data/differentiators';
import { projectKindLabel, projects } from '@/data/projects';
import { defaultEnquiry, site, siteUrl, whatsappLink } from '@/data/site';
import { headlineUsers } from '@/data/stats';
import { techGroups } from '@/data/tech';

const TITLE = `About ${site.name} — web & app developer in ${site.location.city}`;
const DESCRIPTION = `${site.name} is a ${site.role.toLowerCase()} in ${site.location.city} with ${site.yearsExperience}+ years of experience, building websites, apps and business software for Indian small businesses.`;

export const metadata: Metadata = {
  title: seoTitle(TITLE),
  description: DESCRIPTION,
  alternates: { canonical: '/about', types: { 'text/markdown': '/about.md' } },
  openGraph: { type: 'profile', url: '/about', title: TITLE, description: DESCRIPTION },
};

/**
 * The author page. Every article's byline links here, and the site's Person
 * entity points at it, so "who wrote this and why trust them" has a real
 * answer — the experience and expertise half of E-E-A-T.
 *
 * Facts only from src/data. Add a photo here once there is one; a real face
 * is the single biggest trust signal this page is missing.
 */
export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/about#page`,
    url: `${siteUrl}/about`,
    name: TITLE,
    mainEntity: person,
  };
  const ownWork = projects.filter((project) => project.kind === 'product');
  const professional = projects.filter((project) => project.kind === 'employer');

  return (
    <article className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="shell flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]}
          />
          <h1 className="text-display-lg">About {site.name}</h1>
          <LedgerRule className="max-w-[140px]" />
          <p className="text-lead font-medium text-fg">
            I am a {site.role.toLowerCase()} in {site.location.city} with {site.yearsExperience}+ years of
            professional experience. I build websites, mobile apps and business software for Indian small
            businesses, and I write the code myself.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            By day I work at {site.currentEmployer} on enterprise software, including the frontend of Mera
            Monitor, a fintech platform used by {headlineUsers} people. The standards that work demands —
            security, speed, testing, accessibility — are the same ones I bring to a small shop&apos;s
            website. I studied at {site.education}, and I work in {site.languages.join(' and ')}.
          </p>
        </header>

        <section aria-labelledby="built" className="flex flex-col gap-4">
          <h2 id="built" className="text-display-sm">
            Things I have built
          </h2>
          <ul className="flex flex-col gap-3">
            {[...ownWork, ...professional].map((project) => (
              <li key={project.id} className="flex flex-col gap-1 border-t border-line pt-3">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display font-semibold text-fg">{project.name}</span>
                  <span className="text-sm text-subtle">
                    {projectKindLabel[project.kind]} · {project.year}
                  </span>
                </span>
                <span className="text-sm leading-relaxed text-muted">{project.result}</span>
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg hover:text-brand-ink"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source on GitHub
                    <span className="sr-only"> for {project.name}</span>
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <Link
            href="/#work"
            prefetch={false}
            className="tap-target inline-flex items-center gap-1.5 self-start text-sm font-semibold text-fg hover:text-brand-ink"
          >
            Problem, solution and result for each
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section aria-labelledby="principles" className="flex flex-col gap-4">
          <h2 id="principles" className="text-display-sm">
            How I work
          </h2>
          <ul className="flex flex-col gap-3">
            {differentiators.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 border-t border-line pt-3">
                <span className="font-display font-semibold text-fg">{item.title}</span>
                <span className="text-sm leading-relaxed text-muted">{item.answer}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tools" className="flex flex-col gap-4">
          <h2 id="tools" className="text-display-sm">
            Tools I use
          </h2>
          <dl className="flex flex-col gap-3">
            {techGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-1">
                <dt className="eyebrow">{group.label}</dt>
                <dd className="text-sm text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="elsewhere" className="flex flex-col gap-4">
          <h2 id="elsewhere" className="text-display-sm">
            Elsewhere
          </h2>
          <ul className="flex flex-wrap gap-3">
            {[
              { href: site.socials.linkedin, label: 'LinkedIn — full work history', Icon: Linkedin },
              { href: site.socials.github, label: 'GitHub — code and side projects', Icon: Github },
              { href: site.socials.portfolio, label: 'Developer portfolio — case studies', Icon: Globe },
            ].map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="tap-target inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2.5 text-sm text-fg hover:border-brand hover:text-brand-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-4 rounded-card border border-line bg-sunken p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">
            Want to talk about your project? Message me directly — I reply within {site.responseTime}.
          </p>
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            data-cta="about"
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
