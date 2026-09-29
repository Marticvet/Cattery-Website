import type { MetadataRoute } from 'next';
import { isDemo, isUnconfigured } from '@/lib/sanity/data';
import { siteUrl } from '@/lib/metadata';
export default function robots(): MetadataRoute.Robots {
  return isDemo || isUnconfigured
    ? { rules: { userAgent: '*', disallow: '/' } }
    : {
        rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
        sitemap: new URL('/sitemap.xml', siteUrl()).toString(),
      };
}
