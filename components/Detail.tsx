import Link from 'next/link';
import type { CatSummary, ContentImage, RichText } from '@/types/content';
import { ImageGallery } from './ImageGallery';
import { PortableTextRenderer } from './PortableTextRenderer';
export function ParentLink({ cat }: { cat?: CatSummary }) {
  return cat ? (
    cat.slug ? (
      <Link href={`/our-cattery/cats/${cat.slug}`}>{cat.name}</Link>
    ) : (
      <span>{cat.name}</span>
    )
  ) : null;
}
export function RichSection({ title, content }: { title: string; content?: RichText }) {
  return content?.length ? (
    <section className="detail-section">
      <h2>{title}</h2>
      <PortableTextRenderer value={content} />
    </section>
  ) : null;
}
export function DetailGallery({ images }: { images?: ContentImage[] }) {
  return images?.length ? (
    <section className="detail-gallery">
      <h2>A few more moments.</h2>
      <ImageGallery images={images} />
    </section>
  ) : null;
}
