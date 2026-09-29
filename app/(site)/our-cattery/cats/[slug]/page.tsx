import { notFound } from 'next/navigation';
import { getCat, getCats, getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { formatDate, plainText } from '@/lib/utils';
import { labels } from '@/lib/labels';
import { Breadcrumbs, Container, Eyebrow, Facts } from '@/components/ui';
import { Photo } from '@/components/Photo';
import { ContactCTA } from '@/components/Contact';
import { DetailGallery, ParentLink, RichSection } from '@/components/Detail';
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = async () =>
  (await getCats()).map((cat) => ({ slug: cat.slug }));
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = await getCat(slug);
  if (!cat) notFound();
  return pageMetadata(
    `${cat.name} | ${cat.sex === 'female' ? 'Our Females' : 'Our Males'}`,
    `/our-cattery/cats/${slug}`,
    cat.shortDescription || plainText(cat.fullDescription).slice(0, 160),
    cat.mainImage,
  );
}
export default async function CatPage({ params }: Props) {
  const { slug } = await params;
  const [cat, settings] = await Promise.all([getCat(slug), getSettings()]);
  if (!cat) notFound();
  return (
    <>
      <Container className="page-content">
        <Breadcrumbs
          items={[
            { label: 'Our Cattery', href: '/our-cattery' },
            { label: cat.sex === 'female' ? 'Females' : 'Males', href: `/our-cattery/${cat.sex}s` },
            { label: cat.name },
          ]}
        />
        <article>
          <div className={`detail-hero ${!cat.mainImage ? 'detail-text-only' : ''}`}>
            <Photo
              image={cat.mainImage}
              className="detail-photo"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              height={1500}
            />
            <div className="detail-copy">
              <Eyebrow>{labels[cat.sex]}</Eyebrow>
              <h1>{cat.name}</h1>
              {cat.title && <p className="detail-title">{cat.title}</p>}
              <Facts
                items={[
                  { label: 'Breed', value: cat.breed },
                  { label: 'Colour', value: cat.color },
                  { label: 'Date of birth', value: formatDate(cat.dateOfBirth) },
                  { label: 'EMS code', value: cat.emsCode },
                ]}
              />
            </div>
          </div>
          <div className="detail-sections">
            <RichSection title={`About ${cat.name}`} content={cat.fullDescription} />
            {(cat.mother || cat.father) && (
              <section className="detail-section">
                <h2>Parents</h2>
                <Facts
                  items={[
                    {
                      label: 'Mother',
                      value: cat.mother ? <ParentLink cat={cat.mother} /> : undefined,
                    },
                    {
                      label: 'Father',
                      value: cat.father ? <ParentLink cat={cat.father} /> : undefined,
                    },
                  ]}
                />
              </section>
            )}
            <RichSection title="Pedigree" content={cat.pedigree} />
            <RichSection title="Health information" content={cat.healthInformation} />
            <RichSection title="Achievements" content={cat.achievements} />
          </div>
          <DetailGallery images={cat.gallery} />
        </article>
      </Container>
      <ContactCTA settings={settings} />
    </>
  );
}
