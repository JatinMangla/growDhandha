import type { Project } from '@/types';
import { headlineUsers } from './stats';

/**
 * Problem → Solution → Result framing. To add a project, copy any object,
 * change the fields, and keep `id` unique. The grid handles the rest.
 *
 * Order matters: products I built and shipped myself come first, then
 * professional work (shown with my employer's permission). `kind` puts the
 * distinction on the card itself.
 *
 * Projects behind a private login link their source (`repo`), not the live
 * app — a demo a visitor cannot get into is worse than no link. Add a
 * screenshot under /public/projects/ and set `image` to replace the monogram.
 */
export const projects: Project[] = [
  {
    id: 'kundli-predict',
    name: 'Kundli Predict',
    category: 'Offline-first mobile web app',
    year: '2026',
    kind: 'product',
    monogram: 'KP',
    accent: 'gold',
    problem:
      'Astrology apps either stop working without a connection, send your birth details to a server, or hand every question to a chatbot that makes answers up.',
    solution:
      'A bilingual English and Hindi app that works out the full chart on the phone itself — ten divisional charts, dasha timelines, 30+ yogas and live transits — with a built-in list of 36,000+ Indian towns, so nothing needs looking up online.',
    result:
      'Installs like an app and keeps working with no internet after the first visit. Profiles never leave the device, and AI is only an optional second opinion.',
    stack: ['Next.js', 'TypeScript', 'IndexedDB', 'PWA', 'astronomy-engine'],
    repo: 'https://github.com/JatinMangla/predict',
  },
  {
    id: 'personal-vault',
    name: 'Personal Vault',
    category: 'Encrypted photo & document archive',
    year: '2026',
    kind: 'product',
    monogram: 'PV',
    accent: 'accent',
    problem:
      'Keeping family photos and important documents safe usually means a monthly cloud bill — and trusting that company with everything inside them.',
    solution:
      'Documents are encrypted in the browser before upload, so the storage provider only ever holds scrambled data. Photos run on a self-hosted media server with nightly backups, rehearsed restores and a health dashboard.',
    result:
      'Runs for ₹0 a year on free-tier infrastructure, and nobody but the owner can open the files — not the hosting companies, and not me.',
    stack: ['Next.js', 'Supabase', 'Web Crypto (AES-256)', 'Immich', 'Oracle Cloud'],
    repo: 'https://github.com/JatinMangla/personal-vault',
  },
  {
    id: 'careerpilot-ai',
    name: 'CareerPilot AI',
    category: 'AI assistant web application',
    year: '2026',
    kind: 'product',
    monogram: 'CP',
    accent: 'brand',
    problem:
      'A job search is dozens of repetitive tasks — tailoring a résumé to each role, sorting recruiter emails, preparing for interviews — all done by hand, every time.',
    solution:
      'One private workspace that tailors the résumé to each job, ranks openings with pros and cons, sorts the job inbox and runs mock interviews. The AI drafts; nothing is changed or sent without approval.',
    result:
      'Hours of repeated work became a review-and-approve step, with the AI kept on a short leash: it proposes, a person decides.',
    stack: ['Next.js', 'TypeScript', 'Gemini API', 'Upstash Redis', 'Tailwind'],
    repo: 'https://github.com/JatinMangla/CareerPilot-AI',
  },
  {
    id: 'mera-monitor',
    name: 'Mera Monitor',
    category: 'Enterprise fintech platform',
    year: '2022 — present',
    kind: 'employer',
    monogram: 'MM',
    accent: 'brand',
    problem:
      'A fintech platform serving thousands of users had slow, inconsistent screens and no shared design language between teams.',
    solution:
      'I rebuilt the frontend around a library of 50+ accessible, reusable components, added Microsoft and Google single sign-on, and profiled every heavy screen.',
    result: `${headlineUsers} active users on a platform that loads 30% faster, with one consistent interface across every module.`,
    stack: ['React', 'TypeScript', 'Redux', 'React Query', 'MSAL', 'Tailwind'],
  },
  {
    id: 'analytics-dashboards',
    name: 'Shura & Predict Dashboards',
    category: 'Real-time analytics',
    year: '2023',
    kind: 'employer',
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
    kind: 'employer',
    monogram: 'SC',
    accent: 'accent',
    problem:
      'An application had to run on low-memory set-top boxes and old TVs where normal web builds simply froze.',
    solution:
      'A stripped, memory-conscious build with a remote-control navigation model, tested across a wide spread of real devices rather than emulators.',
    result: '95% cross-device compatibility on hardware that most web applications cannot run at all.',
    stack: ['JavaScript', 'SCSS', 'Performance tuning'],
  },
];

/** How each kind is labelled on a card and in the markdown representation. */
export const projectKindLabel: Record<Project['kind'], string> = {
  product: 'Own product',
  client: 'Client project',
  employer: 'Professional work',
};
