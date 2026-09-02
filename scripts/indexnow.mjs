/**
 * Tells Bing, Yandex and Seznam that pages changed, instead of waiting to be
 * recrawled. Worth doing because ChatGPT's search leans on the Bing index, so
 * faster Bing coverage is faster eligibility to be cited.
 *
 * Run after a deploy that changed content:
 *   node scripts/indexnow.mjs https://growdhandha.vercel.app
 *
 * The key file at public/${KEY}.txt must stay published — IndexNow fetches it
 * to prove you control the domain. It is not a secret.
 */
const KEY = '4f79d25c0a997cce966a7dc2411d4658';

const paths = [
  '/',
  '/pricing',
  '/blog',
  '/blog/what-a-business-website-costs-in-india',
  '/blog/website-or-mobile-app-which-first',
  '/blog/get-your-business-on-google-free',
  '/blog/billing-software-vs-excel',
  '/blog/questions-to-ask-a-web-developer',
];

const site = process.argv[2];

if (!site || !site.startsWith('https://')) {
  console.error('Usage: node scripts/indexnow.mjs https://your-domain.com');
  process.exit(1);
}

const host = new URL(site).host;

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${site}/${KEY}.txt`,
    urlList: paths.map((path) => `${site}${path}`),
  }),
});

// 200 and 202 both mean accepted; 202 means the key is still being validated.
if (response.ok) {
  console.log(`Submitted ${paths.length} URLs for ${host} (HTTP ${response.status})`);
} else {
  console.error(`IndexNow rejected the submission: HTTP ${response.status}`);
  console.error(await response.text());
  process.exit(1);
}
