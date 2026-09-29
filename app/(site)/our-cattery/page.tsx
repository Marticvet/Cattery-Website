import Link from 'next/link';
import { getCats, getSettings } from '@/lib/sanity/data';
import { pageMetadata } from '@/lib/metadata';
import { Photo } from '@/components/Photo';
import { Container, PageIntro } from '@/components/ui';
import { Icon } from '@/components/Icon';
import { ContactCTA } from '@/components/Contact';
export const generateMetadata = () => pageMetadata('Our Cattery', '/our-cattery');
export default async function CatteryPage() {
  const [settings, cats] = await Promise.all([getSettings(), getCats()]);
  const options = [
    {
      title: 'Our males',
      subtitle: 'Meet our gentlemen',
      href: '/our-cattery/males',
      image: settings.maleImage || cats.find((cat) => cat.sex === 'male')?.mainImage,
      action: 'Explore males',
    },
    {
      title: 'Our females',
      subtitle: 'Meet our queens',
      href: '/our-cattery/females',
      image: settings.femaleImage || cats.find((cat) => cat.sex === 'female')?.mainImage,
      action: 'Explore females',
    },
  ];
  return (
    <>
      <Container className="page-content">
        <PageIntro
          eyebrow="Our cattery"
          title={settings.catteryHeading || 'The heart of our home.'}
          description={settings.catteryDescription}
        />
        <div className="cattery-options">
          {options.map((option) => (
            <Link href={option.href} className="cattery-option" key={option.href}>
              <div className="image-link">
                <Photo
                  image={option.image}
                  className="cattery-option-photo"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1400}
                  height={1550}
                />
              </div>
              <div className="cattery-option-copy">
                <p className="eyebrow">{option.title}</p>
                <div>
                  <h2>{option.subtitle}</h2>
                  <Icon />
                </div>
                <span className="text-link">
                  {option.action}
                  <Icon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <ContactCTA settings={settings} />
    </>
  );
}
