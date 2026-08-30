import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LedgerRule } from '@/components/ui/LedgerRule';
import { getPost, posts } from '@/data/posts';

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
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
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

  return (
    <article className="pb-20 pt-28 sm:pb-24 sm:pt-36">
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
        </div>

        <h1 className="text-display-lg">{post.title}</h1>
        <LedgerRule className="max-w-[140px]" />
        <p className="text-lead text-muted">{post.description}</p>

        <div className="flex flex-col gap-5 border-t border-line pt-8">
          {post.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

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
