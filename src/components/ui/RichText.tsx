import Link from 'next/link';
import { Fragment } from 'react';
import { parseRichText } from '@/lib/rich-text';

/**
 * Renders a content string, turning `[text](/path)` into internal links.
 * `prefetch={false}` because body links are many and mostly unclicked; a
 * prefetch per link would spend a phone's data and CPU on guesses.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseRichText(text).map((segment, index) =>
        typeof segment === 'string' ? (
          <Fragment key={index}>{segment}</Fragment>
        ) : (
          <Link
            key={index}
            href={segment.href}
            prefetch={false}
            className="font-medium text-brand-ink underline underline-offset-2 transition-colors hover:text-fg"
          >
            {segment.text}
          </Link>
        ),
      )}
    </>
  );
}
