import { expect, test } from '@playwright/test';
const emptyMode = process.env.E2E_MODE === 'empty';
const staticRoutes = [
  '/',
  '/our-cattery',
  '/our-cattery/males',
  '/our-cattery/females',
  '/litters',
  '/exhibitions',
  '/gallery',
  '/information',
  '/contact',
  '/privacy',
  '/imprint',
  '/studio',
];
const detailRoutes = [
  '/our-cattery/cats/leonardo',
  '/our-cattery/cats/bella',
  '/our-cattery/cats/cleo',
  '/litters/litter-a',
  '/kittens/apollo',
  '/kittens/aurora',
  '/kittens/athena',
  '/exhibitions/international-cat-show-frankfurt',
];
test('every public route renders and unknown profiles return 404', async ({ page, request }) => {
  for (const path of [...staticRoutes, ...(!emptyMode ? detailRoutes : [])]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator('h1'), path).toHaveCount(1);
    await expect(page.locator('body')).not.toContainText('undefined');
  }
  for (const path of [
    '/our-cattery/cats/missing-cat',
    '/litters/missing-litter',
    '/kittens/missing-kitten',
    '/exhibitions/missing-event',
    '/missing-page',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});
test('empty CMS hides optional content and never leaks demonstration data', async ({ page }) => {
  test.skip(!emptyMode);
  for (const path of staticRoutes) {
    await page.goto(path);
    await expect(page.locator('body')).not.toContainText('Maison Aurelia');
    await expect(page.locator('body')).not.toContainText('Leonardo');
    await expect(page.locator('body')).not.toContainText('hello@example.com');
    expect(await page.locator('a[href^="mailto:"], a[href^="https://wa.me/"]').count()).toBe(0);
  }
  await page.goto('/litters');
  await expect(
    page.getByRole('heading', { name: 'We currently have no available litters.' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Current litters', exact: true })).toHaveCount(0);
  await page.goto('/our-cattery/cats/leonardo');
  await expect(page.getByRole('heading', { name: 'This page has wandered off.' })).toBeVisible();
});
test('CMS demo navigation, parents, kitten status, and optional sections work', async ({
  page,
}) => {
  test.skip(emptyMode);
  await page.goto('/litters/litter-a');
  await expect(page.getByRole('link', { name: 'Bella', exact: true })).toHaveAttribute(
    'href',
    '/our-cattery/cats/bella',
  );
  await expect(page.getByRole('link', { name: 'Leonardo', exact: true })).toHaveAttribute(
    'href',
    '/our-cattery/cats/leonardo',
  );
  await expect(page.locator('.kitten-card')).toHaveCount(3);
  await page.getByRole('link', { name: 'Meet Apollo', exact: true }).click();
  await expect(page).toHaveURL(/\/kittens\/apollo$/);
  await expect(page.getByRole('heading', { name: 'Apollo', exact: true })).toBeVisible();
  await expect(page.locator('.status')).toHaveText('Available');
  await page.goto('/our-cattery/cats/bella');
  await expect(page.getByRole('heading', { name: 'Health information', exact: true })).toHaveCount(
    0,
  );
  await expect(page.getByRole('heading', { name: 'Pedigree', exact: true })).toHaveCount(0);
});
test('gallery filters, keyboard, focus trap, and closing restore focus', async ({ page }) => {
  test.skip(emptyMode);
  await page.goto('/gallery');
  await page.getByRole('button', { name: 'Kittens', exact: true }).click();
  await expect(page.locator('.gallery-item')).toHaveCount(2);
  await page.getByRole('button', { name: 'All photographs', exact: true }).click();
  const trigger = page.locator('.gallery-item').first();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Photo gallery' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close photo gallery' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('.lightbox-toolbar')).toContainText('02 / 06');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('.lightbox-toolbar')).toContainText('01 / 06');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('.lightbox-toolbar')).toContainText('06 / 06');
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('mobile navigation supports Escape, focus restoration, and route changes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Main navigation' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Our females', exact: true }).click();
  await expect(page).toHaveURL(/\/our-cattery\/females$/);
  await expect(dialog).toHaveCount(0);
});
test('all requested viewport widths fit and photograph assets load', async ({ page }) => {
  test.skip(emptyMode);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      '/',
      '/our-cattery',
      '/our-cattery/females',
      '/litters/litter-a',
      '/kittens/apollo',
      '/gallery',
      '/information',
      '/contact',
    ]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `${width}px: ${path}`,
      ).toBe(true);
    }
    await page.goto('/');
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
  }
  await page.goto('/gallery');
  const images = page.locator('main img');
  await expect(images).toHaveCount(6);
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect
      .poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0))
      .toBe(true);
  }
  expect(errors).toEqual([]);
});
test('mobile photo swipes navigate the lightbox', async ({ browser }) => {
  test.skip(emptyMode);
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    baseURL: process.env.E2E_BASE_URL || 'http://127.0.0.1:3000',
  });
  const page = await context.newPage();
  await page.goto('/gallery');
  await page.locator('.gallery-item').first().click();
  const touchscreen = await context.newCDPSession(page);
  await touchscreen.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: 280, y: 350, id: 1 }],
  });
  await touchscreen.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: 70, y: 350, id: 1 }],
  });
  await touchscreen.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.locator('.lightbox-toolbar')).toContainText('02 / 06');
  await context.close();
});
test('metadata, image optimization, contact links, and revalidation endpoint are correct', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Disallow: /');
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  expect((await request.post('/api/revalidate', { data: { _type: 'cat' } })).status()).toBe(503);
  await page.goto('/contact');
  await expect(page.locator('form')).toHaveCount(0);
  if (!emptyMode) {
    await expect(page.locator('main a[href="mailto:hello@example.com"]')).toHaveCount(1);
    await page.goto('/kittens/apollo');
    await expect(page).toHaveTitle('Apollo | Kittens | Maison Aurelia');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/kittens\/apollo$/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Apollo | Kittens | Maison Aurelia',
    );
    const image = page.locator('main img').first();
    await expect(image).toHaveAttribute('src', /\/_next\/image/);
    const optimized = await request.get((await image.getAttribute('src')) || '');
    expect(optimized.status()).toBe(200);
    expect(optimized.headers()['content-type']).toMatch(/image\//);
  }
  await page.goto('/privacy');
  await expect(page.locator('main')).toContainText('Placeholder — owner review required');
});
