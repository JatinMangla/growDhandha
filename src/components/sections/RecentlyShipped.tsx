import { ArrowUpRight, Github } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fetchShowcaseRepos } from '@/lib/github';

const dateFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric' });

/**
 * A live strip of the newest public work, fed by GitHub rather than by hand:
 * any repo tagged with the showcase topic appears here within a day. Renders
 * nothing when there is nothing tagged or GitHub cannot be reached.
 */
export async function RecentlyShipped() {
  const repos = await fetchShowcaseRepos();
  if (repos.length === 0) return null;

  return (
    <section id="recent" className="defer-render py-16 sm:py-20">
      <div className="shell flex flex-col gap-10">
        <SectionHeading
          eyebrow="Recently shipped"
          title="What I am building right now"
          description="Straight from GitHub, updated daily — proof the work does not stop between client projects."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, index) => (
            <Reveal as="li" key={repo.url} delay={(index % 3) * 0.08}>
              <article className="surface-card flex h-full flex-col gap-3 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 font-mono text-eyebrow uppercase text-subtle">
                  <span>{repo.language ?? 'Code'}</span>
                  <time dateTime={repo.pushedAt}>{dateFormatter.format(new Date(repo.pushedAt))}</time>
                </div>
                <h3 className="font-display text-lg font-semibold">{repo.name}</h3>
                {repo.description ? (
                  <p className="text-sm leading-relaxed text-muted">{repo.description}</p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-x-5 pt-2">
                  {repo.homepage ? (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-fg transition-colors hover:text-brand-ink"
                    >
                      Live
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only"> — {repo.name}</span>
                    </a>
                  ) : null}
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-fg transition-colors hover:text-brand-ink"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Source
                    <span className="sr-only"> — {repo.name}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
