import type { Config } from 'tailwindcss';

/**
 * Design tokens live as RGB triplets in globals.css so a single set of utility
 * classes works in both themes. `<alpha-value>` keeps opacity modifiers
 * (e.g. `bg-brand/10`) working against the CSS variables.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: token('--c-bg'),
        surface: token('--c-surface'),
        sunken: token('--c-sunken'),
        fg: token('--c-fg'),
        muted: token('--c-muted'),
        subtle: token('--c-subtle'),
        line: token('--c-line'),
        brand: token('--c-brand'),
        'brand-ink': token('--c-brand-ink'),
        'on-brand': token('--c-on-brand'),
        accent: token('--c-accent'),
        'accent-ink': token('--c-accent-ink'),
        gold: token('--c-gold'),
        whatsapp: token('--c-whatsapp'),
        'on-whatsapp': token('--c-on-whatsapp'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Fluid type scale (1.25 ratio on mobile, opening to 1.333 on desktop).
        'display-xl': ['clamp(2.5rem, 1.6rem + 4.5vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 1.35rem + 3.2vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.625rem, 1.2rem + 2vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.35rem, 1.1rem + 1.1vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)', { lineHeight: '1.65' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        shell: '80rem',
        prose: '68ch',
      },
      borderRadius: {
        card: '1.25rem',
        pill: '999px',
        soft: '0.625rem',
      },
      boxShadow: {
        lift: '0 1px 2px rgb(14 19 48 / 0.04), 0 12px 32px -12px rgb(14 19 48 / 0.16)',
        'lift-lg': '0 2px 4px rgb(14 19 48 / 0.05), 0 28px 60px -20px rgb(14 19 48 / 0.28)',
        glow: '0 0 0 1px rgb(var(--c-brand) / 0.35), 0 18px 45px -18px rgb(var(--c-brand) / 0.55)',
      },
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'rule-pulse': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateX(320%)', opacity: '0' },
        },
        'wash-a': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(40px, 26px, 0)' },
        },
        'wash-b': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-34px, 34px, 0)' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-x-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'rule-pulse': 'rule-pulse 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'wash-a': 'wash-a 22s ease-in-out infinite',
        'wash-b': 'wash-b 26s ease-in-out infinite 1.5s',
        'marquee-x': 'marquee-x 38s linear infinite',
        'marquee-x-reverse': 'marquee-x-reverse 52s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
