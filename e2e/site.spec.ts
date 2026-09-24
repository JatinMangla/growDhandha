import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/** Every public HTML page. Keep in step with src/app when a page is added. */
const PAGES = ['/', '/pricing', '/blog', '/blog/billing-software-vs-excel', '/privacy', '/hi'];

const isMobile = (name: string) => name === 'mobile';

/** Where a section's top lands after an anchor jump: `scroll-margin-top: 6rem`. */
async function sectionTop(page: Page, id: string): Promise<number> {
  return page.locator(`#${id}`).evaluate((element) => element.getBoundingClientRect().top);
}

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`${path} loads with no CSP violations or script errors`, async ({ page }) => {
      const problems: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') problems.push(message.text());
      });
      page.on('pageerror', (error) => problems.push(error.message));

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.waitForLoadState('networkidle');
      expect(problems).toEqual([]);
    });

    for (const theme of ['light', 'dark'] as const) {
      test(`${path} has no WCAG A/AA violations in ${theme} mode`, async ({ page }) => {
        // Resting state: reduced motion resolves every reveal, so axe measures
        // what a reader sees rather than an element caught mid-fade.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await page.goto(path);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        const summary = results.violations.map(
          (violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`,
        );
        expect(summary).toEqual([]);
      });
    }
  }
});

test.describe('navigation', () => {
  test('a section link from another page lands on that section', async ({ page }, testInfo) => {
    await page.goto('/blog');

    if (isMobile(testInfo.project.name)) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: /Pricing/ }).click();
    } else {
      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Pricing' }).click();
    }

    await expect(page).toHaveURL(/\/#pricing$/);
    await expect.poll(() => sectionTop(page, 'pricing')).toBeGreaterThanOrEqual(0);
    await expect.poll(() => sectionTop(page, 'pricing')).toBeLessThan(160);
  });

  test('a section link on the homepage scrolls in place, deep into deferred content', async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo.project.name), 'The desktop nav is hidden on phones; covered by the menu test.');
    await page.goto('/');
    await page.evaluate(() => ((window as unknown as { marker: boolean }).marker = true));

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'FAQ' }).click();

    await expect(page).toHaveURL(/\/#faq$/);
    await expect.poll(() => sectionTop(page, 'faq')).toBeLessThan(160);
    await expect.poll(() => sectionTop(page, 'faq')).toBeGreaterThanOrEqual(0);
    // Still the same document: no reload happened.
    expect(await page.evaluate(() => (window as unknown as { marker?: boolean }).marker)).toBe(true);
  });
});

test.describe('mobile menu', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(!isMobile(testInfo.project.name), 'The menu only exists below the lg breakpoint.');
  });

  test('moves focus in, keeps it in, and returns it on Escape', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();

    const menu = page.getByRole('navigation', { name: 'Mobile' });
    await expect(menu.getByRole('link').first()).toBeFocused();

    // Shift+Tab from the first link goes to the toggle, and Shift+Tab again
    // wraps to the last item in the panel rather than escaping behind it.
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(menu.getByRole('link').last()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });
});

test.describe('contact', () => {
  test('the form hands a complete enquiry to WhatsApp', async ({ page }) => {
    await page.addInitScript(() => {
      window.open = ((url?: string | URL) => {
        (window as unknown as { opened: string }).opened = String(url);
        return null;
      }) as typeof window.open;
    });
    await page.goto('/#contact');

    await page.getByLabel('Your name').fill('Ramesh Kumar');
    await page.getByLabel('What kind of business?').selectOption('Shop / Retail store');
    await page.getByLabel('What do you need?').fill('A website and a billing system for my shop.');
    await page.getByRole('button', { name: 'Send on WhatsApp' }).click();

    await expect(page.getByRole('status')).toContainText('Thanks, Ramesh');
    const opened = await page.evaluate(() => (window as unknown as { opened: string }).opened);
    expect(opened.startsWith('https://wa.me/')).toBe(true);
    const text = new URL(opened).searchParams.get('text') ?? '';
    expect(text).toContain('Name: Ramesh Kumar');
    expect(text).toContain('A website and a billing system for my shop.');
    expect(text).not.toContain('Call me on');
  });

  test('an empty submit explains what is missing and focuses the first field', async ({ page }) => {
    await page.goto('/#contact');
    await page.getByRole('button', { name: 'Send on WhatsApp' }).click();
    await expect(page.getByText('Please tell me your name.')).toBeVisible();
    await expect(page.getByLabel('Your name')).toBeFocused();
  });

  test('the floating WhatsApp button is unreachable until it is visible', async ({ page }) => {
    await page.goto('/');
    const floating = page.locator('[data-cta="floating"]');
    expect(await floating.evaluate((element) => (element as HTMLElement).inert)).toBe(true);

    await page.mouse.wheel(0, 1200);
    await expect.poll(() => floating.evaluate((element) => (element as HTMLElement).inert)).toBe(false);
  });
});

test.describe('Hindi page', () => {
  test('is marked as Hindi and starts the WhatsApp chat in Hindi', async ({ page }) => {
    await page.goto('/hi');
    await expect(page.locator('[lang="hi-IN"]').first()).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('वेबसाइट या ऐप');

    const href = await page.locator('[data-cta="hi-hero"]').getAttribute('href');
    const text = new URL(href ?? '').searchParams.get('text') ?? '';
    expect(text.startsWith('नमस्ते जतिन जी')).toBe(true);
  });

  test('quotes exactly the prices the English site does', async ({ page }) => {
    await page.goto('/pricing');
    const english = await page.locator('article').evaluateAll((cards) =>
      cards.map((card) => card.textContent?.match(/₹[\d,]+/)?.[0]),
    );
    await page.goto('/hi');
    const hindi = await page.locator('#hi-pricing article').evaluateAll((cards) =>
      cards.map((card) => card.textContent?.match(/₹[\d,]+/)?.[0]),
    );
    expect(hindi).toEqual(english.slice(0, hindi.length));
    expect(hindi.length).toBe(3);
  });

  test('both language versions point at each other with hreflang', async ({ page }) => {
    for (const path of ['/', '/hi']) {
      await page.goto(path);
      // Compare resolved paths: Next writes the root as the bare origin.
      const pathOf = async (lang: string) =>
        new URL(
          (await page.locator(`link[rel="alternate"][hreflang="${lang}"]`).getAttribute('href')) ?? '',
        ).pathname;
      expect(await pathOf('hi-IN')).toBe('/hi');
      expect(await pathOf('en-IN')).toBe('/');
    }
  });
});

test.describe('markdown for agents', () => {
  test('each .md URL serves its own page, and unknown ones 404', async ({ request }) => {
    const pricing = await request.get('/pricing.md');
    expect(pricing.headers()['content-type']).toContain('text/markdown');
    expect((await pricing.text()).startsWith('# Website and app pricing')).toBe(true);

    const post = await request.get('/blog/billing-software-vs-excel.md');
    expect((await post.text()).startsWith('# Billing software or an Excel sheet')).toBe(true);

    expect((await request.get('/nope.md')).status()).toBe(404);
  });
});
