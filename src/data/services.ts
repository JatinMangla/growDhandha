import { Boxes, Globe, ReceiptIndianRupee, Smartphone, Sparkles, Users } from 'lucide-react';
import type { Service } from '@/types';

/**
 * Written as outcomes the owner gets, not as technology.
 * Rule of thumb: a 45-year-old shop owner should understand every line.
 */
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
  },
];
