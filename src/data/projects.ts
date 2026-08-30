import type { Project } from '@/types';

/**
 * Problem → Solution → Result framing. To add a project, copy any object,
 * change the fields, and keep `id` unique. The grid handles the rest.
 */
export const projects: Project[] = [
  {
    id: 'mera-monitor',
    name: 'Mera Monitor',
    category: 'Enterprise fintech platform',
    year: '2022 — present',
    monogram: 'MM',
    accent: 'brand',
    problem:
      'A fintech platform serving thousands of users had slow, inconsistent screens and no shared design language between teams.',
    solution:
      'I rebuilt the frontend around a library of 50+ accessible, reusable components, added Microsoft and Google single sign-on, and profiled every heavy screen.',
    result:
      '10,500+ active users on a platform that loads 30% faster, with one consistent interface across every module.',
    stack: ['React', 'TypeScript', 'Redux', 'React Query', 'MSAL', 'Tailwind'],
  },
  {
    id: 'ai-career-platform',
    name: 'AI Career Platform',
    category: 'AI-powered web application',
    year: '2024',
    monogram: 'AI',
    accent: 'accent',
    problem:
      'Job seekers were guessing at what recruiters wanted, rewriting the same résumé over and over with no feedback.',
    solution:
      'A web app that reads a résumé against a job description and returns specific, ranked suggestions, built on a large language model with a guided, step-by-step interface.',
    result:
      'Feedback in seconds instead of days, with the AI work wrapped in an interface a non-technical user can finish without help.',
    stack: ['Next.js', 'TypeScript', 'LLM APIs', 'Tailwind'],
  },
  {
    id: 'analytics-dashboards',
    name: 'Shura & Predict Dashboards',
    category: 'Real-time analytics',
    year: '2023',
    monogram: 'SP',
    accent: 'gold',
    problem:
      'Decision-makers were waiting on exported spreadsheets to understand what had already happened yesterday.',
    solution:
      'Live dashboards driven by WebSockets and REST APIs, with ApexCharts visualisations that update as data arrives and stay readable on a laptop or a phone.',
    result:
      'Teams read the current position at a glance instead of reconstructing it from files, on charts that stay legible at any screen size.',
    stack: ['React', 'ApexCharts', 'WebSockets', 'Redux Saga'],
  },
  {
    id: 'screen-coach',
    name: 'Screen Coach',
    category: 'Set-top-box application',
    year: '2021',
    monogram: 'SC',
    accent: 'accent',
    problem:
      'An application had to run on low-memory set-top boxes and old TVs where normal web builds simply froze.',
    solution:
      'A stripped, memory-conscious build with a remote-control navigation model, tested across a wide spread of real devices rather than emulators.',
    result:
      '95% cross-device compatibility on hardware that most web applications cannot run at all.',
    stack: ['JavaScript', 'SCSS', 'Performance tuning'],
  },
];
