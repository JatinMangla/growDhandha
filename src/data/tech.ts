import type { TechGroup } from '@/types';

/**
 * Shown as a quiet competence signal. The visitor does not need to know what
 * any of it means — the grouping labels do the explaining.
 */
export const techGroups: TechGroup[] = [
  {
    id: 'interface',
    label: 'What you see',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Material UI'],
  },
  {
    id: 'engine',
    label: 'What runs it',
    items: ['Node.js', 'REST APIs', 'WebSockets', 'Redux', 'Zustand', 'React Query'],
  },
  {
    id: 'quality',
    label: 'How it stays reliable',
    items: ['Jest', 'React Testing Library', 'Git', 'CI/CD', 'Vercel', 'Netlify'],
  },
];

/** Flat list used by the marquee. */
export const techMarquee: string[] = techGroups.flatMap((group) => group.items);
