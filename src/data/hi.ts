import { formatINR } from '@/lib/utils';
import type { PricingTier, Service } from '@/types';
import { startingPrice, tier } from './pricing';
import { headlineUsers } from './stats';

/**
 * Hindi copy for /hi — written for a shop owner who is more at ease reading
 * Hindi, in the everyday Hindi of Indian business: common English words that
 * people actually use (वेबसाइट, बिलिंग, WhatsApp) stay as they are.
 *
 * Every price comes from pricing.ts and the users figure from stats.ts, so
 * this page can never quote a different number from the English site. The
 * wording itself is maintained by hand: when English copy changes in
 * substance (a timeline, a support period), update the matching line here.
 * Have a native speaker read any new text before it goes live.
 */

/** Pre-filled WhatsApp messages, in Hindi, so the chat starts in the visitor's language. */
export const hiEnquiry = {
  default: 'नमस्ते जतिन जी, मैंने आपकी वेबसाइट देखी। मुझे अपने बिज़नेस के लिए एक प्रोजेक्ट पर बात करनी है।',
  question: 'नमस्ते जतिन जी, फ़ैसला करने से पहले मेरा एक सवाल है।',
};

export const hiHero = {
  eyebrow: 'दिल्ली से, पूरे भारत के लिए',
  titleLead: 'आपके बिज़नेस के लिए वेबसाइट या ऐप।',
  titlePrice: `सिर्फ़ ${startingPrice} से।`,
  lead: `मैं जतिन हूँ, दिल्ली का एक डेवलपर। छोटे बिज़नेस के लिए वेबसाइट, मोबाइल ऐप और बिलिंग-स्टॉक सॉफ़्टवेयर बनाता हूँ — उसी क्वालिटी के साथ जो मैं रोज़ ${headlineUsers} यूज़र्स वाले एक फ़िनटेक प्लेटफ़ॉर्म पर इस्तेमाल करता हूँ।`,
  primaryCta: 'WhatsApp पर बात करें',
  secondaryCta: 'कीमतें देखें',
  assurances: ['कीमत पहले से तय, लिखित में', 'आप सीधे डेवलपर से बात करते हैं', 'कुछ ही घंटों में जवाब'],
  honestPrice: `हाँ, सच में ${startingPrice}। कोई छुपा चार्ज नहीं, कोई अचानक बिल नहीं। काम शुरू होने से पहले पूरी कीमत आपके सामने होती है।`,
};

/** Keyed by the English service id, so the set of services stays the same. */
export const hiServices: Record<Service['id'], { title: string; promise: string }> = {
  'business-website': {
    title: 'बिज़नेस वेबसाइट',
    promise: 'लोग Google पर आपको ढूँढें और उसी समय WhatsApp या कॉल करें।',
  },
  'mobile-app': {
    title: 'मोबाइल ऐप',
    promise: 'Android और iPhone दोनों पर एक ही ऐप — ऑर्डर, बुकिंग या स्टाफ़ की रोज़ की रिपोर्ट के लिए।',
  },
  crm: {
    title: 'ग्राहक और एनक्वायरी मैनेजमेंट',
    promise: 'हर ग्राहक, ऑर्डर और फ़ॉलो-अप एक जगह — डायरी या WhatsApp चैट में खोया हुआ नहीं।',
  },
  'inventory-billing': {
    title: 'बिलिंग और स्टॉक सिस्टम',
    promise: 'स्टॉक की सही गिनती, स्टॉक ख़त्म होने से पहले अलर्ट, और दस सेकंड में GST बिल।',
  },
  'custom-software': {
    title: 'कस्टम बिज़नेस सॉफ़्टवेयर',
    promise: 'Excel और रजिस्टर में बार-बार होने वाला काम, एक आसान स्क्रीन में।',
  },
  'ai-features': {
    title: 'AI फ़ीचर',
    promise: 'ग्राहकों के आम सवालों के जवाब और बिल-कागज़ात पढ़ने का काम, बिना नया स्टाफ़ रखे।',
  },
};

type HiTier = {
  priceNote: string;
  bestFor: string;
  timeline: string;
  includes: string[];
  ctaLabel: string;
  enquiry: string;
};

const starter = tier('starter');
const business = tier('business');
const custom = tier('custom');

