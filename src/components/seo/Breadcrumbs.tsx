import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteUrl } from '@/data/site';

type Crumb = { name: string; path: string };

/**
 * A visible breadcrumb trail plus its `BreadcrumbList`, from one list, so
 * the two can never disagree. The trail is also real internal linking: every
 * service page links up to /services and home.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="inline-flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    prefetch={false}
                    className="tap-target inline-flex items-center underline-offset-2 hover:text-brand-ink hover:underline"
                  >
                    {crumb.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
