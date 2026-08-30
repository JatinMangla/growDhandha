import { ArrowUpRight, Github } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

/** Card art tint per project, so the grid reads as a set rather than a list. */
const accentBanner: Record<Project['accent'], string> = {
  brand: 'from-brand/25 to-gold/10 text-brand-ink',
  accent: 'from-accent/25 to-brand/10 text-accent-ink',
  gold: 'from-gold/30 to-accent/10 text-fg',
};

export function Portfolio() {
  return (
    <section id="work" className="defer-render py-20 sm:py-24 lg:py-32">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Selected work"
          title="Real problems, and what changed after"
          description="Enterprise platforms, AI tools and live dashboards. Client work is often under agreement, so each one is described by the problem it solved rather than by screenshots."
        />

        <ul className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 2) * 0.08}>
              <article className="bracket-frame surface-card group flex h-full flex-col overflow-hidden transition-all duration-300 ease-entrance hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift">
                <div
                  className={cn(
                    'relative flex h-32 items-center justify-between gap-4 bg-gradient-to-br px-6 sm:h-36 sm:px-7',
                    accentBanner[project.accent],
                  )}
                >
                  <span className="ruled-paper absolute inset-0 opacity-25" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="relative font-display text-5xl font-bold tracking-tight opacity-90 transition-transform duration-500 group-hover:scale-105 sm:text-6xl"
                  >
                    {project.monogram}
                  </span>
                  <span className="relative ml-auto text-right font-mono text-xs uppercase tracking-wider">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-display-sm">{project.name}</h3>
                    <p className="text-sm text-subtle">{project.category}</p>
                  </div>

                  <dl className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <dt className="eyebrow text-subtle">Problem</dt>
                      <dd className="text-sm leading-relaxed text-muted">{project.problem}</dd>
                    </div>
                    <div className="flex flex-col gap-1">
                      <dt className="eyebrow text-subtle">What I did</dt>
                      <dd className="text-sm leading-relaxed text-muted">{project.solution}</dd>
                    </div>
                    <div className="flex flex-col gap-1 rounded-soft border-l-2 border-brand bg-brand/5 py-2 pl-4">
                      <dt className="eyebrow">Result</dt>
                      <dd className="text-sm font-medium leading-relaxed text-fg">{project.result}</dd>
                    </div>
                  </dl>

                  <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-pill border border-line px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-fg transition-colors hover:text-brand-ink"
                    >
                      Visit {project.name}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="flex flex-col items-start gap-4 rounded-card border border-line bg-sunken p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-prose text-sm leading-relaxed text-muted">
            More code, side projects and open-source work live on GitHub, and my full professional
            history is on LinkedIn.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View GitHub
            </ButtonLink>
            <ButtonLink
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              View LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
