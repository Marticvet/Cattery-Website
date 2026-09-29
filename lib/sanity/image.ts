import { createImageUrlBuilder } from '@sanity/image-url';
import type { ContentImage } from '@/types/content';
import { sanityProjectId, sanityDataset } from './env';
const builder = sanityProjectId
  ? createImageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset })
  : undefined;
export function imageUrl(image?: ContentImage, width = 1400, height?: number): string | undefined {
  if (!image) return undefined;
  if (image.asset?._ref && builder) {
    let url = builder.image(image).width(width).auto('format').quality(85);
    if (height) url = url.height(height).fit('crop');
    return url.url();
  }
  // Local demo assets never enter the Sanity data path.
  if (image.src?.startsWith('/images/')) return image.src;
  return undefined;
}
