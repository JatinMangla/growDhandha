import { MessageCircle, PencilRuler, Rocket, Code2, Eye } from 'lucide-react';
import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    id: 'discuss',
    title: 'We talk',
    duration: 'Day 1 · Free',
    description: 'A 20-minute call or WhatsApp chat about your business — no technical questions.',
    detail:
      'You tell me what your business does and what is currently wasting your time. If a website or app will not actually help you, I will tell you that instead of selling you one.',
    icon: MessageCircle,
  },
  {
    id: 'quote',
    title: 'Plan and fixed quote',
    duration: 'Day 2–3',
    description: 'You get the full scope, the timeline and the final price in writing.',
    detail:
      'One document, plain language, no line items you cannot understand. Once you approve it, the price is locked. Work starts on 50% payment.',
    icon: PencilRuler,
  },
  {
    id: 'build',
    title: 'I build it',
    duration: 'Week 1–3',
    description: 'You get a live link and see real progress, not status emails.',
    detail:
      'Your project goes on a private link from the first day. Open it any time from your phone and watch it take shape. I share an update every few days.',
    icon: Code2,
  },
  {
    id: 'review',
    title: 'You review, I refine',
    duration: 'Before launch',
    description: 'You list every change you want. I make them before we go live.',
    detail:
      'Two full rounds of changes are included. Text, photos, colours, ordering — anything that is not a new feature. Nothing goes live until you are happy.',
    icon: Eye,
  },
  {
    id: 'launch',
    title: 'Launch and support',
    duration: 'Launch day onwards',
    description: 'Live on your domain, on Google, with support included.',
    detail:
      'I handle domain, hosting, SSL and the Google listing. Then 30 to 90 days of support depending on your plan — bug fixes and small content changes at no extra cost.',
    icon: Rocket,
  },
];
