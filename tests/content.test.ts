import assert from 'node:assert/strict';
import { test } from 'node:test';
import { evaluate, parse } from 'groq-js';
import * as queries from '../lib/sanity/queries';
import {
  getContactMethods,
  kittenMessage,
  preferredContactMethods,
  whatsappUrl,
} from '../lib/contact';
import { safeHref, formatDate } from '../lib/utils';
import type { SiteSettings } from '../types/content';
const settings: SiteSettings = { catteryName: 'Test Cattery' };
const reference = (id: string) => ({ _type: 'reference', _ref: id });
const cat = (id: string, sex = 'female', active = true) => ({
  _id: id,
  _type: 'cat',
  name: id,
  slug: { current: id },
  sex,
  active,
  displayOrder: 0,
});
const dataset = [
  cat('bella'),
  cat('leonardo', 'male'),
  cat('hidden', 'female', false),
  cat('drafts.secret'),
  {
    _id: 'litter-a',
    _type: 'litter',
    name: 'Litter A',
    slug: { current: 'litter-a' },
    active: true,
    status: 'available',
    mother: reference('bella'),
    father: reference('leonardo'),
    kittens: [reference('apollo'), reference('aurora'), reference('hidden-kitten')],
  },
  {
    _id: 'apollo',
    _type: 'kitten',
    name: 'Apollo',
    slug: { current: 'apollo' },
    active: true,
    litter: reference('litter-a'),
    displayOrder: 0,
    status: 'available',
  },
  {
    _id: 'aurora',
    _type: 'kitten',
    name: 'Aurora',
    slug: { current: 'aurora' },
    active: true,
    litter: reference('litter-a'),
    displayOrder: 1,
    status: 'reserved',
  },
  {
    _id: 'athena',
    _type: 'kitten',
    name: 'Athena',
    slug: { current: 'athena' },
    active: true,
    litter: reference('litter-a'),
    displayOrder: 2,
    status: 'stayingWithUs',
  },
  {
    _id: 'hidden-kitten',
    _type: 'kitten',
    name: 'Hidden',
    slug: { current: 'hidden-kitten' },
    active: false,
    litter: reference('litter-a'),
  },
  {
    _id: 'homepage',
    _type: 'homepage',
    heroTitle: 'Real Home',
    featuredCats: [reference('bella'), reference('hidden'), reference('missing')],
    featuredLitters: [reference('litter-a')],
  },
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    catteryName: 'Real Cattery',
    contactEmail: 'real@example.com',
  },
  {
    _id: 'informationPage',
    _type: 'informationPage',
    title: 'Advice',
    sections: [{ _key: 'care', title: 'Care', content: [] }],
  },
  {
    _id: 'show',
    _type: 'exhibition',
    title: 'A show',
    slug: { current: 'a-show' },
    participatingCats: [reference('bella'), reference('hidden')],
  },
];
async function query<T>(
  source: string,
  params: Record<string, unknown> = {},
  data: unknown[] = dataset,
): Promise<T> {
  return (await evaluate(parse(source), { dataset: data, params })).get();
}
test('every GROQ query parses and handles a completely empty dataset', async () => {
  for (const [name, source] of Object.entries(queries))
    if (name.endsWith('Query'))
      await query(source, { slug: 'missing', sex: null, id: 'privacy' }, []);
});
test('cat listings exclude drafts and hidden cats, and filter sex', async () => {
  assert.deepEqual(
    (await query<{ name: string }[]>(queries.catsQuery, { sex: 'female' })).map(
      (item) => item.name,
    ),
    ['bella'],
  );
  assert.equal((await query<unknown[]>(queries.catsQuery, { sex: null })).length, 2);
  assert.equal(await query(queries.catQuery, { slug: 'hidden' }), null);
});
test('cat details retain the fields from the shared projection', async () => {
  const result = await query<{ name: string; slug: string }>(queries.catQuery, { slug: 'bella' });
  assert.equal(result.name, 'bella');
  assert.equal(result.slug, 'bella');
});
test('litter details resolve parents, include reverse-linked kittens once, and hide inactive kittens', async () => {
  const result = await query<{
    mother: { slug: string };
    father: { slug: string };
    kittens: { name: string }[];
  }>(queries.litterQuery, { slug: 'litter-a' });
  assert.equal(result.mother.slug, 'bella');
  assert.equal(result.father.slug, 'leonardo');
  assert.deepEqual(
    result.kittens.map((kitten) => kitten.name),
    ['Apollo', 'Aurora', 'Athena'],
  );
});
test('kitten details resolve their litter and do not link to an inactive litter', async () => {
  const kitten = await query<{ litter: { slug: string } }>(queries.kittenQuery, { slug: 'apollo' });
  assert.equal(kitten.litter.slug, 'litter-a');
  const hiddenLitterDataset = dataset.map((item) =>
    item._id === 'litter-a' ? { ...item, active: false } : item,
  );
  assert.equal(
    (await query<{ litter: unknown }>(queries.kittenQuery, { slug: 'apollo' }, hiddenLitterDataset))
      .litter,
    null,
  );
});
test('homepage selected references filter inactive and deleted documents', async () => {
  const result = await query<{
    featuredCats: { name: string }[];
    featuredLitters: { slug: string }[];
  }>(queries.homeQuery);
  assert.deepEqual(
    result.featuredCats.map((item) => item.name),
    ['bella'],
  );
  assert.equal(result.featuredLitters[0].slug, 'litter-a');
});
test('homepage falls back only to CMS featured records when selection is empty', async () => {
  const data = dataset.map((item) =>
    item._id === 'homepage'
      ? { ...item, featuredCats: [] }
      : item._id === 'leonardo'
        ? { ...item, featured: true }
        : item,
  );
  assert.deepEqual(
    (
      await query<{ featuredCats: { name: string }[] }>(queries.homeQuery, {}, data)
    ).featuredCats.map((item) => item.name),
    ['leonardo'],
  );
});
test('exhibition participant references exclude hidden cats', async () => {
  const result = await query<{ participatingCats: { name: string }[] }>(queries.exhibitionQuery, {
    slug: 'a-show',
  });
  assert.deepEqual(
    result.participatingCats.map((cat) => cat.name),
    ['bella'],
  );
});
test('missing and disabled contact methods never appear', () => {
  assert.deepEqual(getContactMethods(settings), []);
  assert.deepEqual(
    getContactMethods({
      ...settings,
      contactEmail: 'hello@example.com',
      showEmail: false,
      phoneNumber: '+49 123456789',
      showPhone: false,
      whatsappNumber: '+49 123456789',
      showWhatsApp: false,
      instagramUrl: 'https://instagram.com/example',
      showInstagram: false,
      facebookUrl: 'https://facebook.com/example',
      showFacebook: false,
      tiktokUrl: 'https://tiktok.com/@example',
      showTikTok: false,
    }),
    [],
  );
});
test('email, international phone, WhatsApp, and social URLs use the correct actions', () => {
  const methods = getContactMethods({
    ...settings,
    contactEmail: 'hello@example.com',
    phoneNumber: '+49 (123) 456789',
    whatsappNumber: '0049 123 456789',
    instagramUrl: 'https://www.instagram.com/example',
    facebookUrl: 'https://www.facebook.com/example',
    tiktokUrl: 'https://www.tiktok.com/@example',
  });
  assert.equal(methods.find((method) => method.kind === 'email')?.href, 'mailto:hello@example.com');
  assert.equal(methods.find((method) => method.kind === 'phone')?.href, 'tel:+49123456789');
  assert.equal(
    methods.find((method) => method.kind === 'whatsapp')?.href,
    'https://wa.me/49123456789',
  );
  assert.equal(methods.filter((method) => method.external).length, 4);
});
test('WhatsApp message is encoded and uses a configurable template; preferred actions stay ordered', () => {
  const config = {
    ...settings,
    whatsappNumber: '+49 123456789',
    contactEmail: 'hello@example.com',
    instagramUrl: 'https://instagram.com/example',
  };
  const message = kittenMessage(config, 'Apollo & friends', 'Litter A');
  assert.equal(
    new URL(whatsappUrl(config.whatsappNumber, message)!).searchParams.get('text'),
    'Hello, I would like to ask about Apollo & friends from Litter A.',
  );
  assert.equal(
    kittenMessage({ ...config, whatsappMessageTemplate: 'Hallo, {name}{litter}!' }, 'Apollo'),
    'Hallo, Apollo!',
  );
  assert.deepEqual(
    preferredContactMethods(config).map((method) => method.kind),
    ['whatsapp', 'email', 'instagram'],
  );
});
test('unsafe contact URLs, malformed numbers, and script links are rejected', () => {
  assert.deepEqual(
    getContactMethods({
      ...settings,
      contactEmail: 'bad\n@example.com',
      phoneNumber: '123',
      whatsappNumber: '000',
      instagramUrl: 'javascript:alert(1)',
      facebookUrl: 'http://facebook.com/example',
    }),
    [],
  );
  for (const href of ['javascript:alert(1)', '//evil.test', '/\\evil.test', 'data:text/html,hello'])
    assert.equal(safeHref(href), undefined);
  assert.equal(safeHref('/litters/litter-a'), '/litters/litter-a');
  assert.equal(formatDate('invalid'), undefined);
});
