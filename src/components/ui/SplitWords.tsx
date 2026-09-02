import { Fragment, type CSSProperties, type ReactNode } from 'react';

type SplitWordsProps = {
  children: string;
  /** Sequence position of the first word, so several lines can share one run. */
  start?: number;
  className?: string;
};

/**
 * Splits a string into per-word masks for the headline assembly.
 *
 * Each word gets its own clipping mask and rises out of it, offset by its
 * position in the sequence. Rendered on the server, so the animation costs
 * nothing but markup — and the sentence is still one continuous run of text
 * for a screen reader, because the spans carry no roles and no aria.
 */
export function SplitWords({ children, start = 0, className }: SplitWordsProps) {
  const words = children.split(' ');

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word-mask" style={{ '--w': start + index } as CSSProperties}>
            {/* `className` belongs on the inner span, not the mask: a
                `background-clip: text` gradient applied to the wrapper would
                make the text transparent with nothing clipped behind it. */}
            <span className={className}>{word}</span>
          </span>
          {/* The separator lives outside the mask. Inside it, the trailing
              space collapses against `overflow: hidden` and the words run
              together. */}
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

/** A phrase that rises as one unit — used where a gradient must stay unbroken. */
export function SplitPhrase({
  children,
  start = 0,
  className,
}: {
  children: ReactNode;
  start?: number;
  className?: string;
}) {
  return (
    <span className="word-mask" style={{ '--w': start } as CSSProperties}>
      <span className={className}>{children}</span>
    </span>
  );
}
