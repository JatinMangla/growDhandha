import type { Post } from '@/types';

/**
 * The blog is the long-term organic and AI-citation strategy.
 *
 * Each article is written to answer one question a business owner would
 * actually type or ask out loud, and answers it in the first block. Everything
 * stated here is sourced from this site's own pricing, process and FAQ data —
 * nothing is invented, because every number here has to survive a sales call.
 *
 * To publish a new article, append one object. The listing, the post page, the
 * sitemap entry, the metadata and the structured data all pick it up.
 */
export const posts: Post[] = [
  {
    slug: 'what-a-business-website-costs-in-india',
    title: 'What a business website should actually cost in India',
    description:
      'A straight answer on what a small business website costs, what changes the price, and which charges should make you ask questions.',
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readingMinutes: 6,
    tags: ['pricing', 'websites', 'small business'],
    answer:
      'A simple business website in India should cost roughly ₹5,000 to ₹20,000, paid once. Above that range you should be told exactly which extra work you are paying for.',
    body: [
      {
        kind: 'paragraph',
        text: 'Ask three developers what a website costs and you will get three answers between ₹3,000 and ₹3,00,000. That is not because anyone is lying. It is because "a website" describes both a single page with your phone number on it and a system that takes orders, tracks stock and issues invoices. Here is how to tell which one you are being quoted for.',
      },
      { kind: 'heading', text: 'What you are actually paying for' },
      {
        kind: 'paragraph',
        text: 'Almost the entire cost of a website is someone’s time. The software is free, hosting for a small site is free, and a certificate is free. So when a price goes up, the honest reason is always the same: more hours. Either more screens to build, or more logic behind them.',
      },
      {
        kind: 'paragraph',
        text: 'This is why an agency quote is often several times a freelancer’s for the same work. You are also paying for an office, a sales team and an account manager who relays your messages to the person actually writing the code.',
      },
      { kind: 'heading', text: 'The three price bands, and what each one buys' },
      {
        kind: 'list',
        items: [
          '₹5,000 to ₹15,000 — one to eight pages that show what you sell, prove you are real, and let someone call or message you. Right for a shop, clinic, coaching centre or service provider getting online for the first time.',
          '₹15,000 to ₹40,000 — the above plus a catalogue people can search, and an admin panel so you can change prices and photos yourself without calling anyone.',
          '₹40,000 and up — software rather than a website: billing, stock, customer records, staff logins, reports. The price rises because the logic does, not because there are more pages.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'If a quote sits well above the band that matches your description, that is not automatically wrong. But you are entitled to ask which specific work moves it there, and the answer should be something you can understand without a technical background.',
      },
      { kind: 'heading', text: 'What is genuinely extra, and what is not' },
      {
        kind: 'paragraph',
        text: 'Two costs are real, ongoing, and not paid to your developer. A domain name like yourbusiness.com costs roughly ₹800 to ₹1,200 a year, paid to the registrar. If you want an app in the stores, Google charges a one-time $25 developer fee and Apple charges $99 a year.',
      },
      {
        kind: 'paragraph',
        text: 'Nearly everything else you might be charged for is free or included. Hosting for a normal business website costs nothing on a professional platform. The padlock in the address bar — the SSL certificate — is free. Getting listed on Google is free.',
      },
      { kind: 'heading', text: 'Charges that should make you ask questions' },
      {
        kind: 'list',
        items: [
          'A monthly "maintenance" fee with no written list of what it covers.',
          'Being charged for an SSL certificate as a line item.',
          'New charges appearing for pages that were in the original scope.',
          'A domain registered in the developer’s name instead of yours.',
          'The full amount demanded before any work has been shown to you.',
        ],
      },
      {
        kind: 'callout',
        text: 'The domain, the hosting account and the code should all end up in your name. If you cannot leave your developer and take your website with you, you do not own it.',
      },
      { kind: 'heading', text: 'How payment normally works' },
      {
        kind: 'paragraph',
        text: 'Half to start and half on delivery is the standard arrangement for small projects, and it protects both sides: the developer is not building for free, and you are not paying in full for something you have not seen. Larger custom projects are usually split across milestones instead. Every payment should come with a proper invoice.',
      },
      {
        kind: 'qa',
        question: 'How much does a basic business website cost in India?',
        answer:
          'A basic one-page business website typically costs between ₹5,000 and ₹15,000 as a one-time payment. That should include a mobile-friendly design, your services and photos, an enquiry form, WhatsApp and call buttons, a free SSL certificate, and setup so the business appears in Google search.',
      },
      {
        kind: 'qa',
        question: 'Are there monthly costs for a small business website?',
        answer:
          'For a normal small business website there is no monthly server bill, because hosting is free on professional platforms at this scale. The only recurring cost is the domain name, roughly ₹800 to ₹1,200 per year paid directly to the registrar. Any monthly maintenance fee should come with a written list of what it covers.',
      },
      {
        kind: 'qa',
        question: 'Why do agencies charge so much more than freelancers?',
        answer:
          'An agency price includes an office, a sales team and account managers alongside the development work. Working directly with the developer removes those costs, which is why the same website can differ several times in price without differing in quality.',
      },
    ],
  },

  {
    slug: 'website-or-mobile-app-which-first',
    title: 'Website or mobile app: which does your business need first?',
    description:
      'Most small businesses are sold an app when a website would have done the job. How to tell which one you actually need.',
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readingMinutes: 5,
    tags: ['mobile apps', 'websites', 'small business'],
    answer:
      'For almost every small business, the website comes first. An app is only worth building once you have customers who come back often enough to keep it installed.',
    body: [
      {
        kind: 'paragraph',
        text: 'This is the question I am asked most often, usually phrased as "should we make an app?" Nearly always the honest answer is: not yet.',
      },
      { kind: 'heading', text: 'The difference that actually matters' },
      {
        kind: 'paragraph',
        text: 'A website is something a stranger can reach in one tap from a Google search. An app is something a person has to decide to install, find space for, and remember to open. That single difference decides which one is right for you.',
      },
      {
        kind: 'paragraph',
        text: 'If you want to be found by people who do not know you yet, that is a website. If you want to be used repeatedly by people who already know you, that may be an app.',
      },
      { kind: 'heading', text: 'When a website is the right answer' },
      {
        kind: 'list',
        items: [
          'You want customers to find you on Google and call or message you.',
          'Your customers buy from you occasionally rather than weekly.',
          'You need to look established to someone deciding whether to trust you.',
          'You want to show a catalogue, prices, photos or location.',
        ],
      },
      { kind: 'heading', text: 'When an app genuinely earns its place' },
      {
        kind: 'list',
        items: [
          'Your customers order from you often — food, groceries, regular supplies.',
          'You need to send push notifications people will actually welcome.',
          'Your staff use it daily for deliveries, attendance or field reporting.',
          'It has to keep working when the network drops.',
        ],
      },
      {
        kind: 'callout',
        text: 'A useful test: would a customer open this more than once a week? If not, an app will be installed, opened twice, and deleted when the phone runs out of space.',
      },
      { kind: 'heading', text: 'What an app costs against a website' },
      {
        kind: 'paragraph',
        text: 'An app is substantially more work than a website, and the gap is wider than most people expect. There are two platforms to support, store review processes for each, and ongoing updates as Android and iOS change. Building one application that runs on both Android and iPhone keeps this manageable and costs far less than building two separate apps — but it is still a bigger commitment than a website.',
      },
      {
        kind: 'paragraph',
        text: 'The stores also charge you directly: Google takes a one-time $25 developer fee, and Apple charges $99 every year for as long as your app is listed.',
      },
      { kind: 'heading', text: 'The sequence that usually works' },
      {
        kind: 'paragraph',
        text: 'Start with the website, because it is cheaper and it is what brings you strangers. Watch what people actually do with it. If you find the same customers returning again and again, and doing something repetitive that a phone could make faster, you now have evidence for what the app should do — instead of guessing before you had any.',
      },
      {
        kind: 'qa',
        question: 'Should a small business build a website or a mobile app first?',
        answer:
          'A website first, in almost every case. A website can be found by strangers through Google in one tap, while an app requires someone to deliberately install it. An app becomes worth building once you have repeat customers who would use it more than about once a week.',
      },
      {
        kind: 'qa',
        question: 'Can one app work on both Android and iPhone?',
        answer:
          'Yes. One application can be built to run on both Android and iPhone, which costs far less than building two separate apps. Google charges a one-time $25 developer fee and Apple charges $99 per year to list an app in their stores; those fees go to the platforms, not the developer.',
      },
    ],
  },

  {
    slug: 'get-your-business-on-google-free',
    title: 'How to get your shop on Google Maps and Google Search, free',
    description:
      'A step-by-step guide to Google Business Profile — the single highest-value free thing a local business can do online.',
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readingMinutes: 6,
    tags: ['google', 'local seo', 'small business'],
    answer:
      'Create a free Google Business Profile. It takes about thirty minutes, costs nothing, and if you only ever do one thing online, this should be it — ahead of building a website.',
    body: [
      {
        kind: 'paragraph',
        text: 'When somebody searches "hardware shop near me" or "dentist in Karol Bagh", the results they see first are not websites. They are map listings. Those come from Google Business Profile, it is free, and a surprising number of businesses have never claimed theirs.',
      },
      {
        kind: 'callout',
        text: 'I say this to clients before I quote them for anything: if your budget is zero, do this and nothing else. It will do more for you this month than a website will.',
      },
      { kind: 'heading', text: 'What you need before you start' },
      {
        kind: 'list',
        items: [
          'A Google account — an ordinary Gmail address is fine.',
          'Your exact business name, as it appears on your board.',
          'Your address, and the phone number you actually answer.',
          'Your opening hours.',
          'A few photos taken on your phone: the shopfront, inside, your work.',
        ],
      },
      { kind: 'heading', text: 'Setting it up, step by step' },
      {
        kind: 'list',
        ordered: true,
        items: [
          'Search Google for "Google Business Profile" and sign in with your Google account.',
          'Enter your business name. If a listing already exists — Google often creates them automatically — claim that one instead of making a second.',
          'Choose your category carefully. This is how Google decides which searches you appear in, so pick the one a customer would use, not an industry term.',
          'Add your address. If you visit customers rather than receiving them, set a service area instead.',
          'Add the phone number you actually answer, and your website if you have one.',
          'Verify. Google will confirm you are real, usually by post, phone or video. Postal verification can take up to two weeks, so start it early.',
          'Once verified, fill in hours, services, and upload your photos.',
        ],
      },
      { kind: 'heading', text: 'What makes a listing actually rank' },
      {
        kind: 'paragraph',
        text: 'Three things do most of the work, and none of them cost money.',
      },
      {
        kind: 'list',
        items: [
          'Completeness. Fill every field. Half-finished listings lose to complete ones.',
          'Reviews. Ask satisfied customers, in person, at the moment they are happy. A steady trickle of genuine reviews beats a sudden burst, which looks bought.',
          'Consistency. Your name, address and phone number must match exactly everywhere they appear — your listing, your website, your Instagram, any directory. Google uses these to decide that all of them are the same business.',
        ],
      },
      { kind: 'heading', text: 'Mistakes that quietly cost you' },
      {
        kind: 'list',
        items: [
          'Stuffing keywords into your business name. It violates the rules and can get the listing suspended.',
          'A phone number nobody answers. Calls from the listing are the whole point.',
          'No photos. Listings with photos get noticeably more attention than those without.',
          'Ignoring reviews, especially the bad ones. A calm reply to a complaint reads well to everyone who comes after.',
          'Duplicate listings from a previous owner or an old address. Claim and merge them.',
        ],
      },
      { kind: 'heading', text: 'Where a website fits' },
      {
        kind: 'paragraph',
        text: 'The listing gets you found. The website is what convinces someone to choose you once they have found you — it holds your prices, your work, and enough detail to build confidence. They work best together: the listing brings the visitor, the website closes them.',
      },
      {
        kind: 'qa',
        question: 'Is Google Business Profile free?',
        answer:
          'Yes, completely. Creating and maintaining a Google Business Profile costs nothing. Anyone charging a monthly fee simply to keep your listing live is charging for something Google provides free.',
      },
      {
        kind: 'qa',
        question: 'How long does it take to appear on Google Maps?',
        answer:
          'Setup takes about thirty minutes, but you must complete verification first. Verification by phone or video is usually quick, while postal verification can take up to two weeks. Listings generally appear within a few days of being verified.',
      },
      {
        kind: 'qa',
        question: 'Do I need a website to be on Google Maps?',
        answer:
          'No. A Google Business Profile works without a website, and for a local business it is the higher priority of the two. A website helps convert the people who find you through the listing, so most businesses eventually want both.',
      },
    ],
  },

  {
    slug: 'billing-software-vs-excel',
    title: 'Billing software or an Excel sheet: when is it worth switching?',
    description:
      'Excel is not the wrong answer for everyone. The specific signals that mean you have outgrown it.',
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readingMinutes: 5,
    tags: ['billing', 'inventory', 'small business'],
    answer:
      'Stay on Excel while one person enters everything and you can still hold your stock in your head. Switch when two people need the file at the same time, or when you check stock by walking to the shelf.',
    body: [
      {
        kind: 'paragraph',
        text: 'Software people will tell you Excel is unprofessional. It is not. Plenty of profitable businesses run on a spreadsheet, and replacing one that works is a waste of money. But there is a point where the spreadsheet starts costing more than it saves, and it is worth knowing what that point looks like.',
      },
      { kind: 'heading', text: 'When Excel is still the right tool' },
      {
        kind: 'list',
        items: [
          'One person does the data entry.',
          'You issue a manageable number of bills a day.',
          'Your stock is small enough that you know roughly what you have.',
          'You are not being asked for GST-compliant invoices under time pressure.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'If all four are true, keep the spreadsheet and spend the money elsewhere. A website will do more for you than billing software will.',
      },
      { kind: 'heading', text: 'The signals that you have outgrown it' },
      {
        kind: 'list',
        items: [
          'Two people need the file at once, and someone ends up working on an old copy.',
          'You check stock by walking to the shelf and counting, because the sheet is no longer trusted.',
          'The same information gets typed twice — once into the bill, once into the stock sheet.',
          'Month-end takes a full day of reconciling rather than a few minutes of reading.',
          'A formula broke once and nobody noticed for weeks.',
          'You cannot answer "what did we sell most of last month" without an hour of work.',
        ],
      },
      {
        kind: 'callout',
        text: 'The clearest signal is double entry. If a sale has to be typed in more than once, you are paying someone to do work a computer should be doing, and you are collecting typing errors while you do it.',
      },
      { kind: 'heading', text: 'What proper billing software changes' },
      {
        kind: 'list',
        items: [
          'One entry updates the bill, the stock count and the reports at the same time.',
          'GST-ready invoices you can print or send straight to WhatsApp.',
          'Low-stock alerts before an item runs out, not after a customer asks for it.',
          'Several staff working at once, each with their own login and their own access.',
          'Reports that are already correct at month end because nothing was reconciled by hand.',
        ],
      },
      { kind: 'heading', text: 'Ready-made or custom?' },
      {
        kind: 'paragraph',
        text: 'Try a ready-made product first. There are good ones, they are cheap, and if one fits your business you should use it rather than pay to have something built.',
      },
      {
        kind: 'paragraph',
        text: 'Custom becomes worth it when you would otherwise have to change how your business works to suit the software, when the per-user licence cost grows faster than your team, or when you need it to connect to something you already use. Custom systems start around ₹39,999 and take four to ten weeks, so the honest test is whether the hours it saves each month justify that.',
      },
      {
        kind: 'qa',
        question: 'When should a small business move from Excel to billing software?',
        answer:
          'When more than one person needs the file at the same time, when stock levels in the sheet are no longer trusted, or when the same sale has to be entered twice. Until then a spreadsheet is a reasonable and cheap way to run a small business.',
      },
      {
        kind: 'qa',
        question: 'Is custom billing software worth it over a ready-made product?',
        answer:
          'Usually only when a ready-made product would force you to change how your business already works, when per-user licence costs are rising faster than your team, or when the system must connect to tools you already use. Custom systems typically start around ₹39,999 and take four to ten weeks to build.',
      },
    ],
  },

  {
    slug: 'questions-to-ask-a-web-developer',
    title: 'Six questions to ask a developer before you pay anything',
    description:
      'The questions that separate a developer who will finish your project from one who will disappear halfway.',
    publishedAt: '2026-09-02',
    updatedAt: '2026-09-02',
    readingMinutes: 5,
    tags: ['hiring', 'small business', 'websites'],
    answer:
      'Ask who owns the domain and code, what the fixed price covers, what happens after launch, who you will actually talk to, what the timeline is in writing, and how you will see progress before you pay the balance.',
    body: [
      {
        kind: 'paragraph',
        text: 'Most business owners who have been let down by a developer were not cheated by a stranger. They were let down by someone who meant well, took on more than they could finish, and stopped replying. You cannot fully protect yourself from that, but six questions before any money changes hands will tell you a great deal.',
      },
      { kind: 'heading', text: '1. Who will own the domain, the hosting and the code?' },
      {
        kind: 'paragraph',
        text: 'The answer should be "you". If the domain is registered in the developer’s name, you cannot leave without losing your web address — and that is how people end up paying to get their own business name back. Ask for the domain and hosting to be registered under your email.',
      },
      { kind: 'heading', text: '2. What exactly does the price cover, in writing?' },
      {
        kind: 'paragraph',
        text: 'You want a document listing the pages, the features and the final number. Not an estimate, not a range. Once you approve it the price should not change unless you ask for something new, and then you should approve that cost before it is built.',
      },
      { kind: 'heading', text: '3. What happens after it goes live?' },
      {
        kind: 'paragraph',
        text: 'Every website needs small fixes in the first weeks. Ask how long support is included, and what "support" means — bug fixes only, or content changes too. Thirty days of included support is a normal minimum for a small project. Also ask what happens after that period, and get the rate before you need it.',
      },
      { kind: 'heading', text: '4. Who will I actually be talking to?' },
      {
        kind: 'paragraph',
        text: 'At an agency, the person who sells to you is usually not the person who builds. That is not automatically bad, but you should know it, because every question you ask afterwards will travel through a relay. Ask directly whether the person in front of you is writing the code.',
      },
      { kind: 'heading', text: '5. What is the timeline, and what happens if it slips?' },
      {
        kind: 'paragraph',
        text: 'A firm date in writing is reasonable to ask for. More telling is how the question is answered: a developer who says "five to seven days" without asking what you need has not thought about your project. One who asks several questions first, then commits, is the safer bet.',
      },
      { kind: 'heading', text: '6. How will I see progress before I pay the rest?' },
      {
        kind: 'paragraph',
        text: 'You should be able to open a link on your own phone and watch the work take shape, not wait for status emails. Ask for that link. A developer who is genuinely working has no reason to refuse, and it turns the second payment into a decision you make with evidence.',
      },
      {
        kind: 'callout',
        text: 'You are not being difficult by asking these. Anyone who reacts badly to six reasonable questions is telling you something useful about what the next six weeks would be like.',
      },
      { kind: 'heading', text: 'One question to ask yourself' },
      {
        kind: 'paragraph',
        text: 'Ask what you want this website to actually do. "Look professional" is hard to deliver against. "Let customers see prices and message me on WhatsApp" is something you can check on launch day, and something a developer can quote accurately.',
      },
      {
        kind: 'qa',
        question: 'What should I ask a web developer before hiring them?',
        answer:
          'Ask who will own the domain, hosting and code; what the fixed price covers in writing; how long support is included after launch and what it covers; whether the person you are speaking to will write the code; what the timeline is and what happens if it slips; and how you will see progress before paying the balance.',
      },
      {
        kind: 'qa',
        question: 'Should I pay a web developer the full amount upfront?',
        answer:
          'No. Half to start and half on delivery is the standard arrangement for small projects, with larger custom work split across milestones. Paying in full before seeing anything removes your only protection if the work is not finished.',
      },
      {
        kind: 'qa',
        question: 'Who should own my website domain name?',
        answer:
          'You should. The domain and hosting account must be registered in your name and email. If they are held in your developer’s name you cannot move to another developer without losing your web address.',
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Topics queued next — shown on the listing so the page is never a dead end. */
export const plannedTopics: string[] = [
  'What a CRM actually is, in shopkeeper language',
  'How to write a page that Google and AI assistants will quote',
  'Do you need a designer, or just a developer with taste?',
  'The real cost of a "free" website builder',
];
