import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKitten, getSettings, getSitemapDocuments } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, plainText } from '@/lib/utils';
import { kittenStatuses, labels } from '@/lib/labels';
import { kittenMessage } from '@/lib/contact';
import { Breadcrumbs, Container, Eyebrow, Facts } from '@/components/ui';
import { Photo } from '@/components/Photo';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import { Status } from '@/components/Cards';
import { ContactCTA } from '@/components/Contact';
import { DetailGallery } from '@/components/Detail';
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () =>
  (await getSitemapDocuments())
    .filter((doc) => doc._type === 'kitten')
    .map((kitten) => ({ slug: kitten.slug }));
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const kitten = await getKitten(slug);
  if (!kitten) notFound();
  return pageMetadata(
    `${kitten.name} | Kittens`,
    `/kittens/${slug}`,
    plainText(kitten.description).slice(0, 160),
    kitten.mainImage,
  );
}
export default async function KittenPage({ params }: Props) {
  const { slug } = await params;
  const [kitten, settings] = await Promise.all([getKitten(slug), getSettings()]);
  if (!kitten) notFound();
  return (
    <>
      <Container className="page-content">
        <Breadcrumbs
          items={[
            { label: 'Litters', href: '/litters' },
            ...(kitten.litter?.slug
              ? [{ label: kitten.litter.name, href: `/litters/${kitten.litter.slug}` }]
              : []),
            { label: kitten.name },
          ]}
        />
        <div className={`detail-hero ${!kitten.mainImage ? 'detail-text-only' : ''}`}>
          <Photo
            image={kitten.mainImage}
            className="detail-photo"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            height={1500}
          />
          <div className="detail-copy">
            <Eyebrow>A little personality</Eyebrow>
            <h1>{kitten.name}</h1>
            <Status value={kitten.status}>{kittenStatuses[kitten.status]}</Status>
            <Facts
              items={[
                {
                  label: 'Litter',
                  value: kitten.litter?.slug ? (
                    <Link href={`/litters/${kitten.litter.slug}`}>{kitten.litter.name}</Link>
                  ) : undefined,
                },
                { label: 'Sex', value: labels[kitten.sex] },
                { label: 'Colour', value: kitten.color },
                { label: 'Date of birth', value: formatDate(kitten.dateOfBirth) },
              ]}
            />
            <PortableTextRenderer value={kitten.description} />
          </div>
        </div>
        <DetailGallery images={kitten.gallery} />
      </Container>
      <ContactCTA
        settings={settings}
        heading={labels.interestTitle.replace('{name}', kitten.name)}
        message={kittenMessage(settings, kitten.name, kitten.litter?.name)}
      />
    </>
  );
}
