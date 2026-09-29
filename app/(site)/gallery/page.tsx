import { getGallery } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { labels } from '@/lib/labels';
import { Container, EmptyState, PageIntro } from '@/components/ui';
import { ImageGallery } from '@/components/ImageGallery';
export const generateMetadata = () => pageMetadata('Gallery', '/gallery');
export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <Container className="page-content">
      <PageIntro
        eyebrow="Our photo album"
        title={'A glimpse into\nour little world.'}
        description="Sunlit afternoons, curious faces, and all the little things that make a house a home."
      />
      {items.length ? (
        <ImageGallery items={items} filterable />
      ) : (
        <EmptyState title={labels.emptyGallery} />
      )}
    </Container>
  );
}
