import type { Stat } from '@/types';

/**
 * Every number here is defensible in a sales call — no rounded-up vanity
 * metrics. `note` is the one-line proof shown under the counter.
 */
export const stats: Stat[] = [
  {
    id: 'experience',
    value: 5,
    suffix: '+',
    label: 'Years building software',
    note: 'Professional experience, currently at AAPNA Infotech',
  },
  {
    id: 'users',
    value: 10500,
    suffix: '+',
    label: 'Users on software I built',
    note: 'Active users on Mera Monitor, an enterprise fintech platform',
  },
  {
    id: 'performance',
    value: 30,
    suffix: '%',
    label: 'Faster page loads',
    note: 'Measured improvement after performance profiling and code splitting',
  },
  {
    id: 'components',
    value: 50,
    suffix: '+',
    label: 'Reusable UI components',
    note: 'Accessible component library built in React and TypeScript',
  },
];
