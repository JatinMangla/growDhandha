import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LedgerRule } from './LedgerRule';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  /** Heading level, so document outline stays correct wherever this is used. */
  as?: 'h1' | 'h2' | 'h3';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <Reveal className={cn('flex flex-col gap-4', centered && 'items-center text-center', className)}>
      <div className={cn('flex w-full flex-col gap-3', centered && 'items-center')}>
        <span className="eyebrow">{eyebrow}</span>
        <LedgerRule className={cn(centered ? 'max-w-[220px]' : 'max-w-[140px]')} />
      </div>
      <Tag className="max-w-[22ch] text-display-md sm:max-w-[26ch]">{title}</Tag>
      {description ? (
        <p className={cn('max-w-prose text-lead text-muted', centered && 'mx-auto')}>{description}</p>
      ) : null}
    </Reveal>
  );
}
