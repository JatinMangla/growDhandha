import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'md' | 'lg';

const base =
  'tap-target inline-flex items-center justify-center gap-2 rounded-pill font-medium leading-none transition-all duration-200 ease-entrance disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-on-brand shadow-lift hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0',
  secondary:
    'border border-line bg-surface text-fg hover:-translate-y-0.5 hover:border-brand hover:text-brand-ink active:translate-y-0',
  ghost: 'text-fg hover:bg-sunken',
  whatsapp:
    'bg-accent text-white shadow-lift hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 dark:text-[rgb(var(--c-on-brand))]',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-sm sm:text-base',
  lg: 'px-6 py-4 text-base sm:px-7 sm:text-lg',
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
