import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PostBody } from '@/components/blog/PostBody';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { getPost, posts } from '@/data/posts';
import { defaultEnquiry, site, whatsappLink } from '@/data/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { 'text/markdown': `/blog/${post.slug}.md` },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const others = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <article className="pb-20 pt-28 sm:pb-24 sm:pt-36">
      <ArticleJsonLd post={post} />

      <div className="shell flex max-w-prose flex-col gap-6">
        <Link
          href="/blog"
          className="tap-target inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All articles
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-eyebrow uppercase text-subtle">
          <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
          {post.updatedAt !== post.publishedAt ? (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {dateFormatter.format(new Date(post.updatedAt))}</span>
            </>
          ) : null}
        </div>

        <h1 className="text-display-lg">{post.title}</h1>
        <LedgerRule className="max-w-[140px]" />

        {/* The answer, first. Anything scanning this page — a person or a
            model — gets the conclusion before any of the reasoning. */}
        <p className="text-lead font-medium text-fg">{post.answer}</p>

        <div className="border-t border-line pt-8">
          <PostBody blocks={post.body} />
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-card border border-line bg-sunken p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-muted">
            Written by {site.name}, a developer in {site.location.city} who builds websites, apps and
            billing software for Indian small businesses. If you have a question this did not answer,
            message me — I reply within {site.responseTime}.
          </p>
          <ButtonLink
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="fx-magnet w-full sm:w-auto sm:self-start"
          >
            Ask me directly
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        {others.length > 0 ? (
          <nav aria-label="More articles" className="flex flex-col gap-4 border-t border-line pt-8">
            <h2 className="eyebrow">Read next</h2>
            <ul className="flex flex-col gap-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="tap-target inline-flex items-center gap-2 font-display text-base font-semibold text-fg transition-colors hover:text-brand-ink"
                  >
                    {other.title}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-pill border border-line px-3 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
