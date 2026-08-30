import { cn } from '@/lib/utils';

/**
 * The site's signature element: a ruled hairline with a travelling bead of
 * light. Pure CSS, so it costs nothing and degrades to a static line under
 * `prefers-reduced-motion`.
 */
export function LedgerRule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn('ledger-rule', className)} />;
}
