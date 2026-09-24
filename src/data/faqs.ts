import type { Faq } from '@/types';
import { startingPrice, tier } from './pricing';
import { headlineUsers } from './stats';

/**
 * These double as FAQPage structured data, so answers are written as
 * complete, self-contained sentences a search result can quote.
 */
export const faqs: Faq[] = [
  {
    id: 'timeline',
    question: 'How long will my website take?',
    answer:
      'A Starter website is ready in 5 to 7 days. A Business website takes 2 to 3 weeks. Custom software, billing systems and mobile apps usually take 4 to 10 weeks depending on how much they need to do. You get a firm date in writing before any work starts, and I do not commit to a date I cannot meet.',
  },
  {
    id: 'whats-included',
    question: `What exactly do I get for ${startingPrice}?`,
    answer:
      'A complete one-page website that works on every phone and computer: your services, photos, prices, an enquiry form, and WhatsApp and call buttons on every screen. It includes an SSL certificate, Google search setup, and 30 days of support after launch. It is a finished website, not a demo or a trial.',
  },
  {
    id: 'payment',
    question: 'Do I have to pay everything upfront?',
    answer: `No. You pay 50% to start and 50% when the work is finished and you are happy with it. For custom projects above ${tier('custom').price.replace(/^From /, '')} the payment is split across project milestones. Every payment has a proper invoice.`,
  },
  {
    id: 'self-edit',
    question: 'Can I change the text and photos myself later?',
    answer:
      'Yes. Business and Custom plans include an admin panel where you can edit text, prices and photos yourself with no technical knowledge — I walk you through it on a call and record a short video for your reference. On the Starter plan, small content changes are free for the first 30 days.',
  },
  {
    id: 'after-launch',
    question: 'What happens after the website goes live?',
    answer:
      'Support is included for 30 to 90 days depending on your plan, covering bug fixes and small content changes at no extra cost. After that period you can continue with a monthly support plan, or simply message me when you need something — I quote small jobs individually. You are never locked into a contract.',
  },
  {
    id: 'hosting-domain',
    question: 'Do you provide hosting and the domain name?',
    answer:
      'I set up both for you. Hosting for a Starter or Business website is free on a professional platform, so there is no monthly server bill. A domain name like yourbusiness.com costs roughly ₹800 to ₹1,200 per year, paid directly to the registrar. The domain and the hosting account are registered in your name — you own them, not me.',
  },
  {
    id: 'both-platforms',
    question: 'Can you build an app for both Android and iPhone?',
    answer:
      'Yes. I build one application that runs on both Android and iPhone, which costs far less than building two separate apps. I also handle submitting it to the Google Play Store and the Apple App Store. Note that Google charges a one-time $25 developer fee and Apple charges $99 per year — those go to them, not to me.',
  },
  {
    id: 'why-cheap',
    question: 'Why is your price so much lower than an agency?',
    answer: `An agency price includes an office, a sales team, and account managers. I work directly with you, so you pay for the development and nothing else. The code and the standards are the same ones I use on an enterprise fintech platform serving ${headlineUsers} users.`,
  },
];
