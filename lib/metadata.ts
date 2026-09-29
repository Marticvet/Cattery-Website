import type { Metadata } from 'next';
import type { ContentImage } from '@/types/content';
import { getSettings, isDemo, isUnconfigured } from './sanity/data';
import { imageUrl } from './sanity/image';
export function siteUrl(): URL {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid site URL');
    return url;
  } catch {
    return new URL('http://localhost:3000');
  }
}
export async function pageMetadata(
  title: string | undefined,
  path: string,
  description?: string,
  image?: ContentImage,
): Promise<Metadata> {
  const settings = await getSettings();
  const fullTitle = title
    ? `${title} | ${settings.catteryName}`
    : settings.defaultTitle || settings.catteryName;
  const desc = description || settings.defaultDescription || settings.siteDescription;
  const source = imageUrl(image || settings.defaultOpenGraphImage, 1200, 630);
  const images = source
    ? [
        {
          url: new URL(source, siteUrl()).toString(),
          alt: (image || settings.defaultOpenGraphImage)?.alt || fullTitle,
        },
      ]
    : [];
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: path,
      siteName: settings.catteryName,
      type: 'website',
      locale: 'en_GB',
      images,
    },
    twitter: {
      card: images.length ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: desc,
      images: images.map((item) => item.url),
    },
    robots: isDemo || isUnconfigured ? { index: false, follow: false } : undefined,
  };
}
