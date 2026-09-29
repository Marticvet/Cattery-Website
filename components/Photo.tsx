import Image from 'next/image';
import type { ContentImage } from '@/types/content';
import { imageUrl } from '@/lib/sanity/image';
export function Photo({
  image,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  width = 1200,
  height,
}: {
  image?: ContentImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const src = imageUrl(image, width, height);
  if (!src) return null;
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={image?.alt || ''}
        fill
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        placeholder={image?.asset?.metadata?.lqip ? 'blur' : 'empty'}
        blurDataURL={image?.asset?.metadata?.lqip}
        style={{
          objectPosition: image?.hotspot
            ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
            : undefined,
        }}
      />
    </div>
  );
}
