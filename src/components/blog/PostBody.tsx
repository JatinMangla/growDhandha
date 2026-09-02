import type { PostBlock } from '@/types';

/**
 * Renders an article's blocks.
 *
 * Headings are `h2` so the document outline stays flat and predictable under
 * the page `h1` — extraction models follow heading order, and a jumbled
 * hierarchy is a common reason a passage is skipped. `qa` blocks render as a
 * definition list and are emitted separately as `FAQPage` structured data.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'heading':
            return (
              <h2 key={index} className="mt-4 text-display-sm">
                {block.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p key={index} className="text-base leading-relaxed text-muted">
                {block.text}
              </p>
            );

          case 'list': {
            const List = block.ordered ? 'ol' : 'ul';
            return (
              <List key={index} className="flex flex-col gap-3 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-base leading-relaxed text-muted">
                    {block.ordered ? (
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 font-mono text-sm font-semibold text-brand-ink"
                      >
                        {String(itemIndex + 1).padStart(2, '0')}
                      </span>
                    ) : (
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </List>
            );
          }

          case 'callout':
            return (
              <p
                key={index}
                className="rounded-card border-l-2 border-brand bg-brand/5 py-4 pl-5 pr-4 text-base font-medium leading-relaxed text-fg"
              >
                {block.text}
              </p>
            );

          case 'qa':
            return (
              <dl key={index} className="flex flex-col gap-2 border-t border-line pt-6">
                <dt className="font-display text-lg font-semibold text-fg">{block.question}</dt>
                <dd className="text-base leading-relaxed text-muted">{block.answer}</dd>
              </dl>
            );
        }
      })}
    </div>
  );
}
