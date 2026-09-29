import type { MetadataRoute } from 'next';
import { getSitemapDocuments, getLegal, isDemo, isUnconfigured } from '@/lib/sanity/data';
import { siteUrl } from '@/lib/metadata';
export const revalidate = 300;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isDemo || isUnconfigured) return [];
  const [documents, privacy, imprint] = await Promise.all([
    getSitemapDocuments(),
    getLegal('privacy'),
    getLegal('imprint'),
  ]);
  const routes = [
    '/',
    '/our-cattery',
    '/our-cattery/males',
    '/our-cattery/females',
    '/litters',
    '/exhibitions',
    '/gallery',
    '/information',
    '/contact',
    ...(privacy?.readyToPublish ? ['/privacy'] : []),
    ...(imprint?.readyToPublish ? ['/imprint'] : []),
  ];
  const prefixes = {
    cat: '/our-cattery/cats',
    kitten: '/kittens',
    litter: '/litters',
    exhibition: '/exhibitions',
  };
  return [
    ...routes.map((path) => ({ url: new URL(path, siteUrl()).toString() })),
    ...documents.map((doc) => ({
      url: new URL(`${prefixes[doc._type]}/${doc.slug}`, siteUrl()).toString(),
      ...(doc._updatedAt ? { lastModified: doc._updatedAt } : {}),
    })),
  ];
}
