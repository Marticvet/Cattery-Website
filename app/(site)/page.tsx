import { getHome, getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { labels } from '@/lib/labels';
import {
  Button,
  Container,
  EmptyState,
  Eyebrow,
  Section,
  SectionHeading,
  TextLink,
} from '@/components/ui';
import { Photo } from '@/components/Photo';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import { CatCard, ExhibitionCard, LitterCard } from '@/components/Cards';
import { ImageGallery } from '@/components/ImageGallery';
import { ContactCTA } from '@/components/Contact';
export const generateMetadata = () => pageMetadata(undefined, '/');
export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSettings()]);
  if (!home)
    return (
      <Container>
        <EmptyState
          headingLevel={1}
          title={settings.catteryName}
          description="Our story is taking shape. We look forward to sharing our cats and little beginnings with you."
          contact
        />
      </Container>
    );
  return (
    <>
      <Container>
        <section className={`hero ${!home.heroImage ? 'hero-text-only' : ''}`}>
          <div className="hero-copy">
            <Eyebrow>{labels.welcome}</Eyebrow>
            <h1>{home.heroTitle || settings.catteryName}</h1>
            {home.heroSubtitle && <p className="hero-subtitle">{home.heroSubtitle}</p>}
            {home.heroDescription && <p className="hero-description">{home.heroDescription}</p>}
            <div className="button-row">
              {home.primaryCTA?.label && home.primaryCTA.href && (
                <Button href={home.primaryCTA.href}>{home.primaryCTA.label}</Button>
              )}
              {home.secondaryCTA?.label && home.secondaryCTA.href && (
                <TextLink href={home.secondaryCTA.href}>{home.secondaryCTA.label}</TextLink>
              )}
            </div>
            <div className="hero-footnote">
              <span className="short-rule" />
              <span>A home. A family. A lifelong bond.</span>
            </div>
          </div>
          {home.heroImage && (
            <div className="hero-visual">
              <Photo
                image={home.heroImage}
                className="hero-photo"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
                width={1600}
                height={1800}
              />
              {home.secondaryHeroImage && (
                <Photo
                  image={home.secondaryHeroImage}
                  className="hero-secondary-photo"
                  sizes="25vw"
                  width={600}
                  height={720}
                />
              )}
              <div className="hero-image-caption">
                <span>{home.heroImageCaption || 'Life is a little lovelier with a cat.'}</span>
                <span>01 — A little introduction</span>
              </div>
            </div>
          )}
        </section>
      </Container>
      {home.aboutHeading && home.aboutContent?.length ? (
        <Section id="our-story">
          <Container className={`editorial-grid ${!home.aboutImage ? 'editorial-text-only' : ''}`}>
            <Photo
              image={home.aboutImage}
              className="about-photo"
              sizes="(max-width: 768px) 100vw, 45vw"
              width={1200}
              height={1400}
            />
            <div className="editorial-copy">
              <Eyebrow>{labels.about}</Eyebrow>
              <h2>{home.aboutHeading}</h2>
              <PortableTextRenderer value={home.aboutContent} />
              <TextLink href="/information">A little more about us</TextLink>
            </div>
          </Container>
        </Section>
      ) : null}
      {!!home.featuredCats?.length && (
        <Section className="secondary-surface">
          <Container>
            <SectionHeading
              eyebrow={labels.cats}
              title={home.featuredCatsHeading || 'Their home. Our whole heart.'}
              link={{ href: '/our-cattery', label: labels.allCats }}
            />
            <div className="cat-grid">
              {home.featuredCats.map((cat) => (
                <CatCard cat={cat} key={cat._id} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      {!!home.featuredLitters?.length && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow={labels.litters}
              title={home.featuredLittersHeading || 'The sweetest new chapters.'}
              link={{ href: '/litters', label: labels.allLitters }}
            />
            <div className={home.featuredLitters.length > 1 ? 'litter-grid' : ''}>
              {home.featuredLitters.map((litter) => (
                <LitterCard
                  litter={litter}
                  key={litter._id}
                  wide={home.featuredLitters?.length === 1}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
      {home.philosophyHeading && home.philosophyContent?.length ? (
        <Section className="philosophy-section">
          <Container
            className={`editorial-grid editorial-reverse ${!home.philosophyImage ? 'editorial-text-only' : ''}`}
          >
            <div className="editorial-copy">
              <Eyebrow>{labels.philosophy}</Eyebrow>
              <h2>{home.philosophyHeading}</h2>
              <PortableTextRenderer value={home.philosophyContent} />
              <TextLink href="/information">The way we care</TextLink>
            </div>
            <Photo
              image={home.philosophyImage}
              className="philosophy-photo"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </Container>
        </Section>
      ) : null}
      {!!home.galleryPreview?.length && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow={labels.gallery}
              title={home.galleryHeading || 'Ordinary moments. Extraordinary company.'}
              link={{ href: '/gallery', label: labels.allPhotos }}
            />
            <ImageGallery items={home.galleryPreview} preview />
          </Container>
        </Section>
      )}
      {home.featuredExhibition?.slug && (
        <Section className="exhibition-section">
          <Container>
            <SectionHeading
              eyebrow={labels.exhibitions}
              title={home.exhibitionHeading || 'Memories worth sharing.'}
              link={{ href: '/exhibitions', label: 'All exhibitions' }}
            />
            <ExhibitionCard exhibition={home.featuredExhibition} />
          </Container>
        </Section>
      )}
      <ContactCTA
        settings={settings}
        heading={home.contactCTAHeading}
        description={home.contactCTADescription}
      />
    </>
  );
}
