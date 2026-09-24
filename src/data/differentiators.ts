import { BadgeIndianRupee, CalendarCheck, LifeBuoy, MessageSquare, ShieldCheck } from 'lucide-react';
import type { Differentiator } from '@/types';
import { headlineUsers } from './stats';

/**
 * Each item names the fear first, then answers it. This audience has usually
 * been burned by an agency before — the objection is the headline.
 */
export const differentiators: Differentiator[] = [
  {
    id: 'credibility',
    title: `Software trusted by ${headlineUsers} users`,
    fear: '“Can this person handle something serious?”',
    answer: `I build the frontend of Mera Monitor, an enterprise fintech platform used by ${headlineUsers} people every day. Your project gets the same standards — the same care with security, speed and testing.`,
    icon: ShieldCheck,
  },
  {
    id: 'pricing',
    title: 'Fixed price, agreed before I start',
    fear: '“Will the bill keep growing?”',
    answer:
      'You get a written quote with the full scope and the final number. That number does not change unless you ask for something new — and then you approve the cost first.',
    icon: BadgeIndianRupee,
  },
  {
    id: 'direct',
    title: 'You talk to the developer, not a salesperson',
    fear: '“Will I be handed to a junior after payment?”',
    answer:
      'The person you message on WhatsApp is the person writing your code. No account manager, no relay, no “I will check with the team and get back to you.”',
    icon: MessageSquare,
  },
  {
    id: 'delivery',
    title: 'Delivered on the date I commit',
    fear: '“Will I be chasing them for months?”',
    answer:
      'You get a timeline at the start and a working link you can open at every stage. You see progress yourself instead of asking for an update.',
    icon: CalendarCheck,
  },
  {
    id: 'support',
    title: '30 days of support after launch, included',
    fear: '“What happens once they have my money?”',
    answer:
      'Bug fixes and small content changes for 30 days after launch are part of the price, not an extra invoice. After that, support plans are available if you want them.',
    icon: LifeBuoy,
  },
];