/** Keyed by tier id; names (Starter, Business…) stay in English, as on invoices. */
export const hiTiers: Record<PricingTier['id'], HiTier> = {
  [starter.id]: {
    priceNote: 'एक बार, सब कुछ शामिल',
    bestFor: 'दुकान, क्लिनिक, कोचिंग सेंटर और सर्विस देने वाले — जो पहली बार ऑनलाइन आ रहे हैं।',
    timeline: '5–7 दिन में तैयार',
    includes: [
      'पूरी एक-पेज वेबसाइट',
      'हर फ़ोन पर सही चलती है',
      'हर स्क्रीन पर WhatsApp और कॉल बटन',
      'Google सर्च पर आपका बिज़नेस',
      'फ़ोटो गैलरी और एनक्वायरी फ़ॉर्म',
      'लॉन्च के बाद 30 दिन सपोर्ट',
    ],
    ctaLabel: 'Starter से शुरू करें',
    enquiry: `नमस्ते जतिन जी, मुझे ${starter.price} वाली Starter वेबसाइट चाहिए। मेरा बिज़नेस है: `,
  },
  [business.id]: {
    priceNote: 'एक बार, सब कुछ शामिल',
    bestFor: 'बढ़ते बिज़नेस के लिए — कैटलॉग, एनक्वायरी और ऐसा कंटेंट जो आप खुद बदल सकें।',
    timeline: '2–3 हफ़्ते में तैयार',
    includes: [
      'Starter की सारी चीज़ें',
      '8 पेज तक — सर्विस, हमारे बारे में, कैटलॉग, संपर्क',
      'सर्च वाला प्रोडक्ट या सर्विस कैटलॉग',
      'एडमिन पैनल — टेक्स्ट, कीमत और फ़ोटो खुद बदलें',
      'एनक्वायरी सीधे आपके ईमेल और WhatsApp पर',
      'लॉन्च के बाद 60 दिन सपोर्ट',
    ],
    ctaLabel: 'Business चुनें',
    enquiry: 'नमस्ते जतिन जी, मुझे Business प्लान के बारे में जानना है। मेरा बिज़नेस है: ',
  },
  [custom.id]: {
    priceNote: 'बात करने के बाद कोटेशन',
    bestFor: 'बिलिंग, स्टॉक, CRM, मोबाइल ऐप या आपके काम करने के तरीक़े के हिसाब से बना सॉफ़्टवेयर।',
    timeline: 'आमतौर पर 4–10 हफ़्ते',
    includes: [
      'Business की सारी चीज़ें',
      'बिलिंग, स्टॉक या CRM सिस्टम',
      'Android और iPhone के लिए ऐप',
      'स्टाफ़ के लिए अलग-अलग लॉगिन',
      'आपके आँकड़ों की रिपोर्ट और डैशबोर्ड',
      'लॉन्च के बाद 90 दिन सपोर्ट',
    ],
    ctaLabel: 'अपने प्रोजेक्ट पर बात करें',
    enquiry: 'नमस्ते जतिन जी, मुझे कस्टम सॉफ़्टवेयर चाहिए। मेरा बिज़नेस यह काम करता है: ',
  },
};

/** "₹4,999" or, for a floor price, "₹39,999 से" — Hindi puts "from" after the number. */
export function hiPrice(item: PricingTier): string {
  return item.priceIsFrom ? `${formatINR(item.priceValue)} से` : item.price;
}

export const hiProcess = [
  { title: 'हम बात करते हैं', duration: 'दिन 1 · मुफ़्त', text: '20 मिनट की कॉल या WhatsApp चैट। कोई तकनीकी सवाल नहीं — बस आपका बिज़नेस और आपकी परेशानी।' },
  { title: 'प्लान और तय कीमत', duration: 'दिन 2–3', text: 'पूरा काम, समय और आख़िरी कीमत लिखित में। मंज़ूरी के बाद कीमत नहीं बदलती। 50% देकर काम शुरू होता है।' },
  { title: 'मैं बनाता हूँ', duration: 'हफ़्ता 1–3', text: 'पहले दिन से एक प्राइवेट लिंक — फ़ोन पर कभी भी खोलकर देखें कि काम कहाँ तक पहुँचा।' },
  { title: 'आप देखें, मैं सुधारूँ', duration: 'लॉन्च से पहले', text: 'बदलाव के दो पूरे राउंड शामिल हैं। जब तक आप संतुष्ट नहीं, कुछ भी लाइव नहीं होता।' },
  { title: 'लॉन्च और सपोर्ट', duration: 'लॉन्च के बाद', text: 'डोमेन, होस्टिंग, SSL और Google लिस्टिंग मैं संभालता हूँ। फिर प्लान के हिसाब से 30 से 90 दिन तक सपोर्ट।' },
];

export const hiFaqs = [
  {
    question: 'वेबसाइट बनने में कितना समय लगेगा?',
    answer:
      'Starter वेबसाइट 5–7 दिन में और Business वेबसाइट 2–3 हफ़्ते में तैयार होती है। कस्टम सॉफ़्टवेयर और ऐप में आमतौर पर 4–10 हफ़्ते लगते हैं। काम शुरू होने से पहले आपको पक्की तारीख़ लिखित में मिलती है।',
  },
  {
    question: 'क्या पूरा पैसा पहले देना होगा?',
    answer: `नहीं। 50% काम शुरू करने पर, और 50% काम पूरा होने और आपके संतुष्ट होने पर। ${formatINR(custom.priceValue)} से बड़े प्रोजेक्ट में पेमेंट काम के पड़ावों के हिसाब से बँटता है। हर पेमेंट का सही बिल मिलता है।`,
  },
  {
    question: 'क्या बाद में टेक्स्ट और फ़ोटो मैं खुद बदल सकता हूँ?',
    answer:
      'हाँ। Business और Custom प्लान में एडमिन पैनल मिलता है, जिसमें आप बिना किसी तकनीकी जानकारी के बदलाव कर सकते हैं — मैं कॉल पर सिखाता हूँ और एक छोटा वीडियो भी देता हूँ। Starter में पहले 30 दिन छोटे बदलाव मुफ़्त हैं।',
  },
  {
    question: 'डोमेन और वेबसाइट किसके नाम पर होगी?',
    answer:
      'आपके नाम पर। डोमेन, होस्टिंग अकाउंट और कोड — सब आपका है, मेरा नहीं। डोमेन (जैसे yourbusiness.com) का ख़र्च लगभग ₹800 से ₹1,200 सालाना है, जो सीधे रजिस्ट्रार को जाता है।',
  },
];

export const hiContact = {
  title: 'अपने बिज़नेस की ज़रूरत बताइए',
  text: 'कोई दबाव नहीं, कोई बिक्री की बात नहीं। बताइए क्या चाहिए — मैं ईमानदारी से बताऊँगा कि कितना ख़र्च और समय लगेगा, और अगर आपको इसकी ज़रूरत ही नहीं है, तो वो भी।',
  /** Mirrors site.workingHours and site.responseTime; update both together. */
  hours: 'मैं कुछ ही घंटों में जवाब देता हूँ। सोमवार से शनिवार, सुबह 10 से रात 8 बजे तक।',
  call: 'कॉल करें',
};
