import { Boxes, Globe, ReceiptIndianRupee, Smartphone, Sparkles, Users } from 'lucide-react';
import type { Service } from '@/types';
import { startingPrice, tier } from './pricing';

/**
 * Written as outcomes the owner gets, not as technology.
 * Rule of thumb: a 45-year-old shop owner should understand every line.
 *
 * Each service also has its own page at /services/<id> (`page`). Those pages
 * are what someone searching "billing software for shop" should land on, so
 * they say plainly what the thing is, who it suits, what it costs and how it
 * works — using only facts from pricing.ts and faqs.ts, never new claims.
 * `[text](/path)` in `intro` becomes an internal link.
 */

const customFrom = tier('custom').price.replace(/^From /, '');

export const services: Service[] = [
  {
    id: 'business-website',
    title: 'Business Website',
    promise: 'Customers find you on Google and message you the same minute.',
    description:
      'A fast, clean website that shows what you sell, builds trust, and turns visitors into enquiries. Works perfectly on every phone.',
    outcomes: [
      'Shows up when people search your business on Google',
      'WhatsApp and call buttons on every screen',
      'Loads in under 2 seconds, even on slow internet',
      'Photo gallery, price list and enquiry form',
    ],
    icon: Globe,
    page: {
      headline: `Business website development in Delhi, from ${startingPrice}`,
      summary: `A fast, phone-first business website with WhatsApp and call buttons, Google setup and support after launch. Fixed price from ${startingPrice}, ready in 5–7 days.`,
      intro: [
        'Most customers will meet your business on a phone, after a Google search, with a few seconds to decide whether to get in touch. A business website exists to make that decision easy: what you sell, where you are, why you can be trusted, and one tap to WhatsApp or call you.',
        'I build it by hand rather than with a page builder, so it loads quickly on an ordinary Android phone and a slow connection. You own the domain, the hosting account and the code — see [what a website should cost](/blog/what-a-business-website-costs-in-india) for what that should look like anywhere you buy it.',
      ],
      forWho: [
        'Shops, clinics, coaching centres and service businesses getting online for the first time',
        'Businesses whose current site is slow, broken on phones, or impossible to update',
        'Owners who want enquiries on WhatsApp, not in a contact form nobody checks',
      ],
      tierIds: ['starter', 'business'],
      faqIds: ['whats-included', 'timeline', 'self-edit', 'hosting-domain', 'payment'],
      postSlugs: [
        'what-a-business-website-costs-in-india',
        'get-your-business-on-google-free',
        'questions-to-ask-a-web-developer',
      ],
    },
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    promise: 'Your business in your customer’s pocket, on Android and iPhone.',
    description:
      'An app your customers or your staff actually use — ordering, booking, tracking or daily reporting. One build, both app stores.',
    outcomes: [
      'One app that works on Android and iPhone',
      'Push notifications for offers and updates',
      'Works even when the network drops',
      'I handle the Play Store and App Store submission',
    ],
    icon: Smartphone,
    page: {
      headline: 'Mobile app development for Android and iPhone',
      summary: `One app for Android and iPhone — for customers who order often or staff who report daily. Store submission handled. Fixed quote, from ${customFrom}.`,
      intro: [
        'An app is worth building when people will open it again and again: customers who reorder every week, or staff who record deliveries and visits every day. For everyone else a website usually does the job for a fraction of the cost, and I will tell you if that is your situation — [here is how to decide](/blog/website-or-mobile-app-which-first).',
        'When an app is the right call, I build one application that runs on both Android and iPhone, which costs far less than two separate apps, and I handle the Play Store and App Store submission. The store fees themselves go to Google and Apple, not to me.',
      ],
      forWho: [
        'Businesses whose customers order or book frequently',
        'Teams whose staff record deliveries, attendance or visits on their phones',
        'Owners who need it to keep working when the network drops',
      ],
      tierIds: ['custom'],
      faqIds: ['both-platforms', 'timeline', 'payment', 'after-launch'],
      postSlugs: ['website-or-mobile-app-which-first', 'questions-to-ask-a-web-developer'],
    },
  },
  {
    id: 'crm',
    title: 'Client & Customer Management',
    promise: 'Every customer, order and follow-up in one place — not in a diary.',
    description:
      'Stop losing enquiries in WhatsApp chats and notebooks. See who called, what they wanted, and who needs a follow-up today.',
    outcomes: [
      'One list of every customer and enquiry',
      'Follow-up reminders so no lead is forgotten',
      'Staff can add entries from their own phone',
      'Export everything to Excel any time',
    ],
    icon: Users,
    page: {
      headline: 'Customer and enquiry management (CRM) for small businesses',
      summary: `A simple CRM built around how you already work: every customer and enquiry in one list, follow-up reminders, staff logins. Fixed quote, from ${customFrom}.`,
      intro: [
        'Enquiries arrive on WhatsApp, by phone and in person, and the follow-up lives in someone’s memory or a diary. A simple CRM puts every customer, enquiry and follow-up in one list the whole business can see, so nobody is forgotten and nothing depends on one person’s phone.',
        'It is built around how you already work: the fields you actually use, reminders for the follow-ups you already try to make, and an export to Excel whenever you want your data. If your enquiries are still manageable in a spreadsheet, [that may be enough for now](/blog/billing-software-vs-excel).',
      ],
      forWho: [
        'Businesses losing track of enquiries across WhatsApp chats and notebooks',
        'Sales or service teams that need to see who is following up with whom',
        'Owners who want their customer list in one place they control',
      ],
      tierIds: ['custom'],
      faqIds: ['timeline', 'payment', 'after-launch'],
      postSlugs: ['billing-software-vs-excel', 'questions-to-ask-a-web-developer'],
    },
  },
  {
    id: 'inventory-billing',
    title: 'Inventory & Billing System',
    promise: 'Know your stock and print a GST bill in ten seconds.',
    description:
      'Billing, stock, and purchase records that stay in sync. Low-stock alerts before an item runs out, and clean reports at month end.',
    outcomes: [
      'GST-ready invoices you can print or send on WhatsApp',
      'Live stock count with low-stock alerts',
      'Daily, monthly and item-wise sales reports',
      'Multiple users with separate logins',
    ],
    icon: ReceiptIndianRupee,
    page: {
      headline: 'Billing and inventory software for shops and traders',
      summary: `Billing and stock that stay in sync: GST-ready invoices, low-stock alerts, staff logins and month-end reports. Fixed quote, from ${customFrom}.`,
      intro: [
        'When a sale is typed into a bill and then again into a stock register, the business is paying for the same work twice and collecting typing mistakes along the way. A billing and inventory system records the sale once: the invoice, the stock count and the reports all update together.',
        'It produces GST-ready invoices you can print or send on WhatsApp, warns you before an item runs out, and gives each member of staff their own login. If a ready-made product already fits your business, I will tell you so before quoting for a custom one — [the signs you have outgrown Excel](/blog/billing-software-vs-excel) are a good place to start.',
      ],
      forWho: [
        'Shops, wholesalers and traders issuing many bills a day',
        'Businesses where the stock in the register no longer matches the shelf',
        'Teams where several people need to bill at the same time',
      ],
      tierIds: ['custom'],
      faqIds: ['timeline', 'payment', 'after-launch'],
      postSlugs: ['billing-software-vs-excel', 'questions-to-ask-a-web-developer'],
    },
  },
  {
    id: 'custom-software',
    title: 'Custom Business Software',
    promise: 'The tool your business needs that no ready-made app sells.',
    description:
      'If your team wastes hours on manual registers, Excel sheets and repeated data entry, that work can be a simple screen instead.',
    outcomes: [
      'Built around how your business already works',
      'Removes double entry and manual mistakes',
      'Role-based access — staff see only their part',
      'Grows with you, no per-user licence trap',
    ],
    icon: Boxes,
    page: {
      headline: 'Custom business software, built around how you work',
      summary: `Turn paper registers and shared Excel sheets into simple screens with your rules built in. No per-user licence fees. Fixed quote, from ${customFrom}.`,
      intro: [
        'Every business has a process no ready-made app quite fits: an approval that happens on paper, a register copied into Excel every evening, a report someone assembles by hand each month. Custom software turns that work into a simple screen with the rules of your business built in — and, where they genuinely save time, [AI features](/services/ai-features) such as reading bills or answering routine questions.',
        'It is quoted as a fixed price after we talk, built in stages you can watch on a private link, and it carries no per-user licence fee that grows with your team. Before you commit to anyone, [ask these six questions](/blog/questions-to-ask-a-web-developer).',
      ],
      forWho: [
        'Businesses running core processes on paper registers or shared Excel files',
        'Teams where different staff should see only their part of the data',
        'Owners paying per-user fees for software that does not fit',
      ],
      tierIds: ['custom'],
      faqIds: ['timeline', 'payment', 'self-edit', 'after-launch'],
      postSlugs: ['billing-software-vs-excel', 'questions-to-ask-a-web-developer'],
    },
  },
  {
    id: 'ai-features',
    title: 'AI-Powered Features',
    promise: 'Answer customers and sort paperwork without hiring for it.',
    description:
      'Practical AI, not gimmicks: a chatbot that answers your common questions, or a tool that reads invoices and fills the data itself.',
    outcomes: [
      'Chat assistant that answers customers 24×7',
      'Auto-read bills, forms and documents',
      'Product descriptions and captions written for you',
      'Smart search across your own records',
    ],
    icon: Sparkles,
    page: {
      headline: 'Practical AI features for small businesses',
      summary: `AI that takes over one repetitive job — answering common questions, reading bills, drafting product text — with a person in charge. From ${customFrom}.`,
      intro: [
        'AI is useful to a small business when it takes over a specific, repetitive job: answering the same customer questions at midnight, reading the details off a supplier’s bill, or writing a first draft of product descriptions. It is not useful as a gimmick bolted onto a website.',
        'I add AI where it saves real time, keep a person in charge of anything that matters, and tell you plainly when a simpler solution would do the same job. It usually sits inside a larger system, such as [billing](/services/inventory-billing) or [customer management](/services/crm).',
      ],
      forWho: [
        'Businesses answering the same customer questions all day',
        'Teams typing data from bills, forms or documents by hand',
        'Online sellers who need product descriptions and captions in volume',
      ],
      tierIds: ['custom'],
      faqIds: ['timeline', 'payment', 'why-cheap'],
      postSlugs: ['questions-to-ask-a-web-developer', 'billing-software-vs-excel'],
    },
  },
];

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
