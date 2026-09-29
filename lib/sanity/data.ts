import 'server-only';
import { cache } from 'react';
import type { QueryParams } from '@sanity/client';
import type {
  Cat,
  CatSummary,
  Exhibition,
  ExhibitionSummary,
  GalleryItem,
  Home,
  InformationPage,
  Kitten,
  LegalPage,
  Litter,
  LitterSummary,
  SiteSettings,
} from '@/types/content';
import { sanityClient } from './client';
import * as queries from './queries';
export const isDemo = process.env.CONTENT_MODE === 'demo';
export const isUnconfigured = !isDemo && !sanityClient;
async function fetchContent<T>(query: string, params: QueryParams, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  // An upstream failure is an error, never a reason to replace real content with demo cats.
  return (
    (await sanityClient.fetch<T>(query, params, { next: { revalidate: 300, tags: ['sanity'] } })) ??
    fallback
  );
}
async function demo() {
  return await import('@/lib/demo/content');
}
export const getSettings = cache(async (): Promise<SiteSettings> =>
  isDemo
    ? (await demo()).demoSettings
    : fetchContent(queries.settingsQuery, {}, { catteryName: 'Our Cattery' }),
);
export const getHome = cache(async (): Promise<Home | null> =>
  isDemo ? (await demo()).demoHome : fetchContent(queries.homeQuery, {}, null),
);
export const getCats = cache(async (sex?: 'male' | 'female'): Promise<CatSummary[]> =>
  isDemo
    ? (await demo()).demoCats.filter((cat) => !sex || cat.sex === sex)
    : fetchContent(queries.catsQuery, { sex: sex ?? null }, []),
);
export const getCat = cache(async (slug: string): Promise<Cat | null> =>
  isDemo
    ? ((await demo()).demoCats.find((cat) => cat.slug === slug) ?? null)
    : fetchContent(queries.catQuery, { slug }, null),
);
export const getLitters = cache(async (): Promise<LitterSummary[]> =>
  isDemo ? (await demo()).demoLitters : fetchContent(queries.littersQuery, {}, []),
);
export const getLitter = cache(async (slug: string): Promise<Litter | null> =>
  isDemo
    ? ((await demo()).demoLitters.find((litter) => litter.slug === slug) ?? null)
    : fetchContent(queries.litterQuery, { slug }, null),
);
export const getKitten = cache(async (slug: string): Promise<Kitten | null> =>
  isDemo
    ? ((await demo()).demoKittens.find((kitten) => kitten.slug === slug) ?? null)
    : fetchContent(queries.kittenQuery, { slug }, null),
);
export const getExhibitions = cache(async (): Promise<ExhibitionSummary[]> =>
  isDemo ? (await demo()).demoExhibitions : fetchContent(queries.exhibitionsQuery, {}, []),
);
export const getExhibition = cache(async (slug: string): Promise<Exhibition | null> =>
  isDemo
    ? ((await demo()).demoExhibitions.find((event) => event.slug === slug) ?? null)
    : fetchContent(queries.exhibitionQuery, { slug }, null),
);
export const getGallery = cache(async (): Promise<GalleryItem[]> =>
  isDemo ? (await demo()).demoGallery : fetchContent(queries.galleryQuery, {}, []),
);
export const getInformation = cache(async (): Promise<InformationPage | null> =>
  isDemo ? (await demo()).demoInformation : fetchContent(queries.informationQuery, {}, null),
);
export const getLegal = cache(async (id: 'privacy' | 'imprint'): Promise<LegalPage | null> =>
  fetchContent(queries.legalQuery, { id }, null),
);
export interface SitemapDocument {
  _id: string;
  _type: 'cat' | 'kitten' | 'litter' | 'exhibition';
  slug: string;
  _updatedAt?: string;
}
export const getSitemapDocuments = cache(async (): Promise<SitemapDocument[]> => {
  if (!isDemo) return fetchContent(queries.sitemapQuery, {}, []);
  const data = await demo();
  return [
    ...data.demoCats.map((item) => ({ ...item, _type: 'cat' as const })),
    ...data.demoKittens.map((item) => ({ ...item, _type: 'kitten' as const })),
    ...data.demoLitters.map((item) => ({ ...item, _type: 'litter' as const })),
    ...data.demoExhibitions.map((item) => ({ ...item, _type: 'exhibition' as const })),
  ];
});
