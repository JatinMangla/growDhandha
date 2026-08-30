import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, PenLine } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { plannedTopics, posts } from '@/data/posts';
import { defaultEnquiry, whatsappLink } from '@/data/site';

export const metadata: Metadata = {
  title: 'Blog — plain advice on websites, apps and software for Indian businesses',
  description:
    'Straightforward guides on what a website should cost, whether you need an app, and how to get your business found on Google. Written for owners, not developers.',
  alternates: { canonical: '/blog' },
};

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export default function BlogPage() {
  return (
    <div className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          as="h1"
          eyebrow="Blog"
          title="Plain advice, no sales pitch"
          description="Short guides for business owners deciding whether to build something — what it costs, what it takes, and when the honest answer is that you do not need it."
        />

        {posts.length === 0 ? (
          <div className="surface-card flex flex-col gap-6 p-6 sm:p-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-soft bg-brand/10 text-brand-ink">
              <PenLine className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-display-sm">The first articles are being written</h3>
              <p className="max-w-prose text-sm leading-relaxed text-muted">
                Nothing published yet. Rather than fill this page with filler, here is exactly what is
                coming. If one of these is the question you have today, just ask me directly — I will
                answer it in a message instead of making you wait for the article.
              </p>
            </div>

            <LedgerRule className="max-w-[160px]" />

            <ul className="flex flex-col gap-3">
              {plannedTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-sm text-muted">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sm:self-start"
            >
              Ask me your question directly
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="bracket-frame surface-card group flex h-full flex-col gap-3 p-6 transition-all duration-300 ease-entrance hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-eyebrow uppercase text-subtle">
                    <time dateTime={post.publishedAt}>
                      {dateFormatter.format(new Date(post.publishedAt))}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h3 className="text-display-sm">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{post.description}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
