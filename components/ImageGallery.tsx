import type { ContentImage, GalleryItem } from '@/types/content';
import { imageUrl } from '@/lib/sanity/image';
import { GalleryGrid } from './GalleryGrid';
import type { GalleryPhoto } from './Lightbox';
export function ImageGallery({
  images,
  items,
  filterable = false,
  preview = false,
}: {
  images?: ContentImage[];
  items?: GalleryItem[];
  filterable?: boolean;
  preview?: boolean;
}) {
  const collection =
    items ??
    images?.map((image, index) => ({
      _id: image._key || `image-${index}`,
      image,
      caption: image.caption,
      category: undefined,
    })) ??
    [];
  const photos: GalleryPhoto[] = collection.flatMap((item) => {
    const src = imageUrl(item.image, 800);
    const largeSrc = imageUrl(item.image, 2000);
    return src && largeSrc
      ? [
          {
            id: item._id,
            src,
            largeSrc,
            alt: item.image.alt || item.caption || 'Cattery photograph',
            caption: item.caption,
            category: item.category,
            blurDataURL: item.image.asset?.metadata?.lqip,
            objectPosition: item.image.hotspot
              ? `${item.image.hotspot.x * 100}% ${item.image.hotspot.y * 100}%`
              : undefined,
          },
        ]
      : [];
  });
  return photos.length ? (
    <GalleryGrid photos={photos} filterable={filterable} preview={preview} />
  ) : null;
}
