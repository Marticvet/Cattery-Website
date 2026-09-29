import { notFound } from 'next/navigation';
import { getLitter, getLitters, getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, plainText } from '@/lib/utils';
import { litterStatuses } from '@/lib/labels';
import {
  Breadcrumbs,
  Container,
  EmptyState,
  Facts,
  PageIntro,
  SectionHeading,
} from '@/components/ui';
import { Photo } from '@/components/Photo';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import { KittenCard, Status } from '@/components/Cards';
import { ContactCTA } from '@/components/Contact';
import { DetailGallery, ParentLink } from '@/components/Detail';
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () =>
  (await getLitters()).map((litter) => ({ slug: litter.slug }));
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const litter = await getLitter(slug);
  if (!litter) notFound();
  return pageMetadata(
    `${litter.name} | Litters`,
    `/litters/${slug}`,
    plainText(litter.description).slice(0, 160),
    litter.coverImage,
  );
}
export default async function LitterPage({ params }: Props) {
  const { slug } = await params;
  const [litter, settings] = await Promise.all([getLitter(slug), getSettings()]);
  if (!litter) notFound();
  const birth = formatDate(litter.dateOfBirth);
  const expected = formatDate(litter.expectedDate);
  return (
    <>
      <Container className="page-content">
        <Breadcrumbs items={[{ label: 'Litters', href: '/litters' }, { label: litter.name }]} />
        <PageIntro
          eyebrow="A new chapter"
          title={litter.name}
          description={birth ? `Born ${birth}` : expected ? `Expected ${expected}` : undefined}
        />
        <Photo
          image={litter.coverImage}
          className="litter-cover"
          sizes="100vw"
          priority
          width={1800}
          height={850}
        />
        <div className="litter-meta">
          <Facts
            items={[
              {
                label: 'Mother',
                value: litter.mother ? <ParentLink cat={litter.mother} /> : undefined,
              },
              {
                label: 'Father',
                value: litter.father ? <ParentLink cat={litter.father} /> : undefined,
              },
              { label: 'Kittens', value: litter.kittens?.length || undefined },
              {
                label: 'Status',
                value: <Status value={litter.status}>{litterStatuses[litter.status]}</Status>,
              },
            ]}
          />
          <PortableTextRenderer value={litter.description} />
        </div>
        {litter.kittens?.length ? (
          <section>
            <SectionHeading eyebrow="Little personalities" title="Meet the kittens." />
            <div className="cat-grid">
              {litter.kittens.map((kitten) => (
                <KittenCard kitten={kitten} key={kitten._id} />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            title="A little more to look forward to."
            description="We will share the kittens’ individual stories here as they grow."
          />
        )}
        <DetailGallery images={litter.gallery} />
      </Container>
      <ContactCTA settings={settings} />
    </>
  );
}
