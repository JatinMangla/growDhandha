import type { CSSProperties, ReactNode } from 'react';

type RevealTag = 'div' | 'li' | 'section' | 'article' | 'span' | 'ol' | 'ul';

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  className?: string;
  as?: RevealTag;
};

/**
 * Scroll-triggered reveal.
 *
 * Deliberately a **server** component: it only stamps `data-reveal` and a
 * delay custom property onto the element. All the behaviour lives in one
 * client component (`RevealObserver`, mounted once in the layout) and one CSS
 * transition in `globals.css`.
 *
 * There are around forty of these on the homepage. Making each one its own
 * client island — as the first version did — was the largest single source of
 * hydration work on a throttled mobile CPU. This way the page costs one
 * observer and no per-element JavaScript.
 */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const style =
    delay > 0 ? ({ '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;

  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
