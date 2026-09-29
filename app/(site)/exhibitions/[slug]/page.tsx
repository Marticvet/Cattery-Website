import { notFound } from 'next/navigation';
import { getExhibition, getExhibitions } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, plainText } from '@/lib/utils';
import { Breadcrumbs, Container, Facts, PageIntro, SectionHeading } from '@/components/ui';
import { Photo } from '@/components/Photo';
import { CatCard } from '@/components/Cards';
import { DetailGallery, RichSection } from '@/components/Detail';
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () =>
  (await getExhibitions()).map((event) => ({ slug: event.slug }));
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = await getExhibition(slug);
  if (!event) notFound();
  return pageMetadata(
    `${event.eventName || event.title} | Exhibitions`,
    `/exhibitions/${slug}`,
    plainText(event.description).slice(0, 160),
    event.coverImage,
  );
}
export default async function ExhibitionPage({ params }: Props) {
  const { slug } = await params;
  const event = await getExhibition(slug);
  if (!event) notFound();
  return (
    <Container className="page-content">
      <Breadcrumbs
        items={[{ label: 'Exhibitions', href: '/exhibitions' }, { label: event.title }]}
      />
      <PageIntro eyebrow={formatDate(event.date) || 'An exhibition memory'} title={event.title} />
      <Photo
        image={event.coverImage}
        className="litter-cover"
        sizes="100vw"
        priority
        width={1800}
        height={850}
      />
      <div className="detail-sections">
        <Facts
          items={[
            { label: 'Event', value: event.eventName },
            {
              label: 'Location',
              value: [event.location, event.country].filter(Boolean).join(', '),
            },
            { label: 'Date', value: formatDate(event.date) },
          ]}
        />
        <RichSection title="The story of the day" content={event.description} />
        <RichSection title="Results" content={event.results} />
      </div>
      {!!event.participatingCats?.length && (
        <section className="detail-gallery">
          <SectionHeading title="Our stars of the day." />
          <div className="cat-grid">
            {event.participatingCats.map((cat) => (
              <CatCard cat={cat} key={cat._id} />
            ))}
          </div>
        </section>
      )}
      <DetailGallery images={event.gallery} />
    </Container>
  );
}
