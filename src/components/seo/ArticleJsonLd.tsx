import { site, siteUrl } from '@/data/site';
import type { Post } from '@/types';

type Schema = Record<string, unknown>;

const personId = `${siteUrl}/#person`;
const businessId = `${siteUrl}/#business`;

/** Rough word count across every block, for `wordCount`. */
function countWords(post: Post): number {
  const text = [
    post.title,
    post.description,
    post.answer,
    ...post.body.flatMap((block) => {
      switch (block.kind) {
        case 'heading':
        case 'paragraph':
        case 'callout':
          return [block.text];
        case 'list':
          return block.items;
        case 'qa':
          return [block.question, block.answer];
      }
    }),
  ].join(' ');

  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Per-article structured data: the article itself, its position in the site,
 * and its question-and-answer pairs.
 *
 * The `qa` blocks are emitted as a `FAQPage` because a self-contained question
 * with a self-contained answer is the single most reliably quoted structure
 * there is — it needs no surrounding context to make sense. Author and
 * publisher reference the homepage graph by `@id` rather than restating the
 * entities, so there is one business and one person across the whole site.
 */
export function ArticleJsonLd({ post }: { post: Post }) {
  const url = `${siteUrl}/blog/${post.slug}`;

  const article: Schema = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    abstract: post.answer,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: 'en-IN',
    wordCount: countWords(post),
    keywords: post.tags.join(', '),
    articleSection: post.tags[0] ?? 'Guides',
    author: { '@id': personId },
    publisher: { '@id': businessId },
    image: `${siteUrl}/opengraph-image`,
    isAccessibleForFree: true,
  };

  const breadcrumb: Schema = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const questions = post.body.filter((block) => block.kind === 'qa');

  const graph: Schema[] = [article, breadcrumb];

  if (questions.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: questions.map((block) => ({
        '@type': 'Question',
        name: block.question,
        acceptedAnswer: { '@type': 'Answer', text: block.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
